/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import initReactFastclick from 'react-fastclick'
import GlobalContextProvider from './src/state/global-state'
import { defaultTheme } from './src/themes/default-theme'
import { ThemeProvider } from 'styled-components'

initReactFastclick()

export const shouldUpdateScroll = () => { return false; }

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>
}