import re
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Category
from schemas import CategoryCreate, CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["categories"])


def _slugify(name: str) -> str:
    """Generate a URL-friendly slug from a name."""
    slug = name.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


@router.get("", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    """Return all categories ordered by id."""
    categories = db.query(Category).order_by(Category.id).all()
    return categories


@router.post("", response_model=CategoryResponse, status_code=201)
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new category with auto-generated slug."""
    slug = _slugify(data.name)
    # Ensure unique slug by appending a suffix if necessary
    existing = db.query(Category).filter(Category.slug == slug).first()
    if existing:
        suffix = 2
        while db.query(Category).filter(Category.slug == f"{slug}-{suffix}").first():
            suffix += 1
        slug = f"{slug}-{suffix}"

    category = Category(name=data.name, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category
