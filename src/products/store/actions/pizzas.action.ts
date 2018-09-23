import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// export const MY_ACTION = '[Feature] My Action';
export const LOAD_PIZZAS = '[products] LOAD_PIZZAS';
export const LOAD_PIZZAS_FAIL = '[products] LOAD_PIZZAS_FAIL';
export const LOAD_PIZZAS_SUCCESS = '[products] LOAD_PIZZAS_SUCCESS';
export const SELECT_PIZZA = '[products] SELECT_PIZZA';

export const CREATE_PIZZA = '[products] CREATE_PIZZA';
export const CREATE_PIZZA_FAIL = '[products] CREATE_PIZZA_FAIL';
export const CREATE_PIZZA_SUCCESS = '[products] CREATE_PIZZA_SUCCESS';

export const UPDATE_PIZZA = '[products] UPDATE_PIZZA';
export const UPDATE_PIZZA_FAIL = '[products] UPDATE_PIZZA_FAIL';
export const UPDATE_PIZZA_SUCCESS = '[products] UPDATE_PIZZA_SUCCESS';

export const REMOVE_PIZZA = '[products] REMOVE_PIZZA';
export const REMOVE_PIZZA_FAIL = '[products] REMOVE_PIZZA_FAIL';
export const REMOVE_PIZZA_SUCCESS = '[products] REMOVE_PIZZA_SUCCESS';


// export class MyAction implements Action {
//   readonly type = MY_ACTION;
//   constructor(public payload: any) {}
// }

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
    constructor() {}
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class SelectPizza implements Action {
  readonly type = SELECT_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class RemovePizza implements Action {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class RemovePizzaFail implements Action {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class RemovePizzaSuccess implements Action {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// action types
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess |
  SelectPizza |
  CreatePizza | CreatePizzaFail | CreatePizzaSuccess |
  UpdatePizza | UpdatePizzaFail | UpdatePizzaSuccess |
  RemovePizza | RemovePizzaFail | RemovePizzaSuccess; // MyAction;
