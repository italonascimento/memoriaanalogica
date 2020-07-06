import React, { useRef, useState } from 'react'

import CartButton from "../molecules/cart-button";
import useGlobalState from '../../state/useGlobalState';
import Popover from '../atoms/popover';
import List, { ListItem } from '../atoms/list';
import useTranslation from '../hooks/useTanslation';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';
import CartItem from '../molecules/cart-item';
import styled from 'styled-components';

const CartPopover = () => {
  const [cart] = useGlobalState(s => s.cart)
  const [isOpen, setIsOpen] = useState(false) 
  const t = useTranslation()
  const popoverRef = useRef<HTMLDivElement>(null)
  
  useClickOutsideHandler(popoverRef, () => {
    setIsOpen(false)
  })
  
  return (
    <div ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <CartButton elevation={isOpen ? 1 : 0} quantity={cart.items.length} />
      </div>
      {isOpen && (
        <Popover anchor={{h: 'right', v: 'top'}}>
          <StyledList>
            {cart.items.map(item => (
              <CartItem {...item} />
            ))}
          </StyledList>
        </Popover>
      )}
    </div>
  )
}

const StyledList = styled(List)`
  width: 300px;
`

export default CartPopover