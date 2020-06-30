import React, { useState, useEffect } from 'react'
import Img, { FluidObject } from 'gatsby-image'
import styled, { ThemeProps, css } from 'styled-components'
import { Theme } from '../../themes/default-theme'

interface PhotoSwingProps {
  photos: FluidObject[]
  isActive: boolean
  className?: string
}

const PhotoSwing = ({
  photos,
  isActive,
  className,
}: PhotoSwingProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [timeoutId, setTimeoutId] = useState(0)
  const [count, setCount] = useState(0)

  const changePhoto = () => {
    setCurrentPhoto(
      currentPhoto >= photos.length -1
        ? 0
        : currentPhoto + 1
    )
    
  }
  
  useEffect(() => {
    if (isActive) {
      if (count < photos.length) {
        const id = setTimeout(() => {
          changePhoto()
        }, count === 0 ? 1000 : 2500)
    
        setTimeoutId(id)
        setCount(count + 1)
      }
    } else {
      setTimeout(() => {
        setCurrentPhoto(0)
      }, 1000)
      clearTimeout(timeoutId)
      setCount(0)
    }

    return () => { clearTimeout(timeoutId) }
  }, [currentPhoto, isActive])

  return (
    <Container className={className}>
      {photos.map((photo, i) => (
        <Photo selected={currentPhoto === i}>
          <Img fluid={photo} />
        </Photo>
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

interface PhotoProps extends ThemeProps<Theme>{
  selected: boolean
}

const Photo = styled.div<PhotoProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  ${(props: PhotoProps) => props.selected
    ? css`
      transition: opacity 200ms ease-in-out, visibility 0ms;
      visibility: visible;
      opacity: 1;
    `
    : css`
      transition: opacity 200ms ease-in-out, visibility 0ms 100ms;
      visibility: hidden;
      opacity: 0;
    `
  }
`

export default PhotoSwing