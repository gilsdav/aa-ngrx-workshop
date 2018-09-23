import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {

  @Effect()
  private loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
  .pipe(exhaustMap(() => {
      return this.pizzaService.getPizzas().pipe(
      map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
      catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
    );
  }));

  @Effect()
  private createPizzas$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
  .pipe(map((action: pizzaActions.CreatePizza) => action.payload))
  .pipe(exhaustMap((pizza) => {
    return this.pizzaService.createPizza(pizza).pipe(
      map(newPizza => {
        return new pizzaActions.CreatePizzaSuccess(newPizza);
      }),
      catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    );
  }));

  @Effect({dispatch: false})
  private createPizzasSuccess$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
  .pipe(
    map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
    tap(pizza => this.router.navigate([`/products/${pizza.id}`]))
  );

  @Effect()
  private updatePizzas$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA)
  .pipe(map((action: pizzaActions.UpdatePizza) => action.payload), tap(() => console.log('test')))
  .pipe(exhaustMap((pizza) => {
    return this.pizzaService.updatePizza(pizza).pipe(
      map(newPizza => {
        return new pizzaActions.UpdatePizzaSuccess(newPizza);
      }),
      catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    );
  }));

  @Effect({dispatch: false})
  private updatePizzasSuccess$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA_SUCCESS)
  .pipe(
    tap(() => this.router.navigate([`/products`]))
  );

  @Effect()
  private removePizzas$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA)
  .pipe(map((action: pizzaActions.RemovePizza) => action.payload))
  .pipe(exhaustMap((pizza) => {
    return this.pizzaService.updatePizza(pizza).pipe(
      map(newPizza => {
        return new pizzaActions.RemovePizzaSuccess(newPizza);
      }),
      catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
    );
  }));

  @Effect({dispatch: false})
  private removePizzasSuccess$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA_SUCCESS)
  .pipe(
    tap(() => this.router.navigate([`/products`]))
  );

  constructor(
    private router: Router,
    private pizzaService: fromServices.PizzasService,
    private actions$: Actions
  ) {}
}
