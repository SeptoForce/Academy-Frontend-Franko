import { getTournamentImageLink } from '@/api/api'
import { Tournament } from '@/utils/types'
import { Box, Flex, HStack, Image, Link, Spacer, Text } from '@kuma-ui/core'
import { useRouter } from 'next/router'
import { getExampleTourament } from '@/api/exampleObjects'

export function LeagueSection() {
  const router = useRouter()
  const slug = router.query.slug as string

  // const tournaments: Tournament[] = getTournamentsFromSport(slug).data
  const tournaments: Tournament[] = [getExampleTourament(), getExampleTourament(), getExampleTourament()]

  return (
    <Box
      w={`100%`}
      bg={`colors.surface1`}
      borderRadius={`16px`}
      p={`8px`}
      py={`16px`}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
    >
      <Flex w={`100%`} h={`48px`} mx={`8px`} alignItems={'center'}>
        <Text className="Headline-1">Leagues</Text>
      </Flex>
      {tournaments?.map(tournament => (
        //! Chenge later to use the real id
        <LeagueCell key={Math.ceil(Math.random() * 1000000)} id={tournament.id} />
      ))}
      <Spacer h={`24px`} />
      <Link href="#" mx={`8px`} className="Action">
        View more
      </Link>
    </Box>
  )
}

function LeagueCell(props: { id: number }) {
  // const leagueDetails = getTournamentDetails(props.id).data
  const leagueDetails = getExampleTourament()

  return (
    <Link color={`colors.onSurfaceLv1`} href={`/tournament/${props.id}`}>
      <HStack
        w={`100%`}
        h={`56px`}
        alignItems={'center'}
        gap={`16px`}
        _hover={{ bg: 'colors.primaryHighlight', cursor: 'pointer' }}
        borderRadius={`8px`}
        px={`8px`}
      >
        <Image src={getTournamentImageLink(props.id)} alt="League image" h={`40px`} />
        <Text className="Headline-3">{leagueDetails?.name}</Text>
      </HStack>
    </Link>
  )
}

export default LeagueSection
