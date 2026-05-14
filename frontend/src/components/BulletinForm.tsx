import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, BulletinFormData } from '../types';
import { fetchCategories, createBulletin } from '../api/api';

const BulletinForm: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [contactInfo, setContactInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Введите заголовок');
      return;
    }
    if (!description.trim()) {
      setError('Введите описание');
      return;
    }
    if (!price || Number(price) <= 0) {
      setError('Укажите корректную цену');
      return;
    }
    if (!categoryId) {
      setError('Выберите категорию');
      return;
    }
    if (!contactInfo.trim()) {
      setError('Введите контактную информацию');
      return;
    }

    setSubmitting(true);
    try {
      const data: BulletinFormData = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category_id: Number(categoryId),
        contact_info: contactInfo.trim(),
      };
      await createBulletin(data);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании объявления');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bulletin-form-container">
      <h1 className="form-title">Подать объявление</h1>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="bulletin-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена (₽)</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            step="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : '')
            }
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo">Контактная информация</label>
          <input
            id="contactInfo"
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Телефон или email"
            required
          />
        </div>

        <button
          type="submit"
          className="form-submit"
          disabled={submitting}
        >
          {submitting ? 'Сохранение...' : 'Опубликовать'}
        </button>
      </form>
    </div>
  );
};

export default BulletinForm;
