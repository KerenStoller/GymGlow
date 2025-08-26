import uuid
from app.db.connection import Base
from sqlalchemy.dialects.postgresql import UUID  # if using Postgres
from sqlalchemy import Column, String

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column("email", String, nullable=False, unique=True, index=True)
    name = Column("name", String, nullable=False)
    #TODO: make sure to hash the password before storing it.
    hashed_password = Column("hashed_password", String, nullable=False)