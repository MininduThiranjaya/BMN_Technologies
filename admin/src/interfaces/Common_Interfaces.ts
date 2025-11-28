export interface DeleteConfirmationType {
  data: any | null;
  cancelDelete: () => void;
  confirmDelete: () => void;
  categoty: string;
}

export interface UserIssue {
  id: number | null,
  userName: string | null,
  phoneNumber: string | null,
  email: string | null,
  issue: string | null,
  isAvailable: boolean | null,
  createdAt: string | null
}
