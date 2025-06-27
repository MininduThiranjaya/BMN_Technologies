export interface ImageType {
  file: File | null;
  preview: string | null | undefined;
  name: string | null;
}

export interface ProductType {
  id: number | null;
  productId: string | null;
  productName: string | null;
  imageUrl: ProductImages[] | [];
  productDescription: string | null;
  productPrice: number | null;
  category: string | null;
}

export interface AddProductProps {
  existFormData: ProductType | null | undefined;
  isOpen: boolean | null;
  onClose: () => void;
  type: string;
  title: string;
  statement: string;
  onSuccess: () => void;
}

export interface ProductImage {
  imageUrl: String;
}

interface ProductImages {
  id: number;
  imageUrl: string;
}

export interface ProductDetailsProps {
  products: ProductType[];
  deleteProduct: (id: number) => void;
  onSuccess: () => void;
}

export interface formDataType {
  productId: string | null | undefined;
  productName: string | null | undefined;
  productPrice: number | null | undefined;
  productDescription: string | null | undefined;
  category: string | null | undefined;
}

export interface ProductPropsType {
  onSuccess: () => void;
}
