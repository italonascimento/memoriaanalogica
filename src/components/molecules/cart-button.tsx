import React, { DOMAttributes } from 'react'

import Button, { ButtonProps } from "../atoms/button";
import { GiShoppingCart } from "react-icons/gi";
import Badge from '../atoms/badge';
import styled from 'styled-components';

interface CartButtonProps extends ButtonProps {
  quantity?: number
}

const CartButton = ({
  quantity = 0,
  elevation,
}: CartButtonProps) => (
  <StyledButton elevation={elevation} outline accent={quantity > 0}>
    <GiShoppingCart size={24} />
    {quantity > 0 && (
      <StyledBadge accent>
        {quantity}
      </StyledBadge>
    )}
  </StyledButton>
)

const StyledButton = styled(Button)`
  padding: 0 8px;
`

const StyledBadge = styled(Badge)`
  margin-top: -10px;
`

export default CartButton