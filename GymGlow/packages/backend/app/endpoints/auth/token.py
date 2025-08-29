from datetime import datetime, timedelta, timezone
from uuid import UUID
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError, ExpiredSignatureError
from starlette import status
from app.endpoints.auth.schemas import User

# auth + token
# chat said: If the Authorization header is missing or not a Bearer token, FastAPI immediately returns 401
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=True, scheme_name="JWT")

# JWT Configuration
SECRET_KEY = "a988e0c55ed641253b883db4302adcb474a7ed5b5a2575a4a68f3f77ee442504"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 30

def create_access_token(username: str, user_id: UUID):
    expires = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    encode = {"sub": username, "id": str(user_id), "exp": expires}
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_bearer)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Decode the JWT token
        username: str = payload.get("sub")
        user_id: str = payload.get("id")
        if not username or not user_id:
            raise credentials_exception
        user = User(name=username, id=user_id)
        return user
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except JWTError: #base exception
        raise credentials_exception