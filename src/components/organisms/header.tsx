import React from "react"
import styled, { ThemeProps } from "styled-components"
import { Link } from "gatsby-plugin-intl"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { Theme } from "../../themes/default-theme"
import mediaQueries from "../../styles/media-queries"
import Spacing from "../atoms/spacing"
import LangSelector from "./lang-selector"
import CartPopover from "./cart-popover"

interface IProps {
  siteTitle: string
  className?: string
}

const Header = ({
  siteTitle = '',
  className,
}: IProps) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 180) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Container className={className}>
      <Title>
        <Link to='/'>
          <Img fluid={data.logo.childImageSharp.fluid} alt={siteTitle} imgStyle={{objectFit: 'contain'}} />
        </Link>
      </Title>
      {typeof window !== 'undefined' && (
        <LangSelector />
      )}

      <Spacing x={8} />

      <CartPopover />
    </Container>
  )
}

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
  margin-right: auto;
  text-transform: lowercase;
  width: 180px;
  max-width: 180px;
`

export default Header
