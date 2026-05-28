export interface DeleteConfirmationType {
  data: any | null;
  cancelDelete: () => void;
  confirmDelete: () => void;
  categoty: string;
}

export interface UserIssue {
  id: number ,
  userName: string | null,
  phoneNumber: string | null,
  email: string | null,
  issue: string | null,
  isAvailable: boolean | null,
  createdAt: string | number,
  action: number 
}

export interface AdminUser {
  id: number ,
  userName: string | null,
  phoneNumber: string | null,
  email: string | null,
  lastLogin: Date | null,
  createdAt: Date | null,
  updatedAt: Date | null,
  role: string | number,
  suspended: boolean | null
}
