import { EventMatch } from '@/utils/types'
import { useEffect, useState } from 'react'
import { isWindowDefined } from 'swr/_internal'
import IconBookmarkSolid from '../svg/IconBookmarkSolid'
import { Button } from '@kuma-ui/core'
import IconBookmark from '../svg/IconBookmark'

export function BookmarkButton(props: { event: EventMatch }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (isWindowDefined) {
      const trackedEvents: EventMatch[] = JSON.parse(localStorage.getItem('trackedEvents') || '[]')
      if (trackedEvents) {
        setIsBookmarked(trackedEvents.some(event => event.id === props.event.id))
      }
    }
  }, [
    () => {
      if (isWindowDefined) {
        return localStorage.getItem('trackedEvents')
      }
    },
  ])

  function ToggleBookmark() {
    if (isWindowDefined) {
      const trackedEvents = localStorage.getItem('trackedEvents')
      if (trackedEvents) {
        let trackedEvents = JSON.parse(localStorage.getItem('trackedEvents') || '[]') as EventMatch[]
        if (trackedEvents.some(event => event.id === props.event.id)) {
          trackedEvents = trackedEvents.filter(event => event.id !== props.event.id)
          localStorage.setItem('trackedEvents', JSON.stringify(trackedEvents))
          setIsBookmarked(false)
        } else {
          trackedEvents.push(props.event)
          localStorage.setItem('trackedEvents', JSON.stringify(trackedEvents))
          setIsBookmarked(true)
        }
      } else {
        let trackedEvents = [] as EventMatch[]
        trackedEvents.push(props.event)
        localStorage.setItem('trackedEvents', JSON.stringify(trackedEvents))
        setIsBookmarked(true)
      }
    }
  }

  return (
    <Button color={'colors.onSurfaceLv1'} _hover={{ color: 'colors.primaryDefault' }} onClick={ToggleBookmark}>
      {isBookmarked ? <IconBookmarkSolid color="currentColor" /> : <IconBookmark color="currentColor" />}
    </Button>
  )
}

export default BookmarkButton
