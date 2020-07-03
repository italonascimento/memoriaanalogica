import React, { useContext, Dispatch } from "react"
import { GlobalDispatchContext, GlobalStateContext, Action, State } from "./global-state"

const useGlobalState: () => [State, Dispatch<Action>] = () => {
  const dispatch = useContext<Dispatch<Action>>(GlobalDispatchContext)
  const state = useContext<State>(GlobalStateContext)
  return [state, dispatch]
}

export default useGlobalState