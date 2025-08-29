from pydantic import BaseModel


#TODO: add fields

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    name: str
    id: str