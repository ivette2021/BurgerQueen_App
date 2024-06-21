import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  constructor(private store: Store) {
    this.categories = [];
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.store.dispatch(new GetCategories()).subscribe({
      next: () => {
        this.categories = this.store.selectSnapshot(categoriesState.categories);
        console.log(this.categories);
      },
    });
  }
}
