import { fetchTournamentsFromTeam, fetchTournamentStandings } from '@/api/api'
import { Tournament, TournamentStandings, TournamentStandingsRow } from '@/utils/types'
import { VStack, HStack, Flex, Link, Spacer, Select } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function Standings(props: { objectId: number; objectType: 'tournament' | 'team' }) {
  const { t } = useTranslation()
  const [standings, setStandings] = useState<TournamentStandings>()
  const [standingsTotal, setStandingsTotal] = useState<TournamentStandingsRow[]>()
  const [tournaments, setTournaments] = useState<Tournament[]>()
  const [selectedTournament, setSelectedTournament] = useState<number>(0)

  useEffect(() => {
    if (props.objectType === 'tournament') {
      fetchTournamentStandings(props.objectId)
        .then(data => setStandings(data))
        .catch(error => console.error(error))
    }

    if (props.objectType === 'team') {
      fetchTournamentsFromTeam(props.objectId)
        .then(tournaments => {
          setTournaments(tournaments)
        })
        .catch(error => console.error(error))
    }
  }, [props.objectId, props.objectType])

  useEffect(() => {
    if (tournaments) {
      fetchTournamentStandings(tournaments[selectedTournament].id)
        .then(data => setStandings(data))
        .catch(error => console.error(error))
    }
  }, [tournaments, selectedTournament])

  useEffect(() => {
    let _standings = standings?.filter(standing => standing.type === 'total')[0].sortedStandingsRows

    if (_standings) {
      setStandingsTotal(_standings)
    }
  }, [standings])

  function handleTournamentChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTournament(parseInt(event.target.value))
  }

  return (
    <VStack
      h={`fit-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={`16px`}
      pb={`16px`}
    >
      <VStack minH={`40px`}>
        <HStack h={`48px`} bg={'colors.surface2'} m={`8px`} borderRadius={`8px`} alignItems={'center'} p={`8px`}>
          <Select
            display={'flex'}
            alignItems={'center'}
            w={`auto`}
            px={`12px`}
            h={`32px`}
            style={{ appearance: 'none' }}
            bg={'colors.surface1'}
            border={`none`}
            boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
            color={'colors.onSurfaceLv1'}
            borderRadius={`8px`}
            cursor={'pointer'}
            onChange={handleTournamentChange}
            defaultValue={0}
          >
            {tournaments?.map((tournament, index) => (
              <option key={index} value={tournament.id}>
                {tournament.name}
              </option>
            ))}
          </Select>
        </HStack>
        <HStack h={`48px`} gap={`8px`} alignItems={'center'}>
          <Flex w={`24px`} mx={`8px`} flexShrink={0} justifyContent={'center'}>
            #
          </Flex>
          <Flex w={[`104px`, `150px`]} flexShrink={0}>
            {t('team')}
          </Flex>
          <Spacer w={`100%`} />
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            {t('playedShort')}
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            {t('winsShort')}
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            {t('drawsShort')}
          </Flex>
          <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
            {t('lossesShort')}
          </Flex>
          <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
            {t('goals')}
          </Flex>
          <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
            {t('pointsShort')}
          </Flex>
        </HStack>
        {standingsTotal?.map((standingsRow, index) => (
          <HStack
            h={`48px`}
            gap={`8px`}
            alignItems={'center'}
            key={index}
            bg={
              props.objectType === `team` && standingsRow.team.id === props.objectId
                ? `var(--color-primary-highlight)`
                : ``
            }
          >
            <NumberCell
              value={index + 1}
              active={props.objectType === `team` && standingsRow.team.id === props.objectId ? true : false}
            />
            <Link
              w={[`104px`, `150px`]}
              flexShrink={0}
              href={`/team/${standingsRow.team.id}`}
              borderRadius={`8px`}
              color={`colors.onSurfaceLv1`}
            >
              {standingsRow.team.name}
            </Link>
            <Spacer w={`100%`} />
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.played}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.wins}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.draws}
            </Flex>
            <Flex w={`100%`} minW={`24px`} justifyContent={'center'}>
              {standingsRow.losses}
            </Flex>
            <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
              {`${standingsRow.scoresFor}:${standingsRow.scoresAgainst}`}
            </Flex>
            <Flex w={`100%`} minW={`32px`} justifyContent={'center'}>
              {standingsRow.points}
            </Flex>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

function NumberCell(props: { value: number; active?: boolean }) {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={999}
      h={`24px`}
      aspectRatio={1}
      bg={props.active ? `colors.surface1` : `colors.secondaryDefault`}
      mx={`8px`}
    >
      {props.value}
    </Flex>
  )
}

export default Standings
