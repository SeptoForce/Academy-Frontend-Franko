import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import LeagueSection from '@/components/sections/LeagueSection'
import IconPointerRight from '@/components/svg/IconPointerRight'
import { HStack, VStack, Text, Link, Box } from '@kuma-ui/core'
import { getExampleEvent } from '@/api/exampleObjects'

export default function EventPage(props: { slug: string; date: string; event: number; data: any }) {
  const event = getExampleEvent()

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
        <HStack
          w={`100%`}
          h={`48px`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          px={`12px`}
          display={[`none`, `flex`]}
        >
          <HStack
            className="Micro"
            userSelect={`none`}
            cursor={'default'}
            alignItems={'center'}
            color={'colors.onSurfaceLv2'}
            visibility={event ? 'visible' : 'hidden'}
          >
            <Link href={'#'}>{event?.tournament.country.name}</Link>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={'#'}>{event?.tournament.name}</Link>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Text userSelect={'none'}>{`${event?.homeTeam.name} vs ${event?.awayTeam.name}`}</Text>
          </HStack>
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} flexDir={'column'}>
            <LeagueSection />
          </Box>

          <Box display={`flex`} w={`100%`} flexBasis={0} flexDir={'column'} flexShrink={0} flexGrow={1}>
            <EventDetailsSection noHeader event={event} />
          </Box>

          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
