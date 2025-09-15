from datetime import datetime, timedelta, timezone
from uuid import UUID
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError, ExpiredSignatureError
from starlette import status
from uuid import UUID

from app.db.models import Exercise
from app.endpoints.auth.schemas import User

# auth + token
# chat said: If the Authorization header is missing or not a Bearer token, FastAPI immediately returns 401
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=True, scheme_name="JWT")

# JWT Configuration
SECRET_KEY = "a988e0c55ed641253b883db4302adcb474a7ed5b5a2575a4a68f3f77ee442504"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = .5
REFRESH_TOKEN_EXPIRE_MINUTES = .2

# error handling
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},)
expired_token_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Token has expired",
    headers={"WWW-Authenticate": "Bearer"},)


def create_access_token(username: str, user_id: UUID, refresh: bool = False):
    expiration_time = ACCESS_TOKEN_EXPIRE_MINUTES
    if refresh:
        expiration_time = REFRESH_TOKEN_EXPIRE_MINUTES
    expires = datetime.now(timezone.utc) + timedelta(minutes=expiration_time)
    encode = {"sub": username, "id": str(user_id), "exp": expires, "refresh": refresh}
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_user_from_access_token(token: str = Depends(oauth2_bearer)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Decode the JWT token
        username: str = payload.get("sub")
        user_id: str = payload.get("id")
        if not username or not user_id:
            raise credentials_exception
        user = User(name=username, id=user_id)
        print("§§§§§§§§§§§§§§§ finished with get_user_from_access_token")
        return user
    except ExpiredSignatureError:
        raise expired_token_exception
    except JWTError: #base exception
        raise credentials_exception


async def refresh_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # Decode the JWT token
        expires = payload.get("exp")
        if datetime.fromtimestamp(expires, timezone.utc) > datetime.now(timezone.utc):
            #TODO: check with DB if the refresh is good
            username: str = payload.get("sub")
            user_id: str = payload.get("id")
            return create_access_token(username, UUID(user_id))

    except ExpiredSignatureError:
        raise expired_token_exception
    except JWTError: #base exception
        raise credentials_exception