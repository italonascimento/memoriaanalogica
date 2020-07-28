import React, { useState, useEffect, ReactElement } from "react"

interface CSSTransitionProps {
  name: string
  children: React.ReactNode | React.ReactNode[]
  show?: boolean
}

const CSSTransition = ({children, name, show = false}: CSSTransitionProps) => {
  const [phase, setPhase] = useState(show ? 'enter' : 'leave-active')

  useEffect(() => {
    if (show) {
      setPhase('enter')
      setTimeout(() => {
        setPhase('enter-active')
      }, 100)
    } else {
      setPhase('leave')
      setTimeout(() => {
        setPhase('leave-active')
      }, 100)
    }
  }, [show])

  return <>
    {React.Children.toArray(children).filter(c => !!c).map((child) => 
      React.cloneElement(child as ReactElement, { 
        className: `${name}-${phase}`,
    }))}
  </>
}

export default CSSTransition