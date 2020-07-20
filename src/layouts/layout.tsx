/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import Header from "../components/organisms/header"
import { defaultTheme } from "../themes/default-theme"
import GlobalStyle from "../styles/global-style"
import ResetStyle from "../styles/reset-style"
import mediaQueries from "../styles/media-queries"
import { Helmet } from "react-helmet"

interface IProps {
  children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={defaultTheme}>
      <ResetStyle />
      <GlobalStyle />
      <StyledHeader siteTitle={data.site.siteMetadata.title} />
      <Main>{children}</Main>
      <footer>
        
      </footer>
    </ThemeProvider>
  )
}

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`

const Main = styled.div`
  padding-top: 96px;
  padding-bottom: 64px;
  height: 100%;
  
  ${mediaQueries.md} {
    padding-top: 128px;
    padding-bottom: 96px;
  }
`

export default Layout
