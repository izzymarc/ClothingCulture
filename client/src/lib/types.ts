// Cart related types
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: CartProduct;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}
