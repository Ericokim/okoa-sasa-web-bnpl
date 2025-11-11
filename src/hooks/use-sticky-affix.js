import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_MIN_WIDTH = 1024
const DEFAULT_TOP_OFFSET = 32
const DEFAULT_BOTTOM_OFFSET = 48

export function useStickyAffix({
  minWidth = DEFAULT_MIN_WIDTH,
  topOffset = DEFAULT_TOP_OFFSET,
  bottomOffset = DEFAULT_BOTTOM_OFFSET,
  deps = [],
} = {}) {
  const layoutRef = useRef(null)
  const columnRef = useRef(null)
  const cardRef = useRef(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [cardStyles, setCardStyles] = useState({})
  const [placeholderHeight, setPlaceholderHeight] = useState(0)
  const [columnMinHeight, setColumnMinHeight] = useState(0)
  const [affixMode, setAffixMode] = useState('relative')

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`)
    const handleChange = () => setIsDesktop(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [minWidth])

  const resetStickyState = useCallback(() => {
    setCardStyles({})
    setPlaceholderHeight(0)
    setColumnMinHeight(0)
    setAffixMode('relative')
  }, [])

  const updateStickyPosition = useCallback(() => {
    if (!isDesktop || typeof window === 'undefined') {
      resetStickyState()
      return
    }

    const layoutNode = layoutRef.current
    const columnNode = columnRef.current
    const cardNode = cardRef.current

    if (!layoutNode || !columnNode || !cardNode) return

    const layoutHeight = layoutNode.offsetHeight
    if (layoutHeight && columnMinHeight !== layoutHeight) {
      setColumnMinHeight(layoutHeight)
    }

    const cardHeight = cardNode.offsetHeight || 0

    const layoutRect = layoutNode.getBoundingClientRect()
    const columnRect = columnNode.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const scrollLeft = window.scrollX || window.pageXOffset || 0
    const layoutTop = scrollTop + layoutRect.top
    const layoutBottom = layoutTop + layoutHeight
    const columnTop = scrollTop + columnRect.top

    const stickyStart = columnTop - topOffset
    const maxScrollTop = layoutBottom - cardHeight - bottomOffset

    if (scrollTop <= stickyStart) {
      setAffixMode('relative')
      setPlaceholderHeight(0)
      setCardStyles({
        position: 'relative',
        top: 0,
        left: 'auto',
        width: '100%',
      })
      return
    }

    if (scrollTop >= maxScrollTop) {
      const absoluteTop = Math.max(
        layoutHeight - cardHeight - bottomOffset,
        0,
      )
      setAffixMode('absolute')
      setPlaceholderHeight(0)
      setCardStyles({
        position: 'absolute',
        top: absoluteTop,
        left: 0,
        width: '100%',
      })
      return
    }

    setAffixMode('fixed')
    setPlaceholderHeight(cardHeight)
    setCardStyles({
      position: 'fixed',
      top: topOffset,
      left: columnRect.left + scrollLeft,
      width: columnRect.width,
      zIndex: 50,
    })
  }, [
    columnMinHeight,
    isDesktop,
    resetStickyState,
    bottomOffset,
    topOffset,
  ])

  useEffect(() => {
    if (!isDesktop) {
      resetStickyState()
      return
    }

    const handleScroll = () => updateStickyPosition()
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isDesktop, resetStickyState, updateStickyPosition])

  useEffect(() => {
    if (!isDesktop) return
    updateStickyPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, updateStickyPosition, ...deps])

  return {
    layoutRef,
    columnRef,
    cardRef,
    cardStyles: isDesktop ? cardStyles : undefined,
    placeholderHeight:
      isDesktop && affixMode === 'fixed' ? placeholderHeight : 0,
    columnMinHeight: isDesktop ? columnMinHeight : 0,
    isDesktop,
    affixMode,
  }
}
