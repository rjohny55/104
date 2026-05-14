from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ---------- Category ----------
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------- Bulletin ----------
class BulletinCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    price: float = Field(..., ge=0)
    category_id: int = Field(...)
    contact_info: str = Field(..., min_length=1, max_length=200)


class BulletinResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    price: float
    category_id: int
    category_name: Optional[str] = None
    contact_info: str
    created_at: datetime

    model_config = {"from_attributes": True}


class BulletinListResponse(BaseModel):
    items: list[BulletinResponse]
    total: int
