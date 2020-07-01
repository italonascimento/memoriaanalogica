import React from 'react'
import styled from "styled-components"

import useProductDetails from "../hooks/useProduct"


interface BuyBoxProps {
  sku: string
  className?: string
}

const BuyBox = ({
  sku,
  className,
}: BuyBoxProps) => {
  const details = useProductDetails(sku)

  return (
    <Container className={className}>
      <h2>{details.name}</h2>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 16px;
`

export default BuyBox