import {
  Category,
  Bulletin,
  BulletinFormData,
  BulletinsResponse,
  FetchBulletinsParams,
} from '../types';

const BASE_URL = 'http://localhost:8000/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error ${response.status}: ${errorBody}`);
  }

  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  return request<Category[]>('/categories');
}

export async function createCategory(name: string): Promise<Category> {
  return request<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function fetchBulletins(
  params?: FetchBulletinsParams
): Promise<BulletinsResponse> {
  const query = new URLSearchParams();
  if (params?.category_id) {
    query.set('category_id', String(params.category_id));
  }
  if (params?.search) {
    query.set('search', params.search);
  }
  const queryString = query.toString();
  const endpoint = queryString ? `/bulletins?${queryString}` : '/bulletins';
  return request<BulletinsResponse>(endpoint);
}

export async function fetchBulletin(id: number): Promise<Bulletin> {
  return request<Bulletin>(`/bulletins/${id}`);
}

export async function createBulletin(
  data: BulletinFormData
): Promise<Bulletin> {
  return request<Bulletin>('/bulletins', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
