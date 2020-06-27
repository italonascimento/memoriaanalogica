import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'

const languageNames: {[keyb in string]: string} = {
  en: 'English',
  pt: 'Português',
}

interface IProps {
  location?: Location
}

interface IConsumer {
  languages: string[]
  language: string
}

const LangSelector = ({ location }: IProps) =>
  <div>
    <IntlContextConsumer>
      {({ languages, language }: IConsumer) =>
        languages.map(language => (
          <a
            key={language}
            onClick={() => changeLocale(language)}
          >
            {languageNames[language]}
          </a>
        ))
      }
    </IntlContextConsumer>
  </div>

export default LangSelector