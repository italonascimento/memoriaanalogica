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
import Backdrop from '../atoms/backdrop';
import Spacing from '../atoms/spacing';

const CartPopover = () => {
  const [cart] = useGlobalState(s => s.cart)
  const [isOpen, setIsOpen] = useState(false)
  const [isFirstItem, setIsFirstItem] = useState(true)
  const t = useTranslation('cart')
  const popoverRef = useRef<HTMLDivElement>(null)
  const md = useMedia(mediaQueryValues.md)
  
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
            <StyledButton full primary large onClick={() => navigate('/checkout/shipment/')}>
              <p>
                <Total>${cart.total}</Total>
                <Spacing x={8} inline />
                {t('proceed_to_checkout')}
              </p>
            </StyledButton>
          </>
        )
        : (
          <EmptyWarning>
            {t('cart_is_empty')}
          </EmptyWarning>
        )}
    </Container>
  )
  
  return (
    <div ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <CartButton elevation={isOpen ? 1 : 0} quantity={getTotalAmount()} />
      </div>
      {md ? (
        isOpen && (
          <>
            <Popover anchor={{h: 'right', v: 'top'}}>
              {CartContent}
            </Popover>
          </>
        )
      ) : (
        isOpen && (
          <Modal title={t('shopping_cart')} onClose={() => setIsOpen(false)}>
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

const Total = styled.span`
  font-family: ${(props: ThemeProps<Theme>) => props.theme.titleFontFamily};
  font-weight: bold;
  font-size: 16px;
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