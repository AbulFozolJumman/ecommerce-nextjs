export interface ProductType {
  _id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  stock?: number;
}
