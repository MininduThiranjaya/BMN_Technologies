export interface DeleteConfirmationType {
  data: any | null;
  cancelDelete: () => void;
  confirmDelete: () => void;
  categoty: string;
}
