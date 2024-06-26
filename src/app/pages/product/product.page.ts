import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductExtraOption } from 'src/app/models/product-extra-option';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public product: Product;

  constructor(
    private navController: NavController,
    private navParams: NavParams
  ) {
    console.log(this.navParams.data['product']);
    this.product = this.navParams.data['product'];
  }

  ngOnInit() {
    if (!this.product) {
      this.navController.navigateForward('categories');
    }
  }
  changeMultipleOption($event, options: ProductExtraOption[]) {
    console.log($event);

    options.forEach((op) => (op.activate = $event.detail.value == op.name));

    console.log(options);
    console.log(this.product);
    this.calculateTotal();
  }

  calculateTotal() {
    let total = this.product.price;

    this.product.extras.forEach((extra) => {
      extra.blocks.forEach((block) => {
        if (block.options.length == 1 && block.options[0].activate) {
          total += block.options[0].price;
        } else if (block.options.length > 1) {
          const option = block.options.find((op) => op.activate);
          if (option) {
            total += option.price;
          }
        }
      });
    });
    this.total = total;
  }
}
