const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const endpoints = {
  user: {
    login: `${BACKEND_BASE_URL}admin/auth/login`,
    fogetPasswordSendEmail: `${BACKEND_BASE_URL}verification-code/forget-password/send-mail`,
    verifyCode: `${BACKEND_BASE_URL}verification-code/check-code`,
    forgetPassword_changePassword: `${BACKEND_BASE_URL}admin/auth/forget-password/change-password`,
    dashboardUserProfile: `${BACKEND_BASE_URL}admin/auth/user/profile`,
  },
  product: {
    add: `${BACKEND_BASE_URL}auth/product/add`,
    count: `${BACKEND_BASE_URL}auth/product/count`,
    getAllProducts: `${BACKEND_BASE_URL}auth/product/get/all`,
    deleteProduct: `${BACKEND_BASE_URL}auth/product/delete-by-id/:productId`,
  },
  project: {
    add: `${BACKEND_BASE_URL}auth/project/add`,
    count: `${BACKEND_BASE_URL}auth/project/count`,
    getAllProjects: `${BACKEND_BASE_URL}auth/project/get/all`,
    deleteProject: `${BACKEND_BASE_URL}auth/project/delete-by-id/:projectId`,
  },
  contactUs: {
    getIssues: `${BACKEND_BASE_URL}user-contact/get-issues`
  }
};
