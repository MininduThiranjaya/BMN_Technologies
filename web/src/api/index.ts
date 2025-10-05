// const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BACKEND_BASE_URL = "http://localhost:8080/api/";

export const endpoints = {
  product: {
    get: `${BACKEND_BASE_URL}auth/product/get`,
  },
  project: {
    get: `${BACKEND_BASE_URL}auth/project/get`,
  },
  testimonial: {
    get: `${BACKEND_BASE_URL}user-testimonial/get`,
    submit: `${BACKEND_BASE_URL}user-testimonial/submit`,
  }
};
