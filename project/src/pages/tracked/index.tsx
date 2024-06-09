import { fetchEventDetails } from '@/api/api'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { useAppContext } from '@/context/AppContext'
import { Event, EventStatus, Tournament } from '@/utils/types'
import { HStack, VStack, Box } from '@kuma-ui/core'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isWindowDefined } from 'swr/_internal'
import { EventCell, LeagueEvents } from '@/components/sections/LiveSection'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/football/tournaments`)
  const tournaments = await response.json()

  return {
    props: {
      tournaments,
    },
  }
}

export default function TrackedPage(props: { tournaments: Tournament[] }) {
  const [event, setEvent] = useState<Event>()
  const appContext = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (router.query.e) {
      fetchEventDetails(Number(router.query.e))
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    } else {
      setEvent(undefined)
    }
  }, [router.query])

  return (
    <>
      <Header noCalendar />
      <VStack
        as="main"
        h={`100%`}
        maxW={`1392px`}
        w={`100%`}
        justifyContent={`flex-start`}
        alignItems={`center`}
        pt={[`12px`, `0px`]}
        px={[`12px`, `24px`]}
        flexGrow={1}
      >
        {appContext.isMobile ? (
          <Box w={`100%`} h={`48px`} display={['none', 'flex']} />
        ) : (
          <HeaderEventBreadcrumbs event={event as Event} />
        )}

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} flex={`1 2 0`} flexDir={'column'}>
            <TournamentsSection tournaments={props.tournaments} />
          </Box>

          <Box display={`flex`} alignItems={'center'} flex={`1 1 0`} flexDir={'column'}>
            <TrackedEvents />
          </Box>

          {event !== undefined ? (
            <Box display={[`none`, `none`, `none`, `flex`]} flex={`1 3 0`} flexDir={'column'}>
              <EventDetailsSection event={event} />
            </Box>
          ) : (
            <Box display={[`none`, `none`, `none`, `flex`]} flex={`1 2 0`} flexDir={'column'} />
          )}
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}

type SortedTrackedEvents = {
  category: 'previous' | 'current' | 'upcoming'
  tournament: Tournament
  events: Event[]
}[]

function TrackedEvents() {
  const [trackedEvents, setTrackedEvents] = useState<Event[]>([])
  const [sortedTrackedEvents, setSortedTrackedEvents] = useState<SortedTrackedEvents>([])

  useEffect(() => {
    // localStorage.setItem('trackedEvents', JSON.stringify(getExampleTrackedEvents()))
    // localStorage.setItem('trackedEvents', JSON.stringify([]))

    if (isWindowDefined) {
      const trackedEvents = localStorage.getItem('trackedEvents')
      if (trackedEvents) {
        const _trackedEvents = JSON.parse(trackedEvents) as Event[]
        setTrackedEvents(
          _trackedEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        )
      }
    }
  }, [])

  useEffect(() => {
    const now = new Date()
    let sortedTrackedEvents: SortedTrackedEvents = []

    trackedEvents.forEach(event => {
      const startDate = new Date(event.startDate)

      if (event.status === EventStatus.FINISHED) {
        if (sortedTrackedEvents.find(e => e.tournament.id === event.tournament.id && e.category === 'previous')) {
          sortedTrackedEvents
            .find(e => e.tournament.id === event.tournament.id && e.category === 'previous')
            ?.events.push(event)
        } else {
          sortedTrackedEvents.push({
            category: 'previous',
            tournament: event.tournament,
            events: [event],
          })
        }
      } else if (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime() < startDate.getTime()) {
        if (sortedTrackedEvents.find(e => e.tournament.id === event.tournament.id && e.category === 'upcoming')) {
          sortedTrackedEvents
            .find(e => e.tournament.id === event.tournament.id && e.category === 'upcoming')
            ?.events.push(event)
        } else {
          sortedTrackedEvents.push({
            category: 'upcoming',
            tournament: event.tournament,
            events: [event],
          })
        }
      } else {
        if (sortedTrackedEvents.find(e => e.tournament.id === event.tournament.id && e.category === 'current')) {
          sortedTrackedEvents
            .find(e => e.tournament.id === event.tournament.id && e.category === 'current')
            ?.events.push(event)
        } else {
          sortedTrackedEvents.push({
            category: 'current',
            tournament: event.tournament,
            events: [event],
          })
        }
      }
    })

    setSortedTrackedEvents(sortedTrackedEvents)
  }, [trackedEvents])

  if (trackedEvents.length === 0 || sortedTrackedEvents.length === 0) {
    return (
      <VStack
        bg={'colors.surface1'}
        w={`100%`}
        h={'fit-content'}
        py={`16px`}
        borderRadius={`16px`}
        boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      >
        <HStack h={`48px`} alignItems={'center'} justifyContent={'center'} mx={`16px`} mb={`4px`}>
          No tracked events
        </HStack>
      </VStack>
    )
  }

  return (
    <VStack
      bg={'colors.surface1'}
      w={`100%`}
      h={'fit-content'}
      py={`16px`}
      borderRadius={`16px`}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
    >
      <HStack
        height={`48px`}
        alignItems={'center'}
        justifyContent={'center'}
        className="Headline-1"
        mx={`16px`}
        mb={`4px`}
      >
        Tracked Events
      </HStack>
      {sortedTrackedEvents.filter(e => e?.category === 'previous').length > 0 && (
        <HStack
          bg={'colors.onSurfaceLv4'}
          alignItems={'flex-end'}
          className="Assistive"
          px={`16px`}
          py={`8px`}
          pb={`4px`}
          mt={`8px`}
        >
          Previous
        </HStack>
      )}

      {sortedTrackedEvents
        .filter(e => e?.category === 'previous')
        .map(e => (
          <LeagueEvents key={e.tournament.id} tournamentId={e.tournament.id} events={e.events} />
        ))}

      {sortedTrackedEvents.filter(e => e?.category === 'current').length > 0 && (
        <HStack
          bg={'colors.onSurfaceLv4'}
          alignItems={'flex-end'}
          className="Assistive"
          px={`16px`}
          py={`8px`}
          pb={`4px`}
          mt={`8px`}
        >
          Current
        </HStack>
      )}
      {sortedTrackedEvents
        .filter(e => e?.category === 'current')
        .map(e => (
          <LeagueEvents key={e.tournament.id} tournamentId={e.tournament.id} events={e.events} />
        ))}

      {sortedTrackedEvents.filter(e => e?.category === 'upcoming').length > 0 && (
        <HStack
          bg={'colors.onSurfaceLv4'}
          alignItems={'flex-end'}
          className="Assistive"
          px={`16px`}
          py={`8px`}
          pb={`4px`}
          mt={`8px`}
        >
          Upcoming
        </HStack>
      )}

      {sortedTrackedEvents
        .filter(e => e?.category === 'upcoming')
        .map(e => (
          <LeagueEvents key={e.tournament.id} tournamentId={e.tournament.id} events={e.events} />
        ))}
    </VStack>
  )
}
