import { Product } from "../types/product";
import { Action } from "./global-state";

enum ActionType {
  addToCart,
  removeFromCart,
  replaceCart,
}

export interface CartItem {
  amount: number
  product: Product
}

export interface State {
  items: CartItem[]
}

export const initialState: State = {
  items: []
}

export const init = (state: State) => {
  const savedItem = window.localStorage.getItem('cart')
  return {
    ...state,
    items: savedItem
      ? JSON.parse(savedItem)
      : []
  }
}

export const actions = {
  addToCart: (product: Product, amount = 1) => ({
    type: ActionType.addToCart,
    payload: {
      product,
      amount,
    },
  }),

  removeFromCart: (index: number, amount = 1) => ({
    type: ActionType.removeFromCart,
    payload: {
      index,
      amount,
    },
  }),

  replaceCart: (cart: CartItem[]) => ({
    type: ActionType.replaceCart,
    payload: cart,
  })
}

export const reducer: (state: State, action: Action) => State =
  (state, action) => {
    const { payload, type } = action
    switch (action.type) {
      case ActionType.addToCart:
        return {
          ...state,
          items: [
            ...state.items,
            action.payload,
          ]
        }

      case ActionType.removeFromCart: {
        const items = [...state.items]
        items[payload.index].amount -= payload.amount
        
        return {
          ...state,
          items: items.filter(item => item.amount !== 0),
        }
      }

      case ActionType.replaceCart:
        return {
          ...state,
          items: payload,
        }

      default:
        return state
    }
  }
