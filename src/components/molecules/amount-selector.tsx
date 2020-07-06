import React from 'react'
import Button from '../atoms/button'

interface AmountSelectorProps {
  value: number
  onChange: (n: number) => void
}

const AmountSelector = ({
  value,
  onChange,
}: AmountSelectorProps) => {

  return (
    <div>
      <Button onClick={() => onChange(value - 1)}>-</Button>
      {value}
      <Button onClick={() => onChange(value + 1)}>+</Button>
    </div>
  )
}

export default AmountSelector