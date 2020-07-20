import { Product } from "../types/product";
import { Action } from "./global-state";

enum ActionType {
  addToCart = "addToCart",
  removeFromCart = "removeFromCart",
  replaceCart = "replaceCart",
  setAmount = "setAmount",
  resetCart = "resetCart",
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
  if (typeof window !== 'undefined') {
    const savedItem = window.localStorage.getItem('cart')
    return {
      ...state,
      items: savedItem
        ? JSON.parse(savedItem)
        : []
    }
  }

  return state
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

  setAmount: (sku: string, newAmount: number) => ({
    type: ActionType.setAmount,
    payload: {
      sku,
      newAmount,
    }
  }),

  replaceCart: (cart: CartItem[]) => ({
    type: ActionType.replaceCart,
    payload: cart,
  }),

  resetCart: () => ({
    type: ActionType.resetCart,
  })
}

export const reducer: (state: State, action: Action) => State =
  (state, action) => {
    const { payload, type } = action
    switch (action.type) {
      case ActionType.addToCart: {
        const items = [...state.items]
        const index = items.findIndex(item => item.product.sku === payload.product.sku)

        if (index >= 0) {
          items[index] = {
            ...items[index],
            amount: items[index].amount + payload.amount,
          }
        } else {
          items.push(payload)
        }
        
        return {
          ...state,
          items,
        }
      }

      case ActionType.removeFromCart: {
        const items = [...state.items]
        items[payload.index].amount -= payload.amount
        
        return {
          ...state,
          items: items.filter(item => item.amount !== 0),
        }
      }

      case ActionType.setAmount: {
        const items = [...state.items]
        const index = items.findIndex(item => item.product.sku === payload.sku)

        if (index >= 0) {
          items[index] = {
            ...items[index],
            amount: payload.newAmount,
          }
        }

        return {
          ...state,
          items: payload.newAmount === 0
            ? [
              ...items.slice(0, index),
              ...items.slice(index + 1),
            ]
            : items,
        }
      }

      case ActionType.replaceCart:
        return {
          ...state,
          items: payload,
        }

      case ActionType.resetCart:
        return initialState

      default:
        return state
    }
  }
