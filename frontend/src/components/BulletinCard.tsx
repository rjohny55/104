import React from 'react';
import { Link } from 'react-router-dom';
import { Bulletin } from '../types';

interface BulletinCardProps {
  bulletin: Bulletin;
}

const BulletinCard: React.FC<BulletinCardProps> = ({ bulletin }) => {
  const formattedDate = new Date(bulletin.created_at).toLocaleDateString('ru-RU');
  const formattedPrice = bulletin.price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Link to={`/bulletin/${bulletin.id}`} className="bulletin-card">
      <div className="bulletin-card-body">
        <h3 className="bulletin-card-title">{bulletin.title}</h3>
        <p className="bulletin-card-price">{formattedPrice}</p>
        <div className="bulletin-card-meta">
          <span className="bulletin-card-category">{bulletin.category_name}</span>
          <span className="bulletin-card-date">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default BulletinCard;
