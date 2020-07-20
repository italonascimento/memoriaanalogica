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
  total: number
}

export const initialState: State = {
  items: [],
  total: 0,
}

const getTotal = (items: CartItem[]) => 
  items.reduce((acc: number, curr: CartItem) => 
    acc + curr.amount * curr.product.price, 0
  )

export const init = (state: State) => {
  if (typeof window !== 'undefined') {
    const savedItems = window.localStorage.getItem('cart')
    const items = savedItems
      ? JSON.parse(savedItems)
      : []
    return {
      ...state,
      items,
      total: getTotal(items),
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
          total: getTotal(items),
        }
      }

      case ActionType.removeFromCart: {
        const previousItems = [...state.items]
        previousItems[payload.index].amount -= payload.amount
        const items = previousItems.filter(item => item.amount !== 0)
        
        return {
          ...state,
          items,
          total: getTotal(items),
        }
      }

      case ActionType.setAmount: {
        const previousItems = [...state.items]
        const index = previousItems.findIndex(item => item.product.sku === payload.sku)
        const items = payload.newAmount === 0
          ? [
            ...previousItems.slice(0, index),
            ...previousItems.slice(index + 1),
          ]
          : previousItems

        if (index >= 0) {
          previousItems[index] = {
            ...previousItems[index],
            amount: payload.newAmount,
          }
        }

        return {
          ...state,
          items,
          total: getTotal(items),
        }
      }

      case ActionType.replaceCart:
        return {
          ...state,
          items: payload,
          total: getTotal(payload),
        }

      case ActionType.resetCart:
        return initialState

      default:
        return state
    }
  }
