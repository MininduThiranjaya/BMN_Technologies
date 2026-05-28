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
    edit: `${BACKEND_BASE_URL}auth/product/edit/:productId`,
    count: `${BACKEND_BASE_URL}auth/product/count`,
    getAllProducts: `${BACKEND_BASE_URL}auth/product/get/all`,
    deleteProduct: `${BACKEND_BASE_URL}auth/product/delete-by-id/:productId`,
    getFiltered: `${BACKEND_BASE_URL}auth/product/get/filter`
  },
  project: {
    add: `${BACKEND_BASE_URL}auth/project/add`,
    edit: `${BACKEND_BASE_URL}auth/project/edit/:projectId`,
    count: `${BACKEND_BASE_URL}auth/project/count`,
    getAllProjects: `${BACKEND_BASE_URL}auth/project/get/all`,
    deleteProject: `${BACKEND_BASE_URL}auth/project/delete-by-id/:projectId`,
    getFiltered: `${BACKEND_BASE_URL}auth/project/get/filter`
  },
  contactUs: {
    getIssues: `${BACKEND_BASE_URL}user-contact/get-issues`,
    getAllIssues: `${BACKEND_BASE_URL}user-contact/get-all-issues`,
    count: `${BACKEND_BASE_URL}user-contact/count`,
    getAction: `${BACKEND_BASE_URL}user-contact/get-action`,
  },
  testimonial: {
    get: `${BACKEND_BASE_URL}user-testimonial/get-all`,
    count: `${BACKEND_BASE_URL}user-testimonial/count`,
    changeStatus: `${BACKEND_BASE_URL}user-testimonial/change-state`
  }
};