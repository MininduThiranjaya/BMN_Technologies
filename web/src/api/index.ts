// const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BACKEND_BASE_URL = "http://localhost:8080/api/";

export const endpoints = {
  product: {
    get: `${BACKEND_BASE_URL}auth/product/get`,
    getFiltered: `${BACKEND_BASE_URL}auth/product/get/filter`,
    getAll: `${BACKEND_BASE_URL}auth/product/get/all`
  },
  project: {
    get: `${BACKEND_BASE_URL}auth/project/get`,
    getFiltered: `${BACKEND_BASE_URL}auth/project/get/filter`,
    getAll: `${BACKEND_BASE_URL}auth/project/get/all`,
  },
  testimonial: {
    get: `${BACKEND_BASE_URL}user-testimonial/get`,
    submit: `${BACKEND_BASE_URL}user-testimonial/submit`,
  },
  contactUs: {
    inform: `${BACKEND_BASE_URL}user-contact/inform`
  }
};
