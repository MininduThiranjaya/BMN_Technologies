export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  token?: string;
}