import React from 'react'
import Img from 'gatsby-image'
import { Link, navigate } from 'gatsby-plugin-intl'

import { Product } from '../../types/product'
import useProductDetails from '../hooks/useProduct'
import styled, { ThemeProps, css } from 'styled-components'
import useTranslation from '../hooks/useTanslation'
import Spacing from '../atoms/spacing'
import AmountSelector from '../molecules/amount-selector'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'
import { Theme } from '../../themes/default-theme'
import BgImg from '../atoms/bg-img'
import Price from '../atoms/price'

interface CartItemProps {
  product: Product
  amount: number
  lockEdition?: boolean
  disableClick?: boolean
}

const CartItem = ({
  product,
  amount,
  lockEdition,
  disableClick,
}: CartItemProps) => {
  const [_, dispatch] = useGlobalState(s => s)
  const t = useTranslation()
  const { sku, photos, price } = product
  const details = useProductDetails(sku)

  const amountChangeHandler = (newAmount: number) => {
    dispatch(actions.setAmount(product.sku, newAmount))
  }

  const url = `/p/${sku}/${details.slug}/`

  return (
    <Container disableClick={disableClick} onClick={() => {
      if (!disableClick) {
        dispatch(actions.setIsCartOpen(false))
        navigate(url)}
      }
    }>
      <Photo>
        <BgImg src={photos[0].fluid?.src} />
      </Photo>
      <Content>
        <h5>
          {disableClick
            ? (
              <span>{details.name}</span>
            ): (
              <Link to={url}>
                {details.name}
              </Link>
            )
          }
        </h5>
        <Spacing y={8} />
        <p>
          <Price value={price} />
        </p>
      </Content>
      {lockEdition
        ? (
          <Amount>{amount}x</Amount>
        ): (
          <StyledAmountSelector value={amount} onChange={amountChangeHandler} />
        )
      }
    </Container>
  )
}

const Container = styled.div<{disableClick?: boolean}>`
  display: flex;
  padding: 16px;
  background: white;

  ${props => !props.disableClick && css`
    cursor: pointer;
    
    &:hover {
      background: ${(props: ThemeProps<Theme>) => props.theme.colors.greyLighter};
    }
  `};
`

const Photo = styled.div`
  flex: 0 64px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
`

const StyledAmountSelector = styled(AmountSelector)`
  flex-basis: 80px;
`

const Amount = styled.span`
  align-self: center;
`

export default CartItem