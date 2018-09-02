import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromPizzas from './pizza.reducer';
import {getPizzasList} from "./pizza.reducer";

export interface ProductState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductState> = {
  pizzas: fromPizzas.reducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');

export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductState) => state.pizzas
);

export const getPizzasEntities = createSelector(getPizzasState, fromPizzas.getPizzasList);
export const getAllPizzas = createSelector(
  getPizzasEntities,
  entities => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);
export const getPizzasLoading = createSelector(getPizzasState, fromPizzas.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzasState, fromPizzas.getPizzasLoaded);

