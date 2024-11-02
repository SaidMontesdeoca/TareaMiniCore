export interface Sale {
  _id?: string;
  sellerId: string;
  amount: number;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  date: Date;
}