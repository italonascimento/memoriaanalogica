import React from 'react'

import CartButton from "../molecules/cart-button";
import useGlobalState from '../../state/useGlobalState';

const CartPopover = () => {
  const [state] = useGlobalState()
  
  return (
    <div>
      <CartButton quantity={state.cart.items.length} />
    </div>
  )
}

export default CartPopover