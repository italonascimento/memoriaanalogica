import React, { useState } from 'react'
import Img, { FluidObject } from "gatsby-image"
import styled, { css, ThemeProps } from 'styled-components'

import { Theme } from '../../themes/default-theme'


interface PhotoGalleryProps {
  photos: FluidObject[]
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
        <Img fluid={photos[current]} />
      </Selected>
      <Thumbs>
        {photos.map((thumb, i) => (
          <Thumb 
            key={i} 
            selected={i === current} 
            onClick={() => setCurrent(i)}
          >
            <Img fluid={thumb} />
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
      order: 1;
      margin-left: 8px;
    }

    & ${Thumbs} {
      flex-direction: column;
      order: 0;
    }

    & ${Thumb} {
      margin-bottom: 8px;
    }
  `
  : css`
    flex-direction: column;

    & ${Selected} {
      order: 0;
      margin-bottom: 8px;
    }

    & ${Thumbs} {
      order: 1;
    }

    & ${Thumb} {
      margin-right: 8px;
    }
  `}
`

const Selected = styled.div`
  flex: 1;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};
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
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};

  ${(props: ThumbProps) => props.selected && css`
    border: 4px solid ${props.theme.colors.dimPrimary};
  `}
`

export default PhotoGallery