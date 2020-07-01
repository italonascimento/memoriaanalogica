import React, { useState, useCallback } from 'react'
import Img, { FluidObject } from "gatsby-image"
import styled, { css, ThemeProps } from 'styled-components'
import Spacing from '../atoms/spacing'
import { Theme } from '../../themes/default-theme'

interface PhotoGalleryProps {
  photos: FluidObject[]
  className?: string
}

const PhotoGallery = ({
  photos,
  className,
}: PhotoGalleryProps) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className={className}>
      <Selected>
        <Img fluid={photos[current]} />
      </Selected>
      <Thumbs>
        {photos.map((thumb, i) => (
          <>
            <Thumb key={i} selected={i === current} onClick={() => setCurrent(i)}>
              <Img fluid={thumb} />
            </Thumb>
          </>
        ))}
      </Thumbs>
    </div>
  )
}

const Selected = styled.div`
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};
`

const Thumbs = styled.ul`
  margin-top: 8px;
  display: flex;
`

interface ThumbProps extends ThemeProps<Theme> {
  selected: boolean
}

const Thumb = styled.li<ThumbProps>`
  margin-right: 8px;
  width: 120px;
  height: 120px;
  border: 1px solid ${(props: ThumbProps) => props.theme.colors.dimNeutral};

  ${(props: ThumbProps) => props.selected && css`
    border: 4px solid ${props.theme.colors.dimPrimary};
  `}
`

export default PhotoGallery