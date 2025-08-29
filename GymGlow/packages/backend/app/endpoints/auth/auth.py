from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from app.db.auth_crud import get_user_by_email, create_user, verify_user
from app.db.connection import Session, get_db
from app.endpoints.auth.schemas import UserSignup, Token
from app.endpoints.auth.token import create_access_token

# Create router for auth endpoints
router = APIRouter(prefix="/auth", tags=["auth"])   # tags is used by Swagger UI


@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=Token)
async def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = create_user(db, user_data.name, user_data.email, user_data.password)
    access_token = create_access_token(user.name, user.id)
    return Token(access_token=access_token, token_type="bearer")


# gets token
@router.post("/login", status_code=status.HTTP_202_ACCEPTED, response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = verify_user(db, form_data.username, form_data.password)  # OAuth2 form uses "username" but it is my email
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(user.name, user.id)
    return Token(access_token=access_token, token_type="bearer")