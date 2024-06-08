import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { HStack, VStack, Box } from '@kuma-ui/core'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import { Event, Tournament } from '@/utils/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchEventDetails } from '@/api/api'

export async function getServerSideProps(context: any) {
  const result = await fetch(`https://academy-backend.sofascore.dev/event/${context.params.id}`)
  const eventDetails = await result.json()
  console.log(eventDetails)

  const result2 = await fetch(
    `https://academy-backend.sofascore.dev/sport/${eventDetails.tournament.sport.slug}/tournaments`
  )
  const tournaments = await result2.json()
  console.log(tournaments)

  return {
    props: {
      eventDetails: eventDetails,
      tournaments: tournaments,
    },
  }
}

export default function EventPage(props: { eventDetails: Event; tournaments: Tournament[] }) {
  const router = useRouter()
  const [event, setEvent] = useState<Event>(props.eventDetails)

  useEffect(() => {
    if (router.query.e && event?.id !== Number(router.query.e)) {
      fetchEventDetails(Number(router.query.e))
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    }

    if (!router.query.e && router.query.id) {
      fetchEventDetails(Number(router.query.id))
        .then(data => setEvent(data))
        .catch(error => console.error(error))
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
        px={[`8px`, `24px`]}
        flexGrow={1}
      >
        <HStack
          w={`100%`}
          h={`48px`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          px={`12px`}
          display={[`none`, `flex`]}
        >
          <HeaderEventBreadcrumbs event={event as Event} />
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} flexDir={'column'}>
            <TournamentsSection tournaments={props.tournaments} />
          </Box>

          <Box display={`flex`} w={`200px`} flexDir={'column'} flexShrink={0} flexGrow={1}>
            <EventDetailsSection noHeader event={event} />
          </Box>

          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
