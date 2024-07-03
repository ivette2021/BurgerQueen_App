import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { GetProductsByCategory } from 'src/app/state/products/products.actions';
import { ProductsState } from 'src/app/state/products/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  @Select(ProductsState.products)
  private product$: Observable<Product[]>;
  public products: Product[];
  private idCategory: string;

  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) {
    console.log(this.navParams.data['idCategory']);
    this.idCategory = this.navParams.data['idCategory'];
    this.products = [];
  }

  async ngOnInit() {
    if (this.idCategory) {
      const loading = await this.loadingController.create({
        message: this.translate.instant('label.loading'),
      });

      await loading.present();

      // this.store
      //   .dispatch(new GetProductsByCategory({ idCategory: this.idCategory }))
      this.product$.subscribe({
        next: () => {
          this.products = this.store.selectSnapshot(ProductsState.products);
          console.log(this.products);
          loading.dismiss();
        },
        error: (err) => {
          console.error(err);
          loading.dismiss();
        },
      });
    } else {
      this.navController.navigateForward('categories');
    }
  }
  goToProduct(product: Product) {
    this.navParams.data['product'] = product;
    this.navController.navigateForward('product');
  }
  refreshProducts($event) {
    this.store.dispatch(
      new GetProductsByCategory({ idCategory: this.idCategory })
    );
    $event.target.complete();
  }
}
