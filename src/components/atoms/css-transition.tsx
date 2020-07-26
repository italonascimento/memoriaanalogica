import React, { useState, useEffect } from "react"

interface CSSTransitionProps {
  name: string
  children: React.ReactElement | React.ReactElement[]
  show?: boolean
}

const CSSTransition = ({children, name, show = false}: CSSTransitionProps) => {
  const [phase, setPhase] = useState(show ? 'enter' : 'leave-active')

  useEffect(() => {
    if (show) {
      setPhase('enter')
      setTimeout(() => {
        setPhase('enter-active')
      }, 50)
    } else {
      setPhase('leave')
      setTimeout(() => {
        setPhase('leave-active')
      }, 10)
    }
  }, [show])

  return <>
    {React.Children.map(children, (child) => 
      React.cloneElement(child, { 
        className: `${name}-${phase}`,
    }))}
  </>
}

export default CSSTransition