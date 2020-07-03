import React from 'react'

import Button from "../atoms/button";
import { GiShoppingCart } from "react-icons/gi";

interface CartButtonProps {
  quantity?: number
}

const CartButton = ({
  quantity = 0
}: CartButtonProps) => (
  <Button outline accent={quantity > 0} elevation={0}>
    <GiShoppingCart size={24} />
    {quantity}
  </Button>
)

export default CartButton