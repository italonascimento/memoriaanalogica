import React, { useRef, useState, useCallback, useEffect } from 'react'
import { navigate } from 'gatsby-plugin-intl';
import styled, { ThemeProps } from 'styled-components';

import useMedia from '../hooks/use-media'
import CartButton from "../molecules/cart-button";
import useGlobalState from '../../state/useGlobalState';
import Popover from '../atoms/popover';
import List from '../atoms/list';
import useTranslation from '../hooks/useTanslation';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';
import CartItem from './cart-item';
import { Theme } from '../../themes/default-theme';
import Modal from '../atoms/modal';
import mediaQueries, { mediaQueryValues } from '../../styles/media-queries';
import Button from '../atoms/button';
import Spacing from '../atoms/spacing';
import useDelayUnmount from '../hooks/use-delay-unmount';
import CSSTransition from '../atoms/css-transition';
import { actions } from '../../state/cart-state';
import Price from '../atoms/price';

const CartPopover = () => {
  const [cart, dispatch] = useGlobalState(s => s.cart)
  const t = useTranslation()
  const k = useTranslation('cart')
  const popoverRef = useRef<HTMLDivElement>(null)
  const md = useMedia(mediaQueryValues.md)

  const shouldShow = useDelayUnmount(cart.isOpen, 610)

  const setIsOpen = (value: boolean) =>
    dispatch(actions.setIsCartOpen(value))
  
  useClickOutsideHandler(popoverRef, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cart', JSON.stringify(cart.items))
    }
  }, [cart.total])

  const getTotalAmount = useCallback(() => {
    return cart.items.reduce((acc, curr) => acc + curr.amount, 0)
  }, [cart.items])

  const CartContent = (
    <Container>
      {cart.items.length > 0
        ? (
          <>
            <StyledList>
              {cart.items.map(item => (
                <CartItem key={item.product.sku} {...item} />
              ))}
            </StyledList>
            <Spacing y={8} />
            <div>
              <Subtotal>
                <p>{k('subtotal')}:</p>
                <Price value={cart.total} />
              </Subtotal>
              <StyledButton
                full 
                primary 
                large 
                onClick={() => {
                  setIsOpen(false)
                  navigate('/checkout/shipment/')
                }}>
                <p>
                  {k('proceed_to_checkout')}
                </p>
              </StyledButton>
            </div>
          </>
        )
        : (
          <EmptyWarning>
            {k('cart_is_empty')}
          </EmptyWarning>
        )}
    </Container>
  )
  
  return (
    <div ref={popoverRef}>
      <CartButton
        onClick={() => setIsOpen(!cart.isOpen)}
        elevation={cart.isOpen ? 1 : 0}
        quantity={getTotalAmount()}
      />
      {md ? (
        shouldShow && (
          <CSSTransition name='popover' show={cart.isOpen}>
            <StyledPopover anchor={{h: 'right', v: 'top'}}>
              {CartContent}
            </StyledPopover>
          </CSSTransition>
        )
      ) : (
        shouldShow && (
          <Modal show={cart.isOpen} title={k('shopping_cart')} onClose={() => setIsOpen(false)}>
            {CartContent}
          </Modal>
        )
      )}
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  ${mediaQueries.md} {
    width: 340px;
    max-height: 400px;
  }
`

const StyledPopover = styled(Popover)`
  transition: transform 100ms ease-in-out, opacity 100ms ease-in-out;
  
  &.popover-enter, &.popover-leave, &.popover-leave-active {
    transform: translateY(-32px) scale(0.9);
    opacity: 0;
  }

  &.popover-enter-active {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`

const Subtotal = styled.div`
  font-size: 18px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
`

const EmptyWarning = styled.p`
  padding: 16px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.grey};

  ${mediaQueries.md} {
    text-align: center;
  }
`

const StyledButton = styled(Button)`
  flex-shrink: 0;

  ${mediaQueries.md} {
    border-radius: 0;
  }
`

const StyledList = styled(List)`
  flex-shrink: 1 1 0;
  overflow: auto;
`

export default CartPopover