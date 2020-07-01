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
      <Thumbs verticalThumbs={verticalThumbs}>
        {photos.map((thumb, i) => (
          <Thumb 
            verticalThumbs={verticalThumbs} 
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

interface VerticalThumbsProps {
  verticalThumbs?: boolean
}

const Container = styled.div<VerticalThumbsProps>`
  display: flex;
  
  ${(props: VerticalThumbsProps) => props.verticalThumbs
  ? `
    flex-direction: row;
  `
  : `
    flex-direction: column;
  `}
`

const Selected = styled.div`
  margin: 0 8px 8px 0;
  flex: 1;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};
`

const Thumbs = styled.ul<VerticalThumbsProps>`
  display: flex;

  ${(props: VerticalThumbsProps) => props.verticalThumbs && css`
    flex-direction: column;
  `}
`

interface ThumbProps extends ThemeProps<Theme>, VerticalThumbsProps {
  selected: boolean
}

const Thumb = styled.li<ThumbProps>`
  cursor: pointer;
  width: 120px;
  height: 120px;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};

  ${(props: ThumbProps) => props.selected && css`
    border: 4px solid ${props.theme.colors.dimPrimary};
  `}

  ${(props: ThumbProps) => props.verticalThumbs
  ? css`
    margin-bottom: 8px;
  `
  : css`
    margin-right: 8px;
  `}
`

export default PhotoGallery