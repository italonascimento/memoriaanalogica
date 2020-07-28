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
import mediaQueries, { mediaQueryValues } from '../../styles/media-queries'
import Backdrop from '../atoms/backdrop'
import useMedia from '../hooks/use-media'

interface ISelectProps {
  initialValue?: string | number
  align?: 'left' | 'right'
  children: React.ReactNode | React.ReactNode[]
  onSelect: (t: string | number) => void
  full?: boolean
  className?: string
  flat?: boolean
  round?: boolean
  elevation?: ElevationLevel
  placeholder?: string
  search?: boolean
  modal?: boolean
}

export const Select = ({
  initialValue,
  align = 'left',
  children,
  className,
  placeholder,
  search,
  modal,
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
      tabIndex={0}
      className={className}
      ref={ref} 
      align={align}
      onKeyPress={() => setIsOpen(true)}
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
          {modal && <StyledBackdrop zIndex={80} onClick={() => setIsOpen(false)} />}
          <Wrapper align={align} modal={modal}>
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
  align: 'left' | 'right'
}

const Container = styled.div<ContainerProps>`
  position: relative;
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
  modal?: boolean
  align: 'left' | 'right'
}

const Wrapper = styled.div<WrapperProps>`
  transition: transform 100ms ease-in-out, opacity 100ms ease-in-out;

  background: white;
  ${elevation(1)}
  border-radius: 4px;
  overflow: hidden;
  z-index: 100;

  ${props => props.modal
    ? css`
      position: fixed;
      top: 50%;
      left: 50%;
    
      &.wrapper-enter, &.wrapper-leave, &.wrapper-leave-active {
        transform: translateX(-50%) translateY(-50%) scale(0.9);
        opacity: 0;
      }
    
      &.wrapper-enter-active {
        transform: translateX(-50%) translateY(-50%) scale(1);
        opacity: 1;
      }
    `
    : css`
      position: absolute;
      margin-top: 4px;
      left: auto;
      right: auto;
      transform: none;
      ${(props: WrapperProps) => props.align}: 0;
      top: 100%;

      &.wrapper-enter, &.wrapper-leave, &.wrapper-leave-active {
        transform: translateY(-32px) scale(0.9);
        opacity: 0;
      }

      &.wrapper-enter-active {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    `
  }
`

const StyledBackdrop = styled(Backdrop)`
  transition: opacity 100ms ease-in-out;

  &.wrapper-enter, &.wrapper-leave, &.wrapper-leave-active {
    opacity: 0;
  }

  &.wrapper-enter-active {
    opacity: 0.5;
  }
`

const OptionsContainer = styled.ul`
  padding: 0;
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
    display: block;
    width: 100%;
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