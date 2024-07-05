import { Injectable } from '@angular/core';
import { Order } from '../../../app/models/order';
import { Preferences } from '@capacitor/preferences';
import { KEY_ORDER } from '../../../app/constants/constants';
import { Product } from '../models/product';
import { isEqual } from 'lodash-es';
import { QuantityProduct } from 'src/app/models/quantity-products';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  private order: Order;

  constructor() {
    this.initOrder();
  }
  async initOrder() {
    const order = await Preferences.get({ key: KEY_ORDER });
    if (!order.value) {
      this.clear();
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
}
