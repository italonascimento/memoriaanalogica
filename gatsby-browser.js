/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import initReactFastclick from 'react-fastclick'
import GlobalContextProvider from './src/state/global-state'

initReactFastclick()

export const shouldUpdateScroll = () => { return false; }

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}