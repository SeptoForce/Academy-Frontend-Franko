import { fetchTournamentDetails, fetchTournamentsFromSport, getTournamentImageLink } from '@/api/api'
import { Tournament } from '@/utils/types'
import { Box, Flex, HStack, Image, Link, Spacer, Text } from '@kuma-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function TournamentsSection(props: { tournaments?: Tournament[] }) {
  const { t } = useTranslation()
  const router = useRouter()
  const slug = router.query.slug as string
  const [tournaments, setTournaments] = useState<Tournament[] | undefined>(props.tournaments)

  useEffect(() => {
    if (slug) {
      fetchTournamentsFromSport(slug)
        .then(data => setTournaments(data))
        .catch(error => console.error(error))
    }
  }, [router.query])

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
        <Text className="Headline-1">{router.query.slug === `football` ? t('leagues') : t('tournaments')}</Text>
      </Flex>
      {tournaments?.map(tournament => (
        <TournamentCell key={tournament.id} id={tournament.id} />
      ))}
      <Spacer h={`24px`} />
      <Link href="/tournament" mx={`8px`} className="Action">
        {t('viewMore')}
      </Link>
    </Box>
  )
}

function TournamentCell(props: { id: number }) {
  const [tournamentDetails, setTournamentDetails] = useState<Tournament>()

  useEffect(() => {
    if (props.id !== undefined) {
      fetchTournamentDetails(props.id)
        .then(data => setTournamentDetails(data))
        .catch(error => console.error(error))
    }
  }, [props.id])

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
        <Text className="Headline-3">{tournamentDetails?.name}</Text>
      </HStack>
    </Link>
  )
}

export default TournamentsSection
