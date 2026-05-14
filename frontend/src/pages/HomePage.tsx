import React from 'react';
import BulletinList from '../components/BulletinList';

const HomePage: React.FC = () => {
  return (
    <div className="page home-page">
      <h1 className="page-title">Все объявления</h1>
      <BulletinList />
    </div>
  );
};

export default HomePage;
