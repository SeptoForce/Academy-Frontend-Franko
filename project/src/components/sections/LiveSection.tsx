import { Box, Flex, HStack, Image, Link, Spacer, Text, VStack } from '@kuma-ui/core'
import Calendar from '../navigation/Calendar'
import IconPointerRight from '../svg/IconPointerRight'
import { Event, EventStatus, Tournament } from '@/utils/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getExampleTourament } from '@/api/exampleObjects'
import {
  fetchEventsFromSportAndDate,
  fetchTournamentDetails,
  getTeamImageLink,
  getTournamentImageLink,
} from '@/api/api'
import { useAppContext } from '@/context/AppContext'

export function LiveSection() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(router.query.d as string)
  const [events, setEvents] = useState<Event[]>()

  useEffect(() => {
    let date = new Date().toISOString().split('T')[0]
    if (router.query.d) {
      date = router.query.d as string
    }
    setSelectedDate(date)
    fetchEventsFromSportAndDate(router.query.slug as string, date)
      .then(data => setEvents(data))
      .catch(error => console.error(error))
  }, [router.query])

  const slug = router.query.slug as string
  const dateToday = new Date().toISOString().split('T')[0]

  const groupedEventsByTournament = events?.reduce((acc: { [key: number]: Event[] }, event: Event) => {
    if (!acc[event.tournament.id]) {
      acc[event.tournament.id] = []
    }
    acc[event.tournament.id].push(event)
    return acc
  }, {} as { [key: number]: Event[] })

  return (
    <VStack w={[`100%`, `448px`]} alignItems={'center'} flexBasis={'auto'}>
      <ListSectionSecondary mobile />
      <VStack
        w={[`100%`, `448px`]}
        maxW={`100%`}
        borderRadius={[`16px`, `8px 8px 16px 16px`]}
        bg={`colors.surface1`}
        boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
        overflow={`hidden`}
      >
        <Calendar />
        <ListSectionSecondary numberOfEvents={events?.length} />
        {groupedEventsByTournament &&
          Object.keys(groupedEventsByTournament || {}).map(tournamentId => (
            <LeagueEvents
              key={tournamentId}
              tournamentId={parseInt(tournamentId)}
              events={groupedEventsByTournament[parseInt(tournamentId)]}
            />
          ))}
        {events?.length === 0 && (
          <Flex
            h={`48px`}
            justifyContent={'center'}
            alignItems={'center'}
            borderTop={`1px solid var(--on-surface-on-surface-lv-4)`}
            mt={`5px`}
          >
            No events for this day.
          </Flex>
        )}
        <Spacer />
      </VStack>
    </VStack>
  )
}

function ListSectionSecondary(props: { mobile?: boolean; numberOfEvents?: number }) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState<string>(router.query.d as string)
  const [locale, setLocale] = useState<string>('hr-HR')

  useEffect(() => {
    if (router.query.d) {
      setCurrentDate(router.query.d as string)
    } else {
      setCurrentDate(new Date().toISOString().split('T')[0])
    }
  }, [router.query])

  useEffect(() => {
    setLocale(navigator.language || 'hr-HR')
  }, [])

  const today = new Date().toISOString().split('T')[0]
  let date = currentDate || today
  date = date === today ? 'Today' : new Date(date as string).toLocaleDateString(locale)

  return (
    <Box
      w={`100%`}
      h={`48px`}
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      p={`8px 16px`}
      className="Assistive"
      display={[props.mobile ? `flex` : `none`, props.mobile ? `none` : `flex`]}
    >
      <Text color={'colors.onSurfaceLv1'}>{date}</Text>
      <Text color={`colors.onSurfaceLv2`}>{props.numberOfEvents} Events</Text>
    </Box>
  )
}

function LeagueCell(props: { tournament: Tournament }) {
  return (
    <Link href={`/tournament/${props.tournament.id}`}>
      <Flex h={`56px`} w={`100%`} px={`16px`} alignItems={'center'} gap={`32px`}>
        <Image
          src={getTournamentImageLink(props.tournament.id)}
          alt="League image"
          h={`32px`}
          aspectRatio={1}
          flexShrink={0}
        />
        <HStack h={`100%`} alignItems={'center'}>
          <Text className="Headline-3" color={`colors.onSurfaceLv1`}>
            {/* {getTournamentDetails(props.tournamentId).data?.country.name} */}
            {props.tournament.country.name}
          </Text>
          <IconPointerRight color={`var(--on-surface-on-surface-lv-2)`} />
          <Text color={`colors.onSurfaceLv2`}>
            {/* {getTournamentDetails(props.tournamentId).data?.name} */}
            {props.tournament.name}
          </Text>
        </HStack>
      </Flex>
    </Link>
  )
}

function EventCell(props: { event: Event }) {
  const appContext = useAppContext()
  const router = useRouter()

  const winnerCode = props.event.winnerCode

  const openEvent = (id: number) => () => {
    console.log('Open event', id, appContext.isMobile)
    if (appContext.isMobile) {
      router.push(`/event/${id}`)
    } else {
      router.push({ query: { ...router.query, e: id } }, undefined, { shallow: true })
    }
  }

  const currentDateTime = new Date()
  const startDateTime = new Date(props.event.startDate)
  const minutesPassed = Math.floor((currentDateTime.getTime() - startDateTime.getTime()) / 60000)

  return (
    <HStack
      h={`56px`}
      w={`100%`}
      alignItems={'center'}
      py={`8px`}
      _hover={{ bg: 'colors.primaryHighlight', cursor: 'pointer' }}
      bg={props.event.id === Number(router.query.e) ? `colors.primaryHighlight` : `transparent`}
      onClick={openEvent(props.event.id)}
    >
      <VStack
        w={`64px`}
        h={`100%`}
        className="Micro"
        justifyContent={'center'}
        alignItems={'center'}
        gap={`4px`}
        flexShrink={0}
        borderEnd={`1px solid var(--on-surface-on-surface-lv-4)`}
        color={`colors.onSurfaceLv2`}
      >
        <Text>{`${new Date(props.event.startDate).toISOString().split('T')[1].slice(0, 5)}`}</Text>
        <Text color={props.event.status === EventStatus.LIVE ? `var(--specific-live)` : ``}>
          {props.event.status === EventStatus.FINISHED ? `FT` : ``}
          {props.event.status === EventStatus.LIVE ? `${minutesPassed}'` : ``}
          {props.event.status === EventStatus.UPCOMING ? `-` : ``}
        </Text>
      </VStack>
      <VStack h={`100%`} w={`100%`} px={`16px`} justifyContent={'center'} gap={`4px`}>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image
            src={getTeamImageLink(props.event.homeTeam.id)}
            alt="League image"
            w={`16px`}
            aspectRatio={1}
            flexShrink={0}
            loading="lazy"
          />
          <Text
            className="Body-1"
            color={
              props.event.status === EventStatus.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.event.status === EventStatus.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winnerCode === 'home' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.homeTeam.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.event.status === EventStatus.LIVE
                ? `var(--specific-live)`
                : `${winnerCode === 'home' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.status === EventStatus.UPCOMING ? `` : `${props.event.homeScore.total}`}
          </Text>
        </HStack>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image
            src={getTeamImageLink(props.event.awayTeam.id)}
            alt="League image"
            w={`16px`}
            aspectRatio={1}
            flexShrink={0}
            loading="lazy"
          />
          <Text
            className="Body-1"
            color={
              props.event.status === EventStatus.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.event.status === EventStatus.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winnerCode === 'away' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.awayTeam.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.event.status === EventStatus.LIVE
                ? `var(--specific-live)`
                : `${winnerCode === 'away' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.status === EventStatus.UPCOMING ? `` : `${props.event.awayScore.total}`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

function LeagueEvents(props: { tournamentId: number; events: Object[] }) {
  const [tournament, setTournament] = useState<Tournament>(getExampleTourament())

  useEffect(() => {
    fetchTournamentDetails(props.tournamentId)
      .then(data => setTournament(data))
      .catch(error => console.error(error))
  }, [props.tournamentId])

  return (
    <>
      <LeagueCell tournament={tournament} />
      {props.events.map(event => {
        const parsedEvent = event as Event

        const startingTime = new Date(parsedEvent.startDate).toISOString().split('T')[1].slice(0, 5)
        const eventState = parsedEvent.status === 'finished' ? EventStatus.FINISHED : EventStatus.UPCOMING

        return <EventCell key={parsedEvent.id} event={parsedEvent} />
      })}
      <Spacer h={`16px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
    </>
  )
}

export default LiveSection
