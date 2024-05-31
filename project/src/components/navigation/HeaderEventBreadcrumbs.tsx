import { HStack, Link, Text } from '@kuma-ui/core'
import IconPointerRight from '../svg/IconPointerRight'
import { Event, Tournament } from '@/utils/types'
import { useEffect, useState } from 'react'
import { fetchEventDetails, fetchTournamentDetails } from '@/api/api'

export function HeaderEventBreadcrumbs(props: { event?: Event; tournament?: Tournament }) {
  const [event, setEvent] = useState<Event | undefined>(props.event)
  const [tournament, setTournament] = useState<Tournament | undefined>(props.tournament)

  useEffect(() => {
    if (props.event) {
      fetchEventDetails(props.event.id)
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    }

    if (props.tournament) {
      fetchTournamentDetails(props.tournament.id)
        .then(data => setTournament(data))
        .catch(error => console.error(error))
    }
  }, [props.event, props.tournament])

  return (
    <HStack w={`100%`} h={`48px`} justifyContent={`flex-start`} alignItems={`center`} px={`12px`} display={`flex`}>
      <HStack
        className="Micro"
        userSelect={`none`}
        cursor={'default'}
        alignItems={'center'}
        color={'colors.onSurfaceLv2'}
        visibility={event || tournament ? 'visible' : 'hidden'}
      >
        <Link href={`/${event?.tournament.sport.name || tournament?.sport.name}`}>
          {event?.tournament.sport.name || tournament?.sport.name}
        </Link>
        {event && (
          <>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={`/tournament/${event?.tournament.id}`}>{event?.tournament.name}</Link>
          </>
        )}
        <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
        <Text userSelect={'none'}>
          {event ? `${event?.homeTeam.name} vs ${event?.awayTeam.name}` : ``}
          {tournament ? tournament.name : ``}
        </Text>
      </HStack>
    </HStack>
  )
}

export default HeaderEventBreadcrumbs
