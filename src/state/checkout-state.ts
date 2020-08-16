import { Action } from "./global-state"

enum ActionType {
  setShipmentInfo = "setShipmentData",
  setOrderId = "setOrderId",
  resetCheckout = "resetCheckout"
}

export interface ShipmentInfo {
  fullName?: string
  recipientFullName?: string
  address?: string
  complement?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  email?: string
}

export interface State {
  shipmentInfo: ShipmentInfo
  orderId?: string
}

export const initialState: State = {
  shipmentInfo: {},
}

export const actions = {
  setShipmentInfo: (info: ShipmentInfo) => ({
    type: ActionType.setShipmentInfo,
    payload: info,
  }),

  setOrderId: (id: string) => ({
    type: ActionType.setOrderId,
    payload: id,
  })
}

export const reducer: (state: State, action: Action) => State =
  (state, action) => {
    const { payload, type } = action
    switch (action.type) {
      case ActionType.setShipmentInfo:
        return {
          ...state,
          shipmentInfo: payload,
        }
      
      case ActionType.setOrderId:
        return {
          ...state,
          orderId: payload,
        }
      
      case ActionType.resetCheckout:
        return initialState
      
      default:
        return state
    }
  }