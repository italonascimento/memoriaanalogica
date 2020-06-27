import React, { useContext } from 'react'
import LangContext from '../lang-context'
import { Link } from 'gatsby'

const langs = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'pt',
    label: 'Português',
  },
]

interface IProps {
  location?: Location
}

const LangSelector = ({ location }: IProps) => {
  const lang = useContext(LangContext)

  return <div>
    {langs.filter(({ code }) => code != lang).map(({ code, label }) =>
      <Link to={`/${code}/${location?.pathname.replace(/\/\w{2}\//, '')}`}>
        {label}
      </Link>
    )}
  </div>
}

export default LangSelector