/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { RiLoader3Line } from 'react-icons/ri'

import Header from "../components/organisms/header"
import { defaultTheme } from "../themes/default-theme"
import GlobalStyle from "../styles/global-style"
import ResetStyle from "../styles/reset-style"
import mediaQueries from "../styles/media-queries"
import useGlobalState from "../state/useGlobalState"
import Backdrop from "../components/atoms/backdrop"
import elevation from "../styles/elevation"
import { rotate } from "../styles/animations"

interface IProps {
  children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  const [isLoading] = useGlobalState(s => s.isLoading)

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
      <Main blur={isLoading}>{children}</Main>
      <footer>
        
      </footer>

      {isLoading && (
        <>
          <Backdrop />
          <Spinner>
            <StyledRiLoader3Line size={32} />
          </Spinner>
        </>
      )}
    </ThemeProvider>
  )
}

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`

const Main = styled.div<{blur?: boolean}>`
  padding-top: 96px;
  padding-bottom: 64px;
  height: 100%;
  transition: filter 100ms ease-in-out;
  ${props => props.blur && 'filter: blur(2px);'}
  
  ${mediaQueries.md} {
    padding-top: 128px;
    padding-bottom: 96px;
  }
`

const Spinner = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  ${elevation(2)}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 200;
`

const StyledRiLoader3Line = styled(RiLoader3Line)`
  animation: ${rotate} 1s ease-in-out infinite;
`

export default Layout
