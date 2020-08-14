import React, { useState } from 'react'
import Img from "gatsby-image"
import styled, { css, ThemeProps } from 'styled-components'

import { Theme } from '../../themes/default-theme'
import { mouseInteractionTransition } from '../../styles/transitions'
import { Photo } from '../../types/product'
import BgImg from '../atoms/bg-img'


interface PhotoGalleryProps {
  photos: Photo[]
  className?: string
  verticalThumbs?: boolean
}

const PhotoGallery = ({
  photos,
  className,
  verticalThumbs,
}: PhotoGalleryProps) => {
  const [current, setCurrent] = useState(0)

  return (
    <Container className={className} verticalThumbs={verticalThumbs}>
      <Selected>
        <Img fluid={photos[current].fluid} />
      </Selected>
      <Thumbs>
        {photos.map((thumb, i) => (
          <Thumb 
            key={i} 
            selected={i === current} 
            onClick={() => setCurrent(i)}
          >
            <BgImg src={thumb.fluid?.src} />
          </Thumb>
        ))}
      </Thumbs>
    </Container>
  )
}

interface ContainerProps {
  verticalThumbs?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  
  ${(props: ContainerProps) => props.verticalThumbs
  ? css`
    flex-direction: row;

    & ${Selected} {
      margin-right: 16px;
    }

    & ${Thumbs} {
      flex-direction: column;
    }

    & ${Thumb} {
      margin-bottom: 8px;
    }
  `
  : css`
    flex-direction: column;

    & ${Selected} {
      margin-bottom: 8px;
    }

    & ${Thumb} {
      margin-right: 8px;
    }
  `}
`

const Selected = styled.div`
  flex: 1;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.greyLight2};
`

const Thumbs = styled.ul`
  display: flex;
`

interface ThumbProps extends ThemeProps<Theme> {
  selected: boolean
}

const Thumb = styled.li<ThumbProps>`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.greyLight2};
  display: flex;
  align-items: center;
  overflow: hidden;

  & > * {
    flex: 1;
  }

  ${(props: ThumbProps) => props.selected && css`
    /* padding: 2px; */
    border: 4px solid ${props.theme.colors.primaryLight2};
  `}

  ${(props: ThumbProps) => !props.selected && css`
    &:hover {
      border-color: ${props.theme.colors.primaryLight2};
    }
  `}

  ${mouseInteractionTransition('border')}
`

export default PhotoGallery