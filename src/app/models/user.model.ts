export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'seller' | 'admin';
  createdAt?: Date;
}