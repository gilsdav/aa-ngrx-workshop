import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
    loaded: boolean;
    loading: boolean;
    pizza: Pizza[];
    selected: Pizza;
}

const initialState: PizzaState = {
    loaded: false,
    loading: false,
    pizza: [],
    selected: null
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction) {
    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }
        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                pizza: action.payload
            };
        }
        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromPizzas.SELECT_PIZZA: {
            return {
                ...state,
                selected: action.payload
            };
        }

        case fromPizzas.CREATE_PIZZA_SUCCESS: {
            return {
                ...state,
                pizza: [...state.pizza, action.payload]
            };
        }

        case fromPizzas.UPDATE_PIZZA_SUCCESS: {
            const newPizzaList = [...state.pizza];
            const index = newPizzaList.findIndex((pizza) => {
                return pizza.id === action.payload.id;
            });
            newPizzaList[index] = action.payload;
            return {
                ...state,
                pizza: newPizzaList
            };
        }

        case fromPizzas.REMOVE_PIZZA_SUCCESS: {
            return {
                ...state,
                pizza: state.pizza.filter(pizza => pizza.id !== action.payload.id)
            };
        }
    }
    return state;
}

export const getPizzas = (state: PizzaState) => state.pizza;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getSelectedPizza = (state: PizzaState) => state.selected;
