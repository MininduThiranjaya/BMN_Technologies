export interface ImageType {
  file: File | null;
  preview: string | null;
  name: string | null;
}

export interface AddProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectImage {
  imageUrl: String;
}