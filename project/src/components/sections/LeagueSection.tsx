import { getLeagueImageLink, getTournamentDetails, getTournamentsFromSport } from '@/api/api'
import { Tournament } from '@/utils/types'
import { Box, Flex, HStack, Image, Link, Spacer, Text } from '@kuma-ui/core'
import { useRouter } from 'next/router'

export function LeagueSection() {
  const router = useRouter()
  const slug = router.query.slug as string
  const tournaments: Tournament[] = getTournamentsFromSport(slug).data

  return (
    <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexDir={'column'}>
      <Box w={`100%`} bg={`colors.surface1`} borderRadius={`16px`} p={`16px`}>
        <Flex w={`100%`} h={`48px`} alignItems={'center'}>
          <Text className="Headline-1">Leagues</Text>
        </Flex>
        {tournaments?.map(tournament => (
          <LeagueCell key={tournament.id} id={tournament.id} />
        ))}
        <Spacer h={`24px`} />
        <Link href="#" className="Action">
          View more
        </Link>
      </Box>
    </Box>
  )
}

function LeagueCell(props: { id: number }) {
  const leagueDetails = getTournamentDetails(props.id).data

  return (
    <HStack w={`100%`} h={`56px`} alignItems={'center'} gap={`16px`}>
      <Image src={getLeagueImageLink(props.id)} alt="League image" h={`40px`} />
      <Text className="Headline-3">{leagueDetails?.name}</Text>
    </HStack>
  )
}

export default LeagueSection
