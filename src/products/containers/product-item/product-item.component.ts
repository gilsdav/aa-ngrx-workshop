import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import { ToppingsService } from '../../services/toppings.service';

import * as fromStore from '../../store';


@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="(pizza$ | async)"
        [toppings]="(toppings$ | async)"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="(selected$ | async)">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  // selected: Pizza;
  selected$: Observable<Pizza>;
  toppings$: Observable<string[]>;

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {

    // this.store.dispatch(new fromStore.LoadPizzas());
    // this.store.dispatch(new fromStore.LoadToppings());

    this.selected$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getToppings);

    this.pizza$ = this.route.params.pipe(switchMap((params) => {

      if (params.id === 'new') {
          this.store.dispatch(new fromStore.SelectPizza({}));
          return of({});
      }

      return this.store.select(fromStore.getPizzas).pipe(
        map(pizzas => {
          const id = parseInt(params.id, 10);
          const findedPizza = pizzas.find(pizza => pizza.id === id);
          return findedPizza;
        }),
        tap((pizza: Pizza) => {
          this.store.dispatch(new fromStore.SelectPizza(pizza));
        })
      );
    }));

  }

  onSelect(event: Pizza) {
    // this.selected = event;
    this.store.dispatch(new fromStore.SelectPizza(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
    /* this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products/${pizza.id}`]);
    }); */
  }

  onUpdate(event: Pizza) {
    console.log('update click');
    this.store.dispatch(new fromStore.UpdatePizza(event));
    /* this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    }); */
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      /* this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      }); */
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
