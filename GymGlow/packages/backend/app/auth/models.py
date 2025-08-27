from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str