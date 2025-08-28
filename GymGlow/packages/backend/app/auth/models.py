from pydantic import BaseModel, Field


class CurrentUser(BaseModel):
    name: str
    id: str

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str