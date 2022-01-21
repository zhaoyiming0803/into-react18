import { useState, useEffect } from 'react'
import { inRange, debounce } from 'lodash'

enum ScreenSize {
  Mobile = 'mobile',
  Desktop = 'desktop',
}

const SCREEN_SIZE_RANG: {
  size: ScreenSize
  range: [number, number]
}[] = [
  {
    size: ScreenSize.Mobile,
    range: [0, 719]
  },
  {
    size: ScreenSize.Desktop,
    range: [720, Infinity]
  }
]


const getScreenSize = () => {
  const viewportWidth = document.body.clientWidth
  return SCREEN_SIZE_RANG.find((item) => inRange(viewportWidth, ...item.range))?.size ?? ScreenSize.Desktop
}

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize)

  useEffect(() => {
    const onResize = debounce(() => {
      setScreenSize(getScreenSize())
    }, 200)
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return [screenSize]
}
