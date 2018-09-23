import { Action } from '@ngrx/store';

export const LOAD_TOPPINGS = '[products] LOAD_TOPPINGS';
export const LOAD_TOPPINGS_FAIL = '[products] LOAD_TOPPINGS_FAIL';
export const LOAD_TOPPINGS_SUCCESS = '[products] LOAD_TOPPINGS_SUCCESS';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
  constructor() {}
}

export class LoadToppingsFail implements Action {
readonly type = LOAD_TOPPINGS_FAIL;
constructor(public payload: any) {}
}

export class LoadToppingsSuccess implements Action {
readonly type = LOAD_TOPPINGS_SUCCESS;
constructor(public payload: string[]) {}
}

// action types
export type ToppingsAction = LoadToppings | LoadToppingsFail | LoadToppingsSuccess;

