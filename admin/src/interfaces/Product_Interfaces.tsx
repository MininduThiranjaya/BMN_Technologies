export interface ImageType {
  file: File | null;
  preview: string | null;
  name: string | null;
}

export interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProductImage {
  imageUrl: String;
}