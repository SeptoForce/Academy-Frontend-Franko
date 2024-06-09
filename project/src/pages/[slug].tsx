import { fetchEventDetails } from '@/api/api'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import TournamentsSection from '@/components/sections/TournamentsSection'
import LiveSection from '@/components/sections/LiveSection'
import { useAppContext } from '@/context/AppContext'
import { Event, Tournament } from '@/utils/types'
import { HStack, VStack, Box } from '@kuma-ui/core'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (
    !context.params?.slug ||
    ['football', 'basketball', 'american-football', 'settings'].indexOf(context.params.slug as string) === -1
  ) {
    return {
      redirect: {
        destination: '/football',
        permanent: false,
      },
    }
  }

  if (!context.query.d || !new Date(context.query.d as string).getTime()) {
    return {
      redirect: {
        destination: `/${context.params.slug}?d=${format(new Date(), 'yyyy-MM-dd')}`,
        permanent: false,
      },
    }
  }

  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${context.query.slug}/tournaments`)
  const tournaments = await response.json()

  return {
    props: {
      tournaments,
    },
  }
}

export default function HomePage(props: { tournaments: Tournament[] }) {
  const appContext = useAppContext()
  const router = useRouter()
  const [event, setEvent] = useState<Event>()

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
      <Header />
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
            <LiveSection />
          </Box>

          {event !== undefined ? (
            <Box display={[`none`, `none`, `none`, `flex`]} flex={`1 3 0`} flexDir={'column'}>
              <EventDetailsSection event={event} />
            </Box>
          ) : (
            <Box display={[`none`, `none`, `none`, `flex`]} flex={`1 1 0`} />
          )}
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
