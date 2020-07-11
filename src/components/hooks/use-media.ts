import useMediaQuery from 'react-use-media-query-hook'

const useMedia = (value: string) => {
  if (typeof window !== 'undefined') {
    return useMediaQuery(value)
  }
  return false
}

export default useMedia