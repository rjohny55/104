import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bulletin } from '../types';
import { fetchBulletin } from '../api/api';

const BulletinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchBulletin(Number(id))
      .then((data) => {
        setBulletin(data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load bulletin');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/" className="back-link">Вернуться на главную</Link>
      </div>
    );
  }

  if (!bulletin) {
    return (
      <div className="error">
        <p>Объявление не найдено</p>
        <Link to="/" className="back-link">Вернуться на главную</Link>
      </div>
    );
  }

  const formattedDate = new Date(bulletin.created_at).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedPrice = bulletin.price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="bulletin-detail">
      <Link to="/" className="back-link">← Назад к списку</Link>
      <div className="bulletin-detail-card">
        <h1 className="bulletin-detail-title">{bulletin.title}</h1>
        <div className="bulletin-detail-meta">
          <span className="bulletin-detail-category">{bulletin.category_name}</span>
          <span className="bulletin-detail-date">{formattedDate}</span>
        </div>
        <p className="bulletin-detail-price">{formattedPrice}</p>
        <div className="bulletin-detail-description">
          <h3>Описание</h3>
          <p>{bulletin.description}</p>
        </div>
        <div className="bulletin-detail-contact">
          <h3>Контакты</h3>
          <p>{bulletin.contact_info}</p>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetail;
