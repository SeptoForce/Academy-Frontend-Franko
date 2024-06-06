import { Box, Button, HStack, VStack } from '@kuma-ui/core'
import IconChevronLeft from '../svg/IconChevronLeft'
import IconChevronRight from '../svg/IconChevronRight'
import { EventCell } from './LiveSection'
import { Text } from '@kuma-ui/core'
import { fetchEventsFromPlayer, fetchEventsFromTeam, fetchEventsFromTournament } from '@/api/api'
import { Event } from '@/utils/types'
import { useEffect, useState } from 'react'

export function Matches(props: { objectId: number; objectType: 'tournament' | 'team' | 'player' }) {
  const [events, setEvents] = useState<Event[]>([])
  const [page, setPage] = useState(0)
  const [span, setSpan] = useState<'next' | 'last'>('last')

  useEffect(() => {
    switch (props.objectType) {
      case 'tournament':
        fetchEventsFromTournament(props.objectId, span, page)
          .then(data => setEvents(data))
          .catch(error => console.error(error))
        break
      case 'team':
        fetchEventsFromTeam(props.objectId, span, page)
          .then(data => setEvents(data))
          .catch(error => console.error(error))
        break
      case 'player':
        fetchEventsFromPlayer(props.objectId, span, page)
          .then(data => setEvents(data))
          .catch(error => console.error(error))
        break
    }
  }, [events, page, props.objectId, props.objectType])

  function handleNextPage() {
    if (span === 'next') {
      setPage(page + 1)
    } else {
      if (page === 0) {
        setSpan('next')
      } else {
        setPage(page - 1)
      }
    }
  }

  function handlePreviousPage() {
    if (span === 'last') {
      setPage(page + 1)
    } else {
      if (page === 0) {
        setSpan('last')
      } else {
        setPage(page - 1)
      }
    }
  }

  const eventsPerRound = events.reduce<{
    [round: number]: Event[]
  }>((acc, event) => {
    const round = event.round
    if (acc[round]) {
      acc[round].push(event)
    } else {
      acc[round] = [event]
    }
    return acc
  }, {})

  const numberOfRounds = Object.keys(eventsPerRound).length

  return (
    <VStack
      h={`fit-content`}
      w={`100%`}
      bg={[``, 'colors.surface1']}
      boxShadow={[``, `0 1px 4px 0 rgba(0, 0, 0, 0.08)`]}
      borderRadius={`16px`}
      pb={[`0px`, `16px`]}
      pt={[`0px`, `12px`]}
    >
      <HStack w={`100%`} h={`48px`} px={`16px`} justifyContent={`space-between`} alignItems={'center'}>
        <Button
          w={`56px`}
          h={`40px`}
          border={`solid 2px var(--color-primary-default)`}
          borderRadius={`2px`}
          onClick={handlePreviousPage}
        >
          <IconChevronLeft color={`var(--color-primary-default)`} />
        </Button>
        <span className="Headline-2" color={`var(--on-surface-on-surface-lv-1)`}>
          Matches
        </span>
        <Button
          w={`56px`}
          h={`40px`}
          border={`solid 2px var(--color-primary-default)`}
          borderRadius={`2px`}
          onClick={handleNextPage}
        >
          <IconChevronRight color={`var(--color-primary-default)`} />
        </Button>
      </HStack>
      {Object.keys(eventsPerRound).map((round, index) => (
        <RoundSection number={parseInt(round)} events={eventsPerRound[parseInt(round)]} key={index} />
      ))}
      <Box
        display={[`flex`, `none`]}
        w={`100%`}
        h={`48px`}
        px={`16px`}
        justifyContent={`space-between`}
        alignItems={'center'}
      >
        <Button
          w={`56px`}
          h={`40px`}
          border={`solid 2px var(--color-primary-default)`}
          borderRadius={`2px`}
          onClick={handlePreviousPage}
        >
          <IconChevronLeft color={`var(--color-primary-default)`} />
        </Button>
        <Button
          w={`56px`}
          h={`40px`}
          border={`solid 2px var(--color-primary-default)`}
          borderRadius={`2px`}
          onClick={handleNextPage}
        >
          <IconChevronRight color={`var(--color-primary-default)`} />
        </Button>
      </Box>
    </VStack>
  )
}

function RoundSection(props: { number: number; events: Event[] }) {
  const number = props.number
  const events = props.events

  return (
    <VStack w={`100%`} h={`fit-content`} py={`8px`} borderRadius={`16px`}>
      <Text className="Assistive" mx={`16px`} my={`8px`} color={`var(--on-surface-on-surface-lv-1)`}>
        Round {number}
      </Text>
      <VStack
        w={`100%`}
        bg={`colors.surface1`}
        borderRadius={`16px`}
        boxShadow={[`0 1px 4px 0 rgba(0, 0, 0, 0.08)`, `unset`]}
      >
        {events.map((event, index) => (
          <EventCell event={event} key={index} />
        ))}
      </VStack>
    </VStack>
  )
}

export default Matches
