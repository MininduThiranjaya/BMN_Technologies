export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  email: string;
  testimonial: string;
  rating: number;
  date: string | number;
  isAvailable: number | string;
}