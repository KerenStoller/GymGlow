from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from app.db.auth_crud import get_user_by_email, create_user, verify_user, get_admin_id
from app.db.setup.connection import SessionFactory, get_db
from app.endpoints.auth.schemas import UserSignup, AuthResponse, RefreshResponse
from app.endpoints.auth.token import create_access_token, refresh_token

# Create router for auth endpoints
router = APIRouter(prefix="/auth", tags=["auth"])   # tags is used by Swagger UI

@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=AuthResponse)
async def signup(user_data: UserSignup, db: SessionFactory = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = create_user(db, user_data.name, user_data.email, user_data.password)
    access_token = create_access_token(user.name, user.id)
    refresh_token = create_access_token(user.name, user.id, True)
    return AuthResponse(access_token=access_token, refresh_token=refresh_token)


# gets token
@router.post("/login", status_code=status.HTTP_202_ACCEPTED, response_model=AuthResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: SessionFactory = Depends(get_db)):
    user = verify_user(db, form_data.username, form_data.password)  # OAuth2 form uses "username" but it is my email
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(user.name, user.id)
    new_refresh_token = create_access_token(user.name, user.id, True)
    return AuthResponse(access_token=access_token, refresh_token=new_refresh_token)

@router.get("/admin")
def admin(db: SessionFactory = Depends(get_db)):
    return get_admin_id(db)

@router.get("/refresh", status_code=status.HTTP_202_ACCEPTED, response_model=RefreshResponse)
async def get_new_access_token(token: str):
    try:
        new_access_token = await refresh_token(token)
        return RefreshResponse(access_token=new_access_token)
    except Exception as e:
        raise e