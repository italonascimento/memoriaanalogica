import React from "react"
import styled, { ThemeProps } from "styled-components"
import { Theme } from "../../themes/default-theme"
import LangSelector from "../molecules/lang-selector"
import mediaQueries from "../../styles/media-queries"
import { Link } from "gatsby-plugin-intl"

interface IProps {
  siteTitle: string
}

const Header = ({ 
  siteTitle = ''
}: IProps) => (
  <Container>
    <Title>
      <Link to='/'>
        {siteTitle}
      </Link>
    </Title>
    {typeof window !== 'undefined' && (
      <LangSelector location={window.location} />
    )}
  </Container>
)

const Container = styled.div`
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
  font-size: 18px;
  margin: 0;
  text-transform: lowercase;
`

export default Header
