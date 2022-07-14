import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store"
import { ICart } from '../interfaces/category';



export const setItem = createAction('[CART] getItem', props<{img: string, name: string, price: number}>())
export const deleteItem = createAction('[CART] deleteItem', props<{name: string}>())
export const deleteAllItem = createAction('[CART] deleteAllItem')

export interface ICartState {
    items: ICart[]
}

export const initialState: ICartState = {
    items: [],
}

export const cartReducers = createReducer(
    initialState,
    on(setItem, (state, action) => {
        return {
        ...state,
        items: [...state.items, {name: action.name, img: action.img, price: action.price}],
        }
    }),
    on(deleteItem, (state, action) => {
      const index = state.items.findIndex(i => i.name === action.name)
      let arr = [...state.items]
      arr.splice(index, 1)
      return {
        ...state,
        items: arr
      }
    }),
    on(deleteAllItem, (state) => {
      return {
        ...state,
        items: []
      }
    })
)

export const featureSelectir = createFeatureSelector<ICartState>('cart')
export const cartSelector = createSelector(featureSelectir, (a) => a.items)
export const cartAmountSelector = createSelector(featureSelectir, (a) => a.items.length)
