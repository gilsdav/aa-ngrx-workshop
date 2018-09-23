import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';
// import { PizzasService } from '../../services/pizzas.service';

import * as fromStore from '../../store';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(/*private pizzaService: PizzasService, */private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    /*this.store.select(state => {
      console.log('Select', state);
      return (<any>state)['products'].pizzas.data;
    }).subscribe();*/

    /*this.store.dispatch(new fromStore.LoadPizzas());
    this.pizzaService.getPizzas().subscribe(pizzas => {
      // this.pizzas = pizzas;
      this.store.dispatch(new fromStore.LoadPizzasSuccess(pizzas));
    }, error => {
      this.store.dispatch(new fromStore.LoadPizzasFail(error));
    });*/

    this.pizzas$ = this.store.select(fromStore.getPizzas);
    // this.store.dispatch(new fromStore.LoadPizzas());


  }
}
