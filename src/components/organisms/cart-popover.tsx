import React, { useRef, useState, useCallback } from 'react'

import useMedia from '../hooks/use-media'
import CartButton from "../molecules/cart-button";
import useGlobalState from '../../state/useGlobalState';
import Popover from '../atoms/popover';
import List, { ListItem } from '../atoms/list';
import useTranslation from '../hooks/useTanslation';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';
import CartItem from './cart-item';
import styled, { ThemeProps } from 'styled-components';
import { Theme } from '../../themes/default-theme';
import Modal from '../atoms/modal';
import mediaQueries, { mediaQueryValues } from '../../styles/media-queries';

const CartPopover = () => {
  const [cart] = useGlobalState(s => s.cart)
  const [isOpen, setIsOpen] = useState(false) 
  const t = useTranslation()
  const popoverRef = useRef<HTMLDivElement>(null)
  const md = useMedia(mediaQueryValues.md)
  
  useClickOutsideHandler(popoverRef, () => {
    setIsOpen(false)
  })

  const getTotalAmount = useCallback(() => {
    return cart.items.reduce((acc, curr) => acc + curr.amount, 0)
  }, [cart.items])

  const CartContent = (
    <StyledList>
      {cart.items.length > 0
        ? (
          cart.items.map(item => (
            <CartItem {...item} />
          ))
        )
        : (
          <EmptyWarning>
            {t('cart.cart-is-empty')}
          </EmptyWarning>
        )}
    </StyledList>
  )
  
  return (
    <div ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <CartButton elevation={isOpen ? 1 : 0} quantity={getTotalAmount()} />
      </div>
      {md ? (
        isOpen && (
          <Popover anchor={{h: 'right', v: 'top'}}>
            {CartContent}
          </Popover>
        )
      ) : (
        isOpen && (
          <Modal title='Cart' onClose={() => setIsOpen(false)}>
            {CartContent}
          </Modal>
        )
      )}
    </div>
  )
}

const StyledList = styled(List)`
  ${mediaQueries.md} {
    width: 300px;
  }
`

const EmptyWarning = styled.p`
  padding: 16px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.grey};

  ${mediaQueries.md} {
    text-align: center;
  }
`

export default CartPopover