import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Доска объявлений
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-link">
            Главная
          </Link>
          <Link to="/create" className="header-link header-link-create">
            Подать объявление
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
