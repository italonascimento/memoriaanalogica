import React, { useRef, useState } from 'react'

import CartButton from "../molecules/cart-button";
import useGlobalState from '../../state/useGlobalState';
import Popover from '../atoms/popover';
import List, { ListItem } from '../atoms/list';
import useTranslation from '../hooks/useTanslation';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';

const CartPopover = () => {
  const [cart] = useGlobalState(s => s.cart)
  const [isOpen, setIsOpen] = useState(false) 
  const t = useTranslation()
  const popoverRef = useRef<HTMLDivElement>(null)
  
  useClickOutsideHandler(popoverRef, () => {
    setIsOpen(false)
  })
  
  const getDetails = (sku: string, key: string) => t(`products.${sku}.${key}`)
  
  return (
    <div ref={popoverRef} onClick={() => setIsOpen(!isOpen)}>
      <CartButton elevation={isOpen ? 1 : 0} quantity={cart.items.length} />
      {isOpen && (
        <Popover anchor={{h: 'right', v: 'top'}}>
          <List>
            {cart.items.map(item => (
              <ListItem key={item.product.sku}>
                {getDetails(item.product.sku, 'name')}
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </div>
  )
}

export default CartPopover