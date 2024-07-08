import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../constants/constants';
import { User } from '../models/user';
import { Product } from '../models/product';
import { QuantityProduct } from '../models/quantity-products';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  private order: Order;

  constructor() {}

  async initOrder() {
    const order = await Preferences.get({ key: KEY_ORDER });
    if (order.value) {
      this.order = new Order();
      this.order.products = [];
      this.saveOrder();
    } else {
      this.order = JSON.parse(order.value);
    }
  }
  async saveOrder() {
    await Preferences.set({
      key: KEY_ORDER,
      value: JSON.stringify(this.order),
    });
  }
  async resetOrder() {
    this.order.products = [];
    await this.saveOrder();
  }

  async clear() {
    this.order = new Order();
    this.order.products = [];
    await this.saveOrder();
  }

  getProducts() {
    return this.order.products;
  }

  numProducts() {
    if (this.order && this.order.products.length > 0) {
      return this.order.products.reduce(
        (acum: number, value: QuantityProduct) => value.quantity + acum,
        0
      );
    }
    return 0;
  }

  async addProduct(product: Product) {
    const productFound = this.searchProduct(product);

    if (productFound) {
      productFound.quantity++;
    } else {
      this.order.products.push({
        product,
        quantity: 1,
      });
    }

    await this.saveOrder();
  }

  private searchProduct(product: Product) {
    return this.order.products.find((p: QuantityProduct) =>
      isEqual(p.product, product)
    );
  }

  hasUser() {
    return this.order && this.order.user;
  }

  async saveUser(user: User) {
    delete user.password;
    this.order.user = user;
    await this.saveOrder();
  }
}
function isEqual(product: Product, product1: Product): unknown {
  throw new Error('Function not implemented.');
}
