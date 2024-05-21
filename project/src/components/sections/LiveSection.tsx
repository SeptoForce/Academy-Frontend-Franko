import { Box, Flex, HStack, Spacer, Text, VStack } from '@kuma-ui/core'
import Calendar from '../navigation/Calendar'
import IconPointerRight from '../svg/IconPointerRight'

export function LiveSection() {
  return (
    <>
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
        <ListSectionSecondary />
        <LeagueEvents />
        <LeagueEvents />
        <LeagueEvents />
      </VStack>
    </>
  )
}

function ListSectionSecondary(props: { mobile?: boolean }) {
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
      <Text color={'colors.onSurfaceLv1'}>Today</Text>
      <Text color={`colors.onSurfaceLv2`}>8 Events</Text>
    </Box>
  )
}

function LeagueCell() {
  return (
    <Flex h={`56px`} w={`100%`} px={`16px`} alignItems={'center'} gap={`32px`}>
      <Flex h={`32px`} aspectRatio={1} bg={`black`} />
      <HStack h={`100%`} alignItems={'center'}>
        <Text className="Headline-3" color={`colors.onSurfaceLv1`}>
          Spain
        </Text>
        <IconPointerRight color={`var(--on-surface-on-surface-lv-2)`} />
        <Text color={`colors.onSurfaceLv2`}>LaLiga</Text>
      </HStack>
    </Flex>
  )
}

function EventCell() {
  return (
    <HStack h={`56px`} w={`100%`} alignItems={'center'}>
      <VStack
        w={`64px`}
        h={`100%`}
        className="Micro"
        justifyContent={'center'}
        alignItems={'center'}
        gap={`4px`}
        flexShrink={0}
      >
        <Text>13:00</Text>
        <Text>FT</Text>
      </VStack>
      <VStack h={`100%`} w={`100%`} px={`16px`} justifyContent={'center'} gap={`4px`}>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Box w={`16px`} bg={`black`} aspectRatio={1} flexShrink={0} />
          <Text className="Body-1" color={`colors.onSurfaceLv2`} flexShrink={0}>
            Manchester United
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text color={`colors.onSurfaceLv2`} flexShrink={0}>
            1
          </Text>
        </HStack>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Box w={`16px`} bg={`black`} aspectRatio={1} flexShrink={0} />
          <Text className="Body-1" color={`colors.onSurfaceLv1`} flexShrink={0}>
            Barcelona
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text color={`colors.onSurfaceLv1`} flexShrink={0}>
            2
          </Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

function LeagueEvents() {
  return (
    <>
      <LeagueCell />
      <EventCell />
      <EventCell />
      <EventCell />
      <Spacer h={`8px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
    </>
  )
}

export default LiveSection
