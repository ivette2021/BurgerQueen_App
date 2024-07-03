import { QuantityProduct } from './quantity-products';
import { User } from './user';

export class Order {
  _id?: string;
  user: User;
  products: QuantityProduct[];
  address?: string;
}
