import React from 'react'

export type Lang = 'en' | 'pt'
const LangContext = React.createContext<Lang>('en')
export default LangContext