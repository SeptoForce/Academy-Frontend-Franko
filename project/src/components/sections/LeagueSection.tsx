import { Box, Flex, HStack, Link, Spacer, Text } from '@kuma-ui/core'

export function LeagueSection() {
  return (
    <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexDir={'column'}>
      <Box w={`100%`} bg={`colors.surface1`} borderRadius={`16px`} p={`16px`}>
        <Flex w={`100%`} h={`48px`} alignItems={'center'}>
          <Text className="Headline-1">Leagues</Text>
        </Flex>
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <LeagueCell />
        <Spacer h={`24px`} />
        <Link href="#" className="Action">
          View more
        </Link>
      </Box>
    </Box>
  )
}

function LeagueCell() {
  return (
    <HStack w={`100%`} h={`56px`} alignItems={'center'} gap={`16px`}>
      <Box bg={`black`} aspectRatio={1} h={`40px`} />
      <Text className="Headline-3">LaLiga</Text>
    </HStack>
  )
}

export default LeagueSection
