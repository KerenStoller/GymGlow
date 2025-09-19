from fastapi import APIRouter, HTTPException, Depends, Cookie, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from app.db.auth_crud import get_user_by_email, create_user, verify_user, get_admin_id, delete_refresh_token
from app.db.setup.connection import get_db
from sqlalchemy.orm import Session
from app.endpoints.auth.schemas import UserSignup, AuthResponse, RefreshResponse
from app.endpoints.auth.token import refresh_access_token, create_tokens

# Create router for auth endpoints
router = APIRouter(prefix="/auth", tags=["auth"])   # tags is used by Swagger UI

@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=AuthResponse)
async def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = create_user(db, user_data.name, user_data.email, user_data.password)

    access_token, refresh_token = create_tokens(db, user.name, user.id)
    response_content = AuthResponse(access_token=access_token, refresh_token=refresh_token)
    response = JSONResponse(content=response_content.model_dump())
    response.set_cookie(key="refresh_token", value=refresh_token)
    return response


@router.post("/login", status_code=status.HTTP_202_ACCEPTED, response_model=AuthResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = verify_user(db, form_data.username, form_data.password)  # OAuth2 form uses "username" but it is my email
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token, refresh_token = create_tokens(db, user.name, user.id)
    response_content = AuthResponse(access_token=access_token, refresh_token=refresh_token)
    response = JSONResponse(content=response_content.model_dump())
    response.set_cookie(key="refresh_token", value=refresh_token)
    return response


@router.delete("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(refresh_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
    try:
        delete_refresh_token(db, refresh_token)
        response = Response(status_code=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(key="refresh_token")
        return response
    except Exception as e:
        raise e

@router.get("/admin")
def admin(db: Session = Depends(get_db)):
    print("Admin endpoint called")
    print("§§§§§§§§§§§§§§§§§§§§§§§§")
    return get_admin_id(db)


@router.get("/refresh", status_code=status.HTTP_202_ACCEPTED, response_model=RefreshResponse)
async def get_new_access_token(refresh_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
    try:
        new_access_token = await refresh_access_token(refresh_token, db)
        return RefreshResponse(access_token=new_access_token)
    except Exception as e:
        raise e