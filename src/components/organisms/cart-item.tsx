import React from 'react'
import Img from 'gatsby-image'
import { Link, navigate } from 'gatsby-plugin-intl'

import { Product } from '../../types/product'
import useProductDetails from '../hooks/useProduct'
import styled, { ThemeProps } from 'styled-components'
import { FormattedNumber } from 'gatsby-plugin-intl'
import useTranslation from '../hooks/useTanslation'
import Spacing from '../atoms/spacing'
import AmountSelector from '../molecules/amount-selector'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'
import { Theme } from '../../themes/default-theme'

interface CartItemProps {
  product: Product
  amount: number
}

const CartItem = ({
  product,
  amount,
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
    <Container onClick={() => {
      dispatch(actions.setIsCartOpen(false))
      navigate(url)}
    }>
      <Photo>
        <Img fluid={photos[0]} />
      </Photo>
      <Content>
        <h5>
          <Link to={url}>
            {details.name}
          </Link>
        </h5>
        <Spacing y={8} />
        <p>
          <FormattedNumber value={price} style='currency' currency={t('currency')} />
        </p>
      </Content>
      <StyledAmountSelector value={amount} onChange={amountChangeHandler} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 16px;
  cursor: pointer;
  background: white;

  &:hover {
    background: ${(props: ThemeProps<Theme>) => props.theme.colors.greyLighter};
  }
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

export default CartItem