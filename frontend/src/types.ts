export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Bulletin {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  category_name: string;
  contact_info: string;
  created_at: string;
}

export interface BulletinFormData {
  title: string;
  description: string;
  price: number;
  category_id: number;
  contact_info: string;
}

export interface BulletinsResponse {
  items: Bulletin[];
  total: number;
}

export interface FetchBulletinsParams {
  category_id?: number;
  search?: string;
}
