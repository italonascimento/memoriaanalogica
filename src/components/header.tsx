import React from "react"
import styled, { ThemeProps } from "styled-components"
import { Theme } from "../themes/default-theme"
import LangSelector from "./molecules/lang-selector"

interface IProps {
  siteTitle: string
}

const Header = ({ 
  siteTitle = ''
}: IProps) => (
  <Container>
    <Title>
      {siteTitle}
    </Title>
    {typeof window !== 'undefined' && (
      <LangSelector location={window.location} />
    )}
  </Container>
)

const Container = styled.div`
  background: ${(props: ThemeProps<Theme>) => props.theme.mainBackground};
  padding: 24px 16px;
  box-shadow: ${(props: ThemeProps<Theme>) => props.theme.softShadow};
`

const Title = styled.h1`
  margin: 0 0 0 16px;
  font-size: 18px;
  text-transform: lowercase;
`

export default Header
