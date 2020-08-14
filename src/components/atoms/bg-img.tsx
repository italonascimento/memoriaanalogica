import React from 'react'
import styled from "styled-components"

interface Props {
  src?: string
}

const BgImg = ({
  src,
}: Props) => (
  <Div src={src} />
)

const Div = styled.div<Props>`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 100%;
`

export default BgImg