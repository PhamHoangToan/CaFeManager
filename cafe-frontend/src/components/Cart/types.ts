export type CartItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    imageUrl?: string;
  };
  size?: {
    id: number;
    name: string;
  } | null;
};

export type Cart = {
  id: number;
  items: CartItem[];
};
