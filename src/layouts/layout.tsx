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
      <Header siteTitle={data.site.siteMetadata.title} />
      <Main>{children}</Main>
      <footer>
        
      </footer>
    </ThemeProvider>
  )
}

const Main = styled.main`
  padding: 8px;
`

export default Layout
