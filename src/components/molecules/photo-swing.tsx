import React, { useState, useEffect } from 'react'
import { FluidObject } from 'gatsby-image'
import Img from 'gatsby-image/withIEPolyfill'
import styled, { ThemeProps, css } from 'styled-components'
import { Theme } from '../../themes/default-theme'
import { Photo } from '../../types/product'

interface PhotoSwingProps {
  photos: Photo[]
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
    let id: number
    if (isActive) {
      if (count < photos.length) {
        id = setTimeout(() => {
          changePhoto()
        }, count === 0 ? 500 : 2500)
    
        setTimeoutId(id)
        setCount(count + 1)
      }
    } else {
      setCurrentPhoto(0)
      clearTimeout(timeoutId)
      setCount(0)
    }

    return () => clearTimeout(id)
  }, [currentPhoto, isActive])

  return (
    <Container className={className}>
      {photos.map((photo, i) => (
        <PhotoContainer key={i} selected={currentPhoto === i}>
          <Img fluid={photo.fluid} />
        </PhotoContainer>
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

const PhotoContainer = styled.div<PhotoProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  ${(props: PhotoProps) => props.selected
    ? css`
      transition: opacity 400ms ease-in-out, visibility 0ms;
      visibility: visible;
      opacity: 1;
    `
    : css`
      transition: opacity 400ms ease-in-out, visibility 0ms 400ms;
      visibility: hidden;
      opacity: 0;
    `
  }
`

export default PhotoSwing