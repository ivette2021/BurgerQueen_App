import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { AuthAction } from './auth.actions';

describe('Auth actions', () => {
  let store: Store;

  beforeEach(waitForAsync () => {
    void TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should create an action and add an item', () => {
    store.dispatch(new AuthAction('item-1'));
    store.select(state => state.auth.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });

});
