import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import styled from 'styled-components'
import { GiUsaFlag, GiBrazilFlag } from 'react-icons/gi'
import useMediaQuery from 'react-use-media-query-hook'

import { Select, Option } from './select'
import mediaQueries, { mediaQueryValues } from '../../styles/media-queries'

interface LanguageDetails {
  name: string
  flag: React.ReactNode
}

const languageDetails: {[keyb in string]: LanguageDetails} = {
  en: {
    name: 'English',
    flag: <GiUsaFlag size={16} />,
  },
  pt: {
    name: 'Português',
    flag: <GiBrazilFlag size={16} />,
  },
}

interface IConsumer {
  languages: string[]
  language: string
}

const LangSelector = () => {
  const md = useMediaQuery(mediaQueryValues.md)

  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language }: IConsumer) =>
          <Select
            float
            onSelect={(lang) => changeLocale(`${lang}`)}
            initialValue={language}
          >
              {languages.map(language => (
                <Option key={language} value={language}>
                  <LanguageButton>
                    {languageDetails[language].flag}
                    {md && languageDetails[language].name}
                  </LanguageButton>
                </Option>
              ))}
          </Select>
        }
      </IntlContextConsumer>
    </div>
  )
}

const LanguageButton = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 12px;

  ${mediaQueries.md} {
    svg {
      margin-right: 8px;
    }
  }
`

export default LangSelector