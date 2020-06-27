/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import Header from "../components/header"
import "./layout.css"
import { defaultTheme } from "../themes/default-theme"
import LangContext, { Lang } from "../components/lang-context"

interface IProps {
  children: React.ReactNode
  lang?: Lang
}

const Layout = ({ children, lang }: IProps) => {
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
    <LangContext.Provider value={lang || 'en'}>
      <ThemeProvider theme={defaultTheme}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main>{children}</Main>
        <footer>
          
        </footer>
      </ThemeProvider>
    </LangContext.Provider>
  )
}

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

export default Layout
