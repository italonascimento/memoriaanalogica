import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import styled from 'styled-components'
import { GiUsaFlag, GiBrazilFlag } from 'react-icons/gi'

import useTranslation from '../hooks/useTanslation'
import { Select, Option } from './select'

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

interface IProps {
  location?: Location
}

interface IConsumer {
  languages: string[]
  language: string
}

const LangSelector = ({ location }: IProps) => {
  const t = useTranslation()

  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language }: IConsumer) =>
          <Select
            onSelect={(lang) => changeLocale(`${lang}`)}
            initialValue={language}
          >
              {languages.map(language => (
                <Option key={language} value={language}>
                  <LanguageButton>
                    {languageDetails[language].flag}
                    {languageDetails[language].name}
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

  svg {
    margin-right: 8px;
  }
`

export default LangSelector