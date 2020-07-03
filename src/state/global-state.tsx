import React, { useReducer, Dispatch } from "react"
import { 
  initialState as cartInitialState, 
  State as CartState ,
  reducer as cartReducer,
} from "./cart-state"

export interface Action {
  type: any
  payload: any
}

export interface State {
  cart: CartState
}

export const initialState: State = {
  cart: cartInitialState,
}

const reducer: (s: State, a: Action) => State =
  (state, action) => ({
    ...state,
    cart: cartReducer(state.cart, action),
  })


export const GlobalStateContext = React.createContext<State>(initialState)
export const GlobalDispatchContext = React.createContext<Dispatch<Action>>((v: Action) => {})

interface Props {
  children: React.ReactNode
}
const GlobalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider