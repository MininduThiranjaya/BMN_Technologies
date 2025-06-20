const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const endpoints = {
  user: {
    login: `${BACKEND_BASE_URL}admin/auth/login`,
    dashboardUserProfile: `${BACKEND_BASE_URL}admin/auth/user/profile`,
  },
  product: {
    add: `${BACKEND_BASE_URL}auth/product/add`,
    count: `${BACKEND_BASE_URL}auth/product/count`,
  },
  project: {
    add: `${BACKEND_BASE_URL}auth/project/add`,
    count: `${BACKEND_BASE_URL}auth/project/count`,
  },
};
