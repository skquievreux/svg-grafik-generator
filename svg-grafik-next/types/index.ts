export interface IconConfig {
  name: string;
  category: string;
  shape: 'octagon' | 'circle' | 'square' | 'hexagon';
  symbol: string;
  colors: {
    background: string;
    border: string;
    icon: string;
  };
  size: number;
}

export interface DatabaseIcon extends IconConfig {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserGallery {
  id: string;
  user_id: string;
  name: string;
  icons: string[]; // Icon IDs
  is_public: boolean;
  created_at: string;
}

export interface CategoryInfo {
  count: number;
  icons: string[];
}

export interface GalleryData {
  icons: DatabaseIcon[];
  categories: Record<string, CategoryInfo>;
  metadata: {
    total: number;
    categories: string[];
    generated: string;
  };
}