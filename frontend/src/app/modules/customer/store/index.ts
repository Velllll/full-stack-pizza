import { ICartState, cartReducers } from './cart.store';
import { ActionReducerMap } from "@ngrx/store";

export interface State {
    cart: ICartState
}

export const reducers: ActionReducerMap<State> = {
    cart: cartReducers
}