import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { HStack, VStack, Box } from '@kuma-ui/core'
import { getExampleEvent } from '@/api/exampleObjects'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import { Event } from '@/utils/types'

export default function TeamPage(props: { slug: string; date: string; event: number; data: any }) {
  const event = getExampleEvent()

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
            <TournamentsSection tournaments={[]} />
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
