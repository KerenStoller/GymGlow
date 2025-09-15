from pydantic import BaseModel


#TODO: add fields

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str

class RefreshResponse(BaseModel):
    access_token: str

class User(BaseModel):
    name: str
    id: str