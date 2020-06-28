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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props: ThemeProps<Theme>) => props.theme.colors.mainBackground};
  padding: 16px 32px;
  box-shadow: ${(props: ThemeProps<Theme>) => props.theme.softShadow};
`

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  text-transform: lowercase;
`

export default Header
