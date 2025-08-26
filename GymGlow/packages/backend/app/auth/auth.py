from fastapi import APIRouter, HTTPException, Depends, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Dict, Any, Optional
import os
from app.db.crud import get_user_by_email, create_user, verify_user
from app.db.connection import get_db, Session

# Create router for auth endpoints
router = APIRouter(prefix="/auth", tags=["authentication"])

# Configuration
SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
ACCESS_TOKEN_COOKIE_NAME = "access_token"  # cookie name for browsers

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)

# Pydantic models
class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def _cookie_settings(request: Request) -> Dict[str, Any]:
    # If SECURE_COOKIES is set, obey it; otherwise infer from request scheme.
    env_secure = os.getenv("SECURE_COOKIES")
    secure = (env_secure.lower() in ("1", "true", "yes")) if env_secure is not None else (request.url.scheme == "https")
    # Default to Lax. If you explicitly need cross-site cookies, set COOKIE_SAMESITE=none and ensure HTTPS (secure=True).
    samesite_env = (os.getenv("COOKIE_SAMESITE") or "lax").lower()
    samesite = "none" if samesite_env == "none" else ("strict" if samesite_env == "strict" else "lax")
    return {"secure": secure, "samesite": samesite}

def get_current_user(db, request: Request, token_bearer: Optional[str] = Depends(oauth2_scheme)) -> Dict[str, Any]:
    # Prefer cookie in browsers; fallback to OAuth2 Bearer token (Swagger/API clients)
    token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME) or token_bearer
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: Optional[str] = payload.get("sub")
        if not email:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.post("/signup")
def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    #TODO: hash the password before storing it
    #hashed_password = get_password_hash(user_data.password)
    #create_user(db, user_data.name, user_data.email, hashed_password)
    create_user(db, user_data.name, user_data.email, user_data.password)
    return {"message": "User created successfully"}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    #TODO: return a token on successful login
    #TODO: use hashed passwords
    #TODO: set a cookie for browser clients
    uesr = verify_user(db, form_data.username, form_data.password)  # OAuth2 form uses "username"
    if not uesr:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}


# @router.post("/login", response_model=Token)
# def login(response: Response, request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     """
#     Returns a JWT as 'access_token' and also sets it as an HttpOnly cookie.
#     - Browsers: cookie is used automatically (ensure requests send cookies).
#     - API clients: use 'Authorization: Bearer <access_token>'.
#     """
#     user = get_user_by_email_fake_db(db, form_data.username)  # OAuth2 form uses "username"
#     if not user or not verify_password(form_data.password, user["hashed_password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     access_token = create_access_token({"sub": user["email"], "name": user["name"]})
#     cookie_cfg = _cookie_settings(request)
#     response.set_cookie(
#         key=ACCESS_TOKEN_COOKIE_NAME,
#         value=access_token,
#         httponly=True,
#         secure=cookie_cfg["secure"],   # False on local HTTP; True on HTTPS
#         samesite=cookie_cfg["samesite"],
#         max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
#         path="/",
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
def logout(response: Response):
    #TODO: remove the token cookie
    # Clear the cookie by setting it to expire immediately
    #response.delete_cookie(ACCESS_TOKEN_COOKIE_NAME, samesite="lax", path="/")
    return {"message": "Logged out"}



"""
Token usage:
- Browsers: after POST /auth/login, the JWT is set as an HttpOnly cookie. Send subsequent requests with cookies included.
- API clients: read 'access_token' from the login response and set 'Authorization: Bearer <token>' on protected requests.
- Swagger UI: click 'Authorize' and paste 'Bearer <token>'.
- Logout: POST /auth/logout to clear the cookie.
"""