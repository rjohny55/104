from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal, Base
from models import Category, Bulletin
from routers import categories, bulletins

app = FastAPI(title="Bulletin Board API", version="1.0.0")

# CORS — allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(categories.router)
app.include_router(bulletins.router)


def seed_data():
    """Populate the database with demo categories and bulletins."""
    db = SessionLocal()
    try:
        # Only seed if the categories table is empty
        if db.query(Category).count() > 0:
            return

        # Create categories
        cat_transport = Category(name="Транспорт", slug="transport")
        cat_realty = Category(name="Недвижимость", slug="nedvizhimost")
        cat_electronics = Category(name="Электроника", slug="elektronika")
        cat_services = Category(name="Услуги", slug="uslugi")

        db.add_all([cat_transport, cat_realty, cat_electronics, cat_services])
        db.commit()

        # Create bulletins
        now = datetime.utcnow()
        bulletins_data = [
            Bulletin(
                title="Продам велосипед",
                description="Горный велосипед, 26 дюймов, в отличном состоянии. Почти не использовался.",
                price=15000.0,
                category_id=cat_transport.id,
                contact_info="+7-999-123-45-67",
                created_at=now,
            ),
            Bulletin(
                title="Сдам квартиру",
                description="Уютная однокомнатная квартира в центре города. Свежий ремонт, вся мебель.",
                price=35000.0,
                category_id=cat_realty.id,
                contact_info="+7-999-987-65-43",
                created_at=now,
            ),
            Bulletin(
                title="Продам iPhone 15",
                description="Новый, в заводской упаковке. Цвет — черный. 128 ГБ.",
                price=75000.0,
                category_id=cat_electronics.id,
                contact_info="+7-999-555-55-55",
                created_at=now,
            ),
            Bulletin(
                title="Ремонт компьютеров",
                description="Диагностика и ремонт ПК и ноутбуков. Выезд по городу.",
                price=2000.0,
                category_id=cat_services.id,
                contact_info="+7-999-111-22-33",
                created_at=now,
            ),
            Bulletin(
                title="Продам автомобиль Toyota Camry",
                description="2019 год, пробег 50000 км. Один владелец, полное обслуживание у дилера.",
                price=2200000.0,
                category_id=cat_transport.id,
                contact_info="+7-999-444-33-22",
                created_at=now,
            ),
            Bulletin(
                title="Ноутбук Lenovo ThinkPad",
                description="Для работы и учебы. 16 ГБ ОЗУ, SSD 512 ГБ. Отличное состояние.",
                price=45000.0,
                category_id=cat_electronics.id,
                contact_info="+7-999-777-88-99",
                created_at=now,
            ),
        ]

        db.add_all(bulletins_data)
        db.commit()
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    """Initialize database tables and seed demo data on startup."""
    Base.metadata.create_all(bind=engine)
    seed_data()
