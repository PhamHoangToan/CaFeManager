export type Product = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Size = {
  id: number;
  name: string;
};

export type CartItem = {
  id: number;
  product: Product;
  size?: Size;
  price: number;
  quantity: number;
};

export type Cart = {
  id: number;
  customerId: number;
  items: CartItem[];
};
