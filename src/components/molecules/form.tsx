import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24%);
  flex: 1;
  grid-column-gap: 1.5%;
`

export const FormField = styled.div<{start: number, end: number}>`
  grid-column-start: ${props => props.start};
  grid-column-end: ${props => props.end};
  margin-bottom: 16px;
`