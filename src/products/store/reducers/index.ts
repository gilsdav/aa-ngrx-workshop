import { ActionReducerMap } from '@ngrx/store';

import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

// feature state
export interface ProductsState {
    pizzas: fromPizzas.PizzaState,
    toppings: fromToppings.ToppingsState
}

// reducers
export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer
};

// selectors
export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);
export const getPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
export const getSelectedPizza = createSelector(getPizzaState, fromPizzas.getSelectedPizza);
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);

export const getToppingState = createSelector(getProductsState, (state: ProductsState) => state.toppings);
export const getToppings = createSelector(getToppingState, fromToppings.getToppings);
export const getToppingsLoaded = createSelector(getToppingState, fromToppings.getToppingsLoaded);
