import React, { useContext, Dispatch } from "react"
import { GlobalDispatchContext, GlobalStateContext, Action, State } from "./global-state"

type Selector<T> = (s: State) => T

const useGlobalState: <T>(selector: Selector<T>) => [T, Dispatch<Action>] = 
  (selector) => {
    const dispatch = useContext<Dispatch<Action>>(GlobalDispatchContext)
    const state = useContext<State>(GlobalStateContext)
    return [selector(state), dispatch]
  }

export default useGlobalState