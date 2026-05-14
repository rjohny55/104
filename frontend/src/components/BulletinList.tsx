import React, { useState, useEffect, useCallback } from 'react';
import { Bulletin, Category, FetchBulletinsParams } from '../types';
import { fetchBulletins, fetchCategories } from '../api/api';
import BulletinCard from './BulletinCard';
import CategoryFilter from './CategoryFilter';

const BulletinList: React.FC = () => {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  const loadBulletins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: FetchBulletinsParams = {};
      if (selectedCategoryId) {
        params.category_id = selectedCategoryId;
      }
      if (search.trim()) {
        params.search = search.trim();
      }
      const data = await fetchBulletins(params);
      setBulletins(data.items);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load bulletins');
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, search]);

  useEffect(() => {
    loadBulletins();
  }, [loadBulletins]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="bulletin-list-container">
      <div className="bulletin-list-controls">
        <input
          type="text"
          placeholder="Поиск объявлений..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onChange={handleCategoryChange}
        />
      </div>

      {loading && <div className="loading">Загрузка...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && bulletins.length === 0 && (
        <div className="empty">Объявлений не найдено</div>
      )}

      {!loading && !error && bulletins.length > 0 && (
        <>
          <div className="bulletin-list">
            {bulletins.map((bulletin) => (
              <BulletinCard key={bulletin.id} bulletin={bulletin} />
            ))}
          </div>
          <div className="bulletin-list-total">
            Всего объявлений: {total}
          </div>
        </>
      )}
    </div>
  );
};

export default BulletinList;
