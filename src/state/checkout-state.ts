import { Action } from "./global-state"

enum ActionType {
  setShipmentInfo = "setShipmentData",
  setCardInfo = "setCardInfo",
  setOrderId = "setOrderId",
  setPaymentNonce = "setPaymentNonce",
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

export interface CreditCardInfo {
  brand?: string
  finalDigits?: string
  expiration?: string
}

export interface State {
  shipmentInfo: ShipmentInfo
  creditCardInfo: CreditCardInfo
  orderId?: string
  paymentNonce?: string
}

export const initialState: State = {
  shipmentInfo: {},
  creditCardInfo: {},
}

export const actions = {
  setShipmentInfo: (info: Partial<ShipmentInfo>) => ({
    type: ActionType.setShipmentInfo,
    payload: info,
  }),

  setOrderId: (id: string) => ({
    type: ActionType.setOrderId,
    payload: id,
  }),

  setPaymentNonce: (nonce: string) => ({
    type: ActionType.setPaymentNonce,
    payload: nonce,
  }),

  setCardInfo: (info: Partial<CreditCardInfo>) => ({
    type: ActionType.setCardInfo,
    payload: info,
  })
}

export const reducer: (state: State, action: Action) => State =
  (state, action) => {
    const { payload, type } = action
    switch (action.type) {
      case ActionType.setShipmentInfo:
        return {
          ...state,
          shipmentInfo: {
            ...state.shipmentInfo,
            ...payload,
          },
        }
      
      case ActionType.setCardInfo:
        return {
          ...state,
          creditCardInfo: {
            ...state.creditCardInfo,
            ...payload,
          },
        }
      
      case ActionType.setOrderId:
        return {
          ...state,
          orderId: payload,
        }
      
      case ActionType.setPaymentNonce:
        return {
          ...state,
          paymentNonce: payload,
        }
      
      case ActionType.resetCheckout:
        return initialState
      
      default:
        return state
    }
  }