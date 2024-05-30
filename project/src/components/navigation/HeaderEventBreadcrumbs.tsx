import { HStack, Link, Text } from '@kuma-ui/core'
import IconPointerRight from '../svg/IconPointerRight'
import { Event } from '@/utils/types'
import { useEffect, useState } from 'react'
import { getExampleEvent } from '@/api/exampleObjects'

export function HeaderEventBreadcrumbs(props: { event: Event }) {
  const [event, setEvent] = useState<Event | undefined>(props.event)

  useEffect(() => {
    let event: Event | undefined = undefined
    if (props.event) {
      event = getExampleEvent()
    }
    setEvent(event)
  }, [props.event])

  return (
    <HStack w={`100%`} h={`48px`} justifyContent={`flex-start`} alignItems={`center`} px={`12px`} display={`flex`}>
      <HStack
        className="Micro"
        userSelect={`none`}
        cursor={'default'}
        alignItems={'center'}
        color={'colors.onSurfaceLv2'}
        visibility={event ? 'visible' : 'hidden'}
      >
        <Link href={`/${event?.tournament.sport.name}`}>{event?.tournament.sport.name}</Link>
        <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />

        <Link href={`/tournament/${event?.tournament.id}`}>{event?.tournament.name}</Link>
        <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
        <Text userSelect={'none'}>{`${event?.homeTeam.name} vs ${event?.awayTeam.name}`}</Text>
      </HStack>
    </HStack>
  )
}

export default HeaderEventBreadcrumbs
