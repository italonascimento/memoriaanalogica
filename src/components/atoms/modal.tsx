import React, { ReactNode, useState, useEffect } from 'react'
import styled, { ThemeProps } from 'styled-components'

import mediaQueries from '../../styles/media-queries'
import { Theme } from '../../themes/default-theme'
import CloseButton from './close-button'
import Backdrop from './backdrop'
import CSSTransition from './css-transition'

interface ModalProps {
  onClose?: () => void
  title?: string
  children: ReactNode | ReactNode[]
  show?: boolean
}

const Modal = ({
  title = '',
  onClose = () => {},
  children,
  show = false,
}: ModalProps) => {
  return (
    <>
      <CSSTransition
        name="modal"
        show={show}
      >
        <Backdrop key='backdrop' onClick={onClose} />
        <StyledModal key='modal'>
          <Header>
            <h5>{title}</h5>
            <CloseButton onClick={onClose} />
          </Header>
          <Content>
            {children}
          </Content>
        </StyledModal>
      </CSSTransition>  
    </>
  )
}

const StyledModal = styled.div`
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 210;

  &.modal-enter, &.modal-leave, &.modal-leave-active {
    transition: transform 100ms ease-in-out, opacity 100ms ease-in-out;
    transform: translateY(64px) scale(1.1);
    opacity: 0;
  }

  &.modal-enter-active {
    transition: transform 100ms ease-in-out, opacity 100ms ease-in-out;
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  &.modal-leave {
    transform: translateY(96px) scale(1.1);
    opacity: 0;
  }

  ${mediaQueries.md} {
    top: 50%;
    left: 50%;
    transform: translateX(50%), translateX(-50%);
    height: 80%;
    width: 80%;
    max-height: 400px;
    max-width: 600px;
  }
`

const Header = styled.div`
  flex-grow: 0;
  font-size: 24px;
  padding: 16px;
  padding-right: 8px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props: ThemeProps<Theme>) => props.theme.softShadowLow};
`

const Content = styled.div`
  flex: 1;
  padding: 8px;
`

export default Modal