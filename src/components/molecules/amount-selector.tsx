import React from 'react'
import Button from '../atoms/button'
import styled from 'styled-components'

interface AmountSelectorProps {
  value: number
  onChange: (n: number) => void
  className?: string
}

const AmountSelector = ({
  value,
  onChange,
  className,
}: AmountSelectorProps) => {

  return (
    <Container className={className}>
      <StyledButton round onClick={() => onChange(value - 1)}>-</StyledButton>
      <Value>
        {value}
      </Value>
      <StyledButton round onClick={() => onChange(value + 1)}>+</StyledButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  font-size: 14px;
  width: 24px;
  height: 24px;
  flex-basis: 24px;
  flex-shrink: 0;
  background: white;
`

const Value = styled.div`
  padding: 0 8px;
  flex-basis: 24px;
  font-size: 12px;
  text-align: center;
  flex-shrink: 0;
`

export default AmountSelector