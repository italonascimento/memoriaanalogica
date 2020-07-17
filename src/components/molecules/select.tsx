import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProps, css } from "styled-components"
import { AiFillCaretDown } from 'react-icons/ai'
import { IoIosCheckmark } from 'react-icons/io'

import { Theme } from '../../themes/default-theme'
import useClickOutsideHandler from '../hooks/useClickOutsideHandler'
import Button from '../atoms/button'
import Spacing from '../atoms/spacing'
import elevation from '../../styles/elevation'

interface ISelectProps {
  initialValue?: string | number
  align?: 'left' | 'right'
  children: React.ReactNode | React.ReactNode[]
  onSelect: (t: string | number) => void
  float?: boolean
}

export const Select = ({
  initialValue,
  align = 'left',
  float = false,
  children,
  onSelect,
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(initialValue)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutsideHandler(ref, () => {
    setIsOpen(false)
  })

  const onSelectHandler = (value: string | number) => {
    setSelected(value)
    onSelect(value)
  }

  return (
    <Container
      ref={ref} 
      onClick={() => setIsOpen(!isOpen)} 
      align={align} 
      float={float}
    >
      <StyledButton elevation={isOpen ? 1 : 0}>
        {React.Children.toArray(children).find((child: React.ReactElement) => child.props.value === selected)}
        <Spacing x={8} />
        <AiFillCaretDown />
      </StyledButton>

      {isOpen && (
        <OptionsContainer align={align} float={float}>
          {React.Children.map(children, (child: React.ReactElement) => (
            <OptionWrapper 
              key={child.props.value}
              selected={child.props.value === selected}
              onClick={() => onSelectHandler(child.props.value)}  
            >
              {child.props.value === selected && <IoIosCheckmark />}
              <Spacing x={8} />
              {child}
            </OptionWrapper>
          ))}
        </OptionsContainer>
      )}
    </Container>
  )
}

interface IOptionProps {
  children: React.ReactNode | React.ReactNode[]
  value: string | number
}

export const Option = (props: IOptionProps) => (
  <>
    {props.children}
  </>
)

interface ContainerProps {
  float?: boolean
  align: 'left' | 'right'
}

const Container = styled.div<ContainerProps>`
  ${(props: ContainerProps) => props.float
  ? css`
    position: relative;
  `
  : css`
    display: flex;
    flex-direction: column;
    justify-content: flex-${props.align === 'right' ? 'end' : 'start'};
  `}
`

const StyledButton = styled(Button)`
  padding-right: 8px;
`

interface IOptionsContainerProps extends ThemeProps<Theme> {
  float?: boolean
  align: 'left' | 'right'
}

const OptionsContainer = styled.ul<IOptionsContainerProps>`
  list-style: none;
  margin: 4px 0 0 0 ;
  padding: 0;
  background: white;
  ${elevation(1)}
  border-radius: 4px;
  overflow: hidden;

  ${(props: IOptionsContainerProps) => props.float && css`
      z-index: 100;
      position: absolute;
      ${props.align}: 0;
      top: 100%;
  `}

`

interface IOptionWrapperProps extends ThemeProps<Theme> {
  selected?: boolean
}

const OptionWrapper = styled.li<IOptionWrapperProps>`
  display: flex;
  cursor: pointer;
  padding: 8px 16px 8px 24px;
  ${(props: IOptionWrapperProps) => props.selected && `padding-left: 8px;`}
  color: ${(props: IOptionWrapperProps) => props.theme.colors.greyDarkest};

  &:hover {
    background: ${(props: IOptionWrapperProps) => props.theme.colors.primaryLighter};
    color: ${(props: IOptionWrapperProps) => props.theme.colors.primaryDarkest};
  }
`