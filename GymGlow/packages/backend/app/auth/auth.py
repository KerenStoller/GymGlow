from fastapi import APIRouter, HTTPException, Depends, Response, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
#JWT handling
from jose import JWTError, jwt
from starlette import status
from datetime import datetime, timedelta, timezone
# Database imports and models
from app.db.crud import get_user_by_email, create_user, verify_user
from app.db.connection import Session, get_db
from app.auth.models import User, UserSignup, Token

# Create router for auth endpoints
router = APIRouter(prefix="/auth", tags=["auth"])   # tags is used by Swagger UI

# JWT Configuration
SECRET_KEY = "a988e0c55ed641253b883db4302adcb474a7ed5b5a2575a4a68f3f77ee442504"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 30

# auth + token
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False, scheme_name="JWT")


def create_access_token(username: str, user_unique_mail: int):
    #TODO: create cookie with the token
    expires = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    encode = {"sub": username, "email": user_unique_mail, "exp": expires}
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_bearer)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Decode the JWT token
        username: str = payload.get("sub")
        user_unique_mail: str = payload.get("email")
        if not username or not user_unique_mail:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return User(name=username, email=user_unique_mail)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


@router.post("/signup", response_model=Token)
async def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = create_user(db, user_data.name, user_data.email, user_data.password)
    token = create_access_token(user.name, user.email)
    return Token(access_token=token, token_type="bearer")


# gets token
@router.post("/login", status_code=status.HTTP_201_CREATED, response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = verify_user(db, form_data.username, form_data.password)  # OAuth2 form uses "username" but its my email
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(user.name, user.email)
    return Token(access_token=token, token_type="bearer")


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response):
    #TODO: remove the token cookie
    #Clear the cookie by setting it to expire immediately
    #response.delete_cookie(ACCESS_TOKEN_COOKIE_NAME, samesite="lax", path="/")
    return {"message": "Logged out"}



"""
Token usage:
- Browsers: after POST /auth/login, the JWT is set as an HttpOnly cookie. Send subsequent requests with cookies included.
- API clients: read 'access_token' from the login response and set 'Authorization: Bearer <token>' on protected requests.
- Swagger UI: click 'Authorize' and paste 'Bearer <token>'.
- Logout: POST /auth/logout to clear the cookie.
"""