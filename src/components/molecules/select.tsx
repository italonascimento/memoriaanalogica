import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProps } from "styled-components"
import { AiFillCaretDown } from 'react-icons/ai'

import { Theme } from '../../themes/default-theme'
import useClickOutsideHandler from '../hooks/useClickOutsideHandler'
import Button from '../atoms/button'
import Spacing from '../atoms/spacing'

interface IProps {
  initialValue?: string | number
  children: React.ReactNode | React.ReactNode[]
  onSelect: (t: string | number) => void
}

export const Select = ({
  initialValue,
  children,
  onSelect,
}: IProps) => {
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
      <StyledButton>
        {React.Children.toArray(children).find((child: React.ReactElement) => child.props.value === selected)}
        <Spacing x={8} />
        <AiFillCaretDown />
      </StyledButton>

      {isOpen && (
        <OptionsContainer>
          {React.Children.map(children, (child: React.ReactElement) => (
            <OptionWrapper 
              selected={child.props.value === selected}
              onClick={() => setSelected(child.props.value)}  
            >
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

const OptionsContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  position: absolute;
  top: 100%;
  left: 0;
`

interface IOptionWrapperProps extends ThemeProps<Theme> {
  selected?: boolean
}

const OptionWrapper = styled.li<IOptionWrapperProps>`
  cursor: pointer;
  background: ${(props: IOptionWrapperProps) => 
    props.selected
      ? props.theme.colors.selectionBackground
      : 'inherit'
    };
`