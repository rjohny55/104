# Доска объявлений — MVP

MVP доски объявлений с категориями, созданием и просмотром объявлений, поиском/фильтрацией. Монорепа с FastAPI-бэкендом (SQLite) и React-фронтендом (CRA + TypeScript).

## Project Structure

```
/
├── backend/               # FastAPI backend (SQLite + SQLAlchemy)
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── routers/
│   │   ├── bulletins.py
│   │   └── categories.py
│   └── requirements.txt
└── frontend/              # React + TypeScript (CRA)
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── api.ts          # API client (fetch-based)
    │   ├── components/
    │   │   ├── Header.tsx           # Navigation header
    │   │   ├── CategoryFilter.tsx   # Category dropdown filter
    │   │   ├── BulletinCard.tsx     # Bulletin card for listing
    │   │   ├── BulletinList.tsx     # Bulletin list with search/filter
    │   │   ├── BulletinDetail.tsx   # Full bulletin details
    │   │   └── BulletinForm.tsx     # Bulletin creation form
    │   ├── pages/
    │   │   ├── HomePage.tsx         # Main listing page
    │   │   ├── CreatePage.tsx       # Bulletin creation page
    │   │   └── DetailPage.tsx       # Bulletin detail page
    │   ├── types.ts                # TypeScript interfaces
    │   ├── App.tsx                 # Root component with routing
    │   ├── App.css                 # Application styles
    │   └── index.tsx               # Entry point
    ├── package.json
    └── README.md                   # CRA-generated docs
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API will be available at `http://localhost:8000/api`. Swagger docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm start
```

App will be available at `http://localhost:3000`.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create a category |
| GET | `/api/bulletins` | List bulletins (filters: `category_id`, `search`) |
| GET | `/api/bulletins/{id}` | Get bulletin details |
| POST | `/api/bulletins` | Create a bulletin |

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite, Pydantic v2
- **Frontend:** React 19, TypeScript, React Router v6, CSS
