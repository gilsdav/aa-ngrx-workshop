import * as fromToppings from '../actions/toppings.action';
import { Pizza } from '../../models/pizza.model';

export interface ToppingsState {
    loaded: boolean;
    loading: boolean;
    toppings: string[];
}

const initialState: ToppingsState = {
    loaded: false,
    loading: false,
    toppings: []
};

export function reducer(state = initialState, action: fromToppings.ToppingsAction) {
    switch (action.type) {
        case fromToppings.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromToppings.LOAD_TOPPINGS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                toppings: action.payload
            };
        }
        case fromToppings.LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        default: {
            break;
        }
    }
    return state;
}

export const getToppings = (state: ToppingsState) => state.toppings;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;

