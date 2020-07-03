import React from "react"
import styled, { ThemeProps } from "styled-components"
import { Theme } from "../../themes/default-theme"
import LangSelector from "../molecules/lang-selector"
import mediaQueries from "../../styles/media-queries"
import { Link } from "gatsby-plugin-intl"
import Button from "../atoms/button"
import { GiShoppingCart } from "react-icons/gi"
import Spacing from "../atoms/spacing"
import CartPopover from "./cart-popover"

interface IProps {
  siteTitle: string
  className?: string
}

const Header = ({ 
  siteTitle = '',
  className,
}: IProps) => (
  <Container className={className}>
    <Title>
      <Link to='/'>
        {siteTitle}
      </Link>
    </Title>
    {typeof window !== 'undefined' && (
      <LangSelector location={window.location} />
    )}

    <Spacing x={8} />

    <CartPopover />
  </Container>
)

const Container = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: ${(props: ThemeProps<Theme>) => props.theme.softShadowLow};
  padding: 16px;
  
  ${mediaQueries.md} {
    padding: 16px 32px;
  }
`

const Title = styled.h1`
  flex: 1;
  font-size: 18px;
  margin: 0;
  text-transform: lowercase;
`

export default Header
