import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {

  @Effect()
  private loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS)
  .pipe(exhaustMap(() => {
      return this.toppingsService.getToppings().pipe(
      map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
      catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
    );
  }));

  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions
  ) {}
}
