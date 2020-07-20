import React, { useReducer, Dispatch, useEffect } from "react"
import { 
  initialState as cartInitialState, 
  State as CartState ,
  reducer as cartReducer,
  init as initCart,
} from "./cart-state"

export interface Action {
  type: any
  payload?: any
}

export interface State {
  isLoading: boolean
  cart: CartState
}

export const initialState: State = {
  isLoading: false,
  cart: cartInitialState,
}

enum ActionTypes {
  setIsLoading
}

export const actions = {
  setIsLoading: (value: boolean) => ({
    type: ActionTypes.setIsLoading,
    payload: value,
  })
}

const reducer: (s: State, a: Action) => State =
(state, action) => {
  switch (action.type) {
    case ActionTypes.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      }

    default:
      return state
  }
}

const combinedReducer: (s: State, a: Action) => State =
  (state, action) => ({
    ...reducer(state, action),
    cart: cartReducer(state.cart, action),
  })

export const GlobalStateContext = React.createContext<State>(initialState)
export const GlobalDispatchContext = React.createContext<Dispatch<Action>>((v: Action) => {})

interface Props {
  children: React.ReactNode
}
const GlobalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(combinedReducer, initialState, (state) => ({
    ...state,
    cart: initCart(state.cart)
  }))

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider