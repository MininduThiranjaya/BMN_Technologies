export interface ProductItemType {
    productId: number,
    productName: string,
    imageUrl: any,
    productDescription: string,
    productPrice: number,
    category: string
}
export interface ProductFilter {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

export type ProductCategory =
  | "solar"
  | "on_grid_inverter"
  | "off_grid_inverter"
  | "hybrid_inverter"
  | "on_grid_battery"
  | "off_grid_battery"
  | "hybrid_battery";

export interface ProductImage {
  id: number;
  imageUrl: string;
}
export interface Product {
  id: number;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  category: ProductCategory;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}


export interface ProductsPageResponse {
  items: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}