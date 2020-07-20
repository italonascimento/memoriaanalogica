import React, { ReactNode } from 'react'
import styled, { ThemeProps } from 'styled-components'
import { GrClose } from 'react-icons/gr'

import mediaQueries from '../../styles/media-queries'
import { Theme } from '../../themes/default-theme'
import Button from './button'
import CloseButton from './close-button'
import Backdrop from './backdrop'

interface ModalProps {
  onClose?: () => void
  title?: string
  children: ReactNode | ReactNode[]
}

const Modal = ({
  title = '',
  onClose = () => {},
  children,
}: ModalProps) => (
  <>
    <Backdrop onClick={onClose} />
    <StyledModal>
      <Header>
        <h5>{title}</h5>
        <CloseButton onClick={onClose} />
      </Header>
      <Content>
        {children}
      </Content>
    </StyledModal>
  </>
)

const StyledModal = styled.div`
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

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