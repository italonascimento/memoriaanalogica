import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProps } from "styled-components"
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
}

export const Select = ({
  initialValue,
  align = 'left',
  children,
  onSelect,
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(initialValue)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutsideHandler(ref, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    onSelect(selected!!)
  }, [selected, onSelect])

  return (
    <Container ref={ref} onClick={() => setIsOpen(!isOpen)}>
      <StyledButton elevation={isOpen ? 1 : 0}>
        {React.Children.toArray(children).find((child: React.ReactElement) => child.props.value === selected)}
        <Spacing x={8} />
        <AiFillCaretDown />
      </StyledButton>

      {isOpen && (
        <OptionsContainer align={align}>
          {React.Children.map(children, (child: React.ReactElement) => (
            <OptionWrapper 
              selected={child.props.value === selected}
              onClick={() => setSelected(child.props.value)}  
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

const Container = styled.div`
  position: relative;
`

const StyledButton = styled(Button)`
  padding-right: 8px;
`

interface IOptionsContainerProps extends ThemeProps<Theme> {
  align: 'left' | 'right'
}

const OptionsContainer = styled.ul<IOptionsContainerProps>`
  list-style: none;
  margin: 4px 0 0 0 ;
  padding: 0;
  position: absolute;
  top: 100%;
  ${(props: IOptionsContainerProps) => `${props.align}: 0;`}
  background: ${(props: IOptionsContainerProps) => props.theme.colors.mainBackground};
  ${elevation(1)}
  border-radius: 4px;
  overflow: hidden;
`

interface IOptionWrapperProps extends ThemeProps<Theme> {
  selected?: boolean
}

const OptionWrapper = styled.li<IOptionWrapperProps>`
  display: flex;
  cursor: pointer;
  padding: 8px 16px 8px 24px;
  ${(props: IOptionWrapperProps) => props.selected && `padding-left: 8px;`}

  &:hover {
    background: ${(props: IOptionWrapperProps) => props.theme.colors.dimPrimary};
  }
`