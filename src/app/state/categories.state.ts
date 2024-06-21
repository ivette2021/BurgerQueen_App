import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCategories } from './categories.actions';
import { Category } from '../models/category';
import { CategoriesService } from './categories.service';

export class CategoriesStateModel {
  categories: Category[];
}

const defaults = {
  categories: [],
};

@State<CategoriesStateModel>({
  name: 'categories',
  defaults,
})
@Injectable()
export class CategoriesState {
  @Selector()
  static categories(state: CategoriesStateModel) {}
  constructor(private categoriesService: CategoriesService) {}
  @Action(GetCategories)
  add({ getState, setState }: StateContext<CategoriesStateModel>) {}
}
