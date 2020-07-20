import React from 'react'
import styled from 'styled-components'

interface ListProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const List = ({
  children,
  className,
}: ListProps) => (
  <ul className={className}>
    {children}
  </ul>
)

export const ListItem = styled.li`
  padding: 8px 16px;
`

export default List