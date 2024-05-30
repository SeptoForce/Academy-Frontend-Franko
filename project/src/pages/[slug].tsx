import { getExampleEvent } from '@/api/exampleObjects'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import LeagueSection from '@/components/sections/LeagueSection'
import LiveSection from '@/components/sections/LiveSection'
import { useAppContext } from '@/context/AppContext'
import { Event } from '@/utils/types'
import { HStack, VStack, Box } from '@kuma-ui/core'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function getServerSideProps(context: GetServerSidePropsContext) {
  if (
    !context.params?.slug ||
    ['football', 'basketball', 'american-football'].indexOf(context.params.slug as string) === -1
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
        destination: `/${context.params.slug}?d=${new Date().toISOString().split('T')[0]}`,
        permanent: false,
      },
    }
  }

  const slug = context.params.slug as string
  const date = context.query.d as string
  const event = context.query.e ? parseInt(context.query.e as string) : null

  return {
    props: {
      slug,
      date,
      event,
    },
  }
}

export default function HomePage(props: { slug: string; date: string; event: number }) {
  const appContext = useAppContext()
  const router = useRouter()
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    let event: Event | undefined = undefined
    if (router.query.e) {
      event = getExampleEvent()
    }
    setEvent(event)
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
          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} flexDir={'column'}>
            <LeagueSection />
          </Box>
          <Box display={`flex`} w={`100%`} flexBasis={0} flexGrow={1} alignItems={'center'} flexDir={'column'}>
            <LiveSection />
          </Box>

          {event !== undefined ? (
            <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} flexDir={'column'}>
              <EventDetailsSection event={event} />
            </Box>
          ) : (
            <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
          )}
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
