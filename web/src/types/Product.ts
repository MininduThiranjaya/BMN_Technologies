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