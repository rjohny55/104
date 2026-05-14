from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import get_db
from models import Bulletin, Category
from schemas import BulletinCreate, BulletinResponse, BulletinListResponse

router = APIRouter(prefix="/api/bulletins", tags=["bulletins"])


@router.get("", response_model=BulletinListResponse)
def get_bulletins(
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Return bulletins with optional filtering by category_id and search."""
    query = db.query(Bulletin).join(Category, Bulletin.category_id == Category.id)

    if category_id is not None:
        query = query.filter(Bulletin.category_id == category_id)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Bulletin.title.ilike(search_term),
                Bulletin.description.ilike(search_term),
            )
        )

    bulletins = query.order_by(Bulletin.created_at.desc()).all()

    items = []
    for b in bulletins:
        items.append(
            BulletinResponse(
                id=b.id,
                title=b.title,
                description=b.description,
                price=b.price,
                category_id=b.category_id,
                category_name=b.category.name if b.category else None,
                contact_info=b.contact_info,
                created_at=b.created_at,
            )
        )

    return BulletinListResponse(items=items, total=len(items))


@router.get("/{bulletin_id}", response_model=BulletinResponse)
def get_bulletin(bulletin_id: int, db: Session = Depends(get_db)):
    """Return a single bulletin by id."""
    bulletin = (
        db.query(Bulletin)
        .join(Category, Bulletin.category_id == Category.id)
        .filter(Bulletin.id == bulletin_id)
        .first()
    )
    if not bulletin:
        raise HTTPException(status_code=404, detail="Bulletin not found")

    return BulletinResponse(
        id=bulletin.id,
        title=bulletin.title,
        description=bulletin.description,
        price=bulletin.price,
        category_id=bulletin.category_id,
        category_name=bulletin.category.name if bulletin.category else None,
        contact_info=bulletin.contact_info,
        created_at=bulletin.created_at,
    )


@router.post("", response_model=BulletinResponse, status_code=201)
def create_bulletin(data: BulletinCreate, db: Session = Depends(get_db)):
    """Create a new bulletin."""
    # Verify category exists
    category = db.query(Category).filter(Category.id == data.category_id).first()
    if not category:
        raise HTTPException(status_code=400, detail="Category not found")

    bulletin = Bulletin(
        title=data.title,
        description=data.description,
        price=data.price,
        category_id=data.category_id,
        contact_info=data.contact_info,
    )
    db.add(bulletin)
    db.commit()
    db.refresh(bulletin)

    return BulletinResponse(
        id=bulletin.id,
        title=bulletin.title,
        description=bulletin.description,
        price=bulletin.price,
        category_id=bulletin.category_id,
        category_name=category.name,
        contact_info=bulletin.contact_info,
        created_at=bulletin.created_at,
    )
