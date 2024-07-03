import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { GetProductById } from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductsByCategory(idCategory: string) {
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/category/' + idCategory,
      params: {},
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response: HttpResponse) => {
      if (response.status == 200) {
        const data = response.data as Product[];
        return data;
      }
      return [];
    });
  }

  GetProductById(id: string) {
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/' + id,
      params: {},
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response: HttpResponse) => {
      if (response.status == 200) {
        const data = response.data as Product;
        return data;
      }
      return null;
    });
  }
}
