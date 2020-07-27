import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProps, css } from "styled-components"
import { AiFillCaretDown } from 'react-icons/ai'
import { IoIosCheckmark, IoIosSearch } from 'react-icons/io'

import { Theme } from '../../themes/default-theme'
import useClickOutsideHandler from '../hooks/useClickOutsideHandler'
import Button from '../atoms/button'
import Spacing from '../atoms/spacing'
import elevation, { ElevationLevel } from '../../styles/elevation'
import { GrFormSearch } from 'react-icons/gr'
import CSSTransition from '../atoms/css-transition'
import useDelayUnmount from '../hooks/use-delay-unmount'

interface ISelectProps {
  initialValue?: string | number
  align?: 'left' | 'right'
  children: React.ReactNode | React.ReactNode[]
  onSelect: (t: string | number) => void
  float?: boolean
  full?: boolean
  className?: string
  flat?: boolean
  round?: boolean
  elevation?: ElevationLevel
  placeholder?: string
  search?: boolean
}

export const Select = ({
  initialValue,
  align = 'left',
  float = true,
  children,
  className,
  placeholder,
  search,
  onSelect,
  ...props
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(initialValue)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const shouldShow = useDelayUnmount(isOpen, 100)

  useClickOutsideHandler(ref, () => {
    setIsOpen(false)
  })

  const onSelectHandler = (value: string | number) => {
    setIsOpen(false)
    setSelected(value)
    onSelect(value)
  }

  useEffect(() => {
    setFilter('')
    if (shouldShow) {
      inputRef.current?.focus()
    }
  }, [shouldShow])

  return (
    <Container
      className={className}
      ref={ref} 
      align={align} 
      float={float}
    >
      <StyledButton
        {...props}
        onClick={() => setIsOpen(!isOpen)} 
        elevation={props.flat ? 0 : (isOpen ? 1 : 0)}
      >
        {selected
          ? React.Children.toArray(children).find((child: React.ReactElement) => child.props.value === selected)
          : <Placeholder>{placeholder}</Placeholder>}
        <Spacing x={8} />
        <AiFillCaretDown />
      </StyledButton>

      {shouldShow && (
        <CSSTransition name='wrapper' show={isOpen}>
          <Wrapper align={align} float={float}>
            {search && (
              <Search>
                <StyledIoIosSearch size={24} />
                <input ref={inputRef} onChange={(e) => setFilter(e.target.value)} />
              </Search>
            )}
            <OptionsContainer>
              {React.Children.toArray(children)
                .filter((child: React.ReactElement) =>
                  !filter || new RegExp(filter, 'i').test(child.props.filterValue || child.props.value)
                )
                .map((child: React.ReactElement) => (
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
          </Wrapper>
        </CSSTransition>
      )}
    </Container>
  )
}

interface IOptionProps {
  children: React.ReactNode | React.ReactNode[]
  value: string | number
  filterValue?: string
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

const Placeholder = styled.span`
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDark1};
`

const StyledButton = styled(Button)`
  padding-right: 8px;
  ${props => props.full && 'justify-content: space-between;'}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface WrapperProps extends ThemeProps<Theme> {
  float?: boolean
  align: 'left' | 'right'
}

const Wrapper = styled.div<WrapperProps>`
  transition: transform 100ms ease-in-out, opacity 100ms ease-in-out;
  
  &.wrapper-enter, &.wrapper-leave, &.wrapper-leave-active {
    transform: translateY(-32px) scale(0.9);
    opacity: 0;
  }

  &.wrapper-enter-active {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  margin: 4px 0 0 0 ;
  padding: 0;
  background: white;
  ${elevation(1)}
  border-radius: 4px;
  overflow: hidden;
  
  ${(props: WrapperProps) => props.float && css`
      z-index: 100;
      position: absolute;
      ${props.align}: 0;
      top: 100%;
  `}
`

const OptionsContainer = styled.ul`
  list-style: none;
  max-height: 96px;
  overflow: auto;
`

const Search = styled.div`
  padding: 8px;
  position: relative;

  & > input {
    border-radius: 4px;
    border: solid 1px ${(props: ThemeProps<Theme>) => props.theme.colors.greyLight1};
    padding: 6px;
    padding-left: 32px;
  }
`

const StyledIoIosSearch = styled(IoIosSearch)`
  position: absolute;
  top: 12px;
  left: 12px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDark1}
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