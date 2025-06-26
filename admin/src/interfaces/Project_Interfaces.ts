export interface ImageType {
  file: File | null;
  preview: string | null | undefined;
  name: string | null;
}

export interface ProjectImage {
  imageUrl: String;
}

interface ProjectImages {
  id: number;
  imageUrl: string;
}

export interface ProjectType {
  id: number | null;
  projectId: string | null;
  projectName: string | null;
  personName: string | null;
  location: string | null;
  projectDescription: string | null;
  category: string | null;
  projectDate: string | null;
  imageUrl: ProjectImages[] | [];
}

export interface ProjectDetailsProps {
  projects: ProjectType[];
  deleteProduct: (id: number) => void;
  onSuccess: () => void;
}

export interface AddProjectProps {
  existFormData: ProjectType | null;
  isOpen: boolean | null;
  onClose: () => void;
  type: string;
  title: string;
  statement: string;
  onSuccess: () => void;
}

export interface ProjectPropsType {
  onSuccess: () => void;
}

export interface FormDataType {
  projectId: string | null | undefined;
  projectName: string | null | undefined;
  personName: string | null | undefined;
  location: string | null | undefined;
  projectDescription: string | null | undefined;
  category: string | null | undefined;
  projectDate: string | null | undefined;
}
