import React from 'react'

import Button from "../atoms/button";
import { GiShoppingCart } from "react-icons/gi";
import Badge from '../atoms/badge';
import styled from 'styled-components';
import Spacing from '../atoms/spacing';
import { AiFillCaretDown } from 'react-icons/ai';

interface CartButtonProps {
  quantity?: number
}

const CartButton = ({
  quantity = 0
}: CartButtonProps) => (
  <StyledButton outline accent={quantity > 0} elevation={0}>
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