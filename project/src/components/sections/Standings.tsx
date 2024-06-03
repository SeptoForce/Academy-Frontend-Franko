import { fetchTournamentStandings } from '@/api/api'
import { getExampleStandings } from '@/api/exampleObjects'
import { TournamentStandings, TournamentStandingsRow } from '@/utils/types'
import { Box, VStack, HStack, Grid, Flex, Link } from '@kuma-ui/core'
import { useEffect, useState } from 'react'

export function Standings(props: { objectId: number; objectType: 'tournament' | 'team' }) {
  const [standings, setStandings] = useState<TournamentStandings>()
  const [standingsTotal, setStandingsTotal] = useState<TournamentStandingsRow[]>()

  useEffect(() => {
    fetchTournamentStandings(props.objectId)
      .then(data => setStandings(data))
      .catch(error => console.error(error))
  }, [props.objectId, props.objectType])

  useEffect(() => {
    let _standings = standings?.filter(standing => standing.type === 'total')[0].sortedStandingsRows

    if (_standings) {
      setStandingsTotal(_standings)
      console.log(_standings)
    }
  }, [standings])

  return (
    <VStack
      h={`fit-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={`16px`}
      p={`8px`}
      pb={`16px`}
    >
      {props.objectType === 'team' ? <Box h={`48px`} bg={'colors.surface2'} borderRadius={`8px`} m={`2px`} /> : <></>}
      <Grid
        w={`100%`}
        gridTemplateColumns={`min-content 5fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr`}
        borderBottom={`1px solid ${'colors.border'}`}
        className="Tabular"
        color={`colors.onSurfaceLv1`}
        gridAutoRows={`48px`}
        columnGap={`8px`}
      >
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          #
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} px={`4px`} alignItems={'center'} justifyContent={'flex-start'}>
          Team
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          P
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          W
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          D
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          L
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          Goals
        </Flex>
        <Flex color={`colors.onSurfaceLv2`} alignItems={'center'} justifyContent={'center'}>
          PTS
        </Flex>
        {standingsTotal?.map((standingsRow, index) => (
          <>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <NumberCell value={index + 1} />
            </Flex>
            <Flex alignItems={'center'} px={`4px`} justifyContent={'flex-start'}>
              <Link
                color={`colors.onSurfaceLv1`}
                w={`100%`}
                href={`/team/${standingsRow.team.id}`}
                _hover={{ bg: `colors.secondaryHighlight` }}
                p={`8px`}
                borderRadius={`8px`}
              >
                {standingsRow.team.name}
              </Link>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {standingsRow.played}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {standingsRow.wins}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {standingsRow.draws}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {standingsRow.losses}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {`${standingsRow.scoresFor}:${standingsRow.scoresAgainst}`}
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
              {standingsRow.points}
            </Flex>
          </>
        ))}
      </Grid>
    </VStack>
  )
}

function NumberCell(props: { value: number }) {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={999}
      h={`24px`}
      aspectRatio={1}
      bg={`colors.secondaryDefault`}
    >
      {props.value}
    </Flex>
  )
}

export default Standings
