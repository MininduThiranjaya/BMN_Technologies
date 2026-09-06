// export interface ProjectItemType {
//     projectId: string,
//     projectName: string,
//     personName: string,
//     province: string,
//     projectDescription: string,
//     category: string,
//     projectDate: string,
//     imageUrl: any
// }

// export interface ProjectFilter {
//     category: string | null,
//     province: string | null,
//     projectMinDate: string | null,
//     projectMaxDate: string | null,
// }

export type ProjectCategory = "on_grid" | "off_grid" | "hybrid";

export type PropertyType =
  | "residential"
  | "commercial"
  | "industrial"
  | "agricultural"
  | "other";

export interface ProjectImage {
  id: number;
  imageUrl: string;
}

export interface ProjectItemType {
  id: number;
  projectId: string;
  projectName: string;
  personName: string;
  province: string;
  location: string;
  projectDescription: string;
  category: ProjectCategory;
  propertyType: PropertyType;
  projectDate: string;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsPageResponse {
  items: ProjectItemType[];
  totalItems: number;
}