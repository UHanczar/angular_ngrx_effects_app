import {Pizza} from "../../models/pizza.model";
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState = {
  entities: {},
  loaded: false,
  loading: false
};

export const reducer = (
  state = initialState,
  action: fromPizzas.PizzasAction
):PizzaState => {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS:
      return {
        ...state,
        loading: true
      };
    case fromPizzas.LOAD_PIZZAS_SUCCESS:
      return {
        ...state,
        entities: action.payload.reduce((entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        }, { ...state.entities }),
        loading: false,
        loaded: true
      };
    case fromPizzas.LOAD_PIZZAS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
};

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasList = (state: PizzaState) => state.entities;
