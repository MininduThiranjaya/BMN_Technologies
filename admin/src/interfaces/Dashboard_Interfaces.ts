export interface AdminUser {
  email: string;
  userName: string;
  phoneNumber: string;
  avatar: string | null;
}

export interface StatCard {
  title: string;
  value: number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconBg: string;
  url: string | null;
}

export interface Sale {
  customer: string;
  product: string;
  amount: string;
  time: string;
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
}
