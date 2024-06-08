import { HStack, Link, Text } from '@kuma-ui/core'
import IconPointerRight from '../svg/IconPointerRight'
import { Event, Player, Team, Tournament } from '@/utils/types'
import { useEffect, useState } from 'react'
import {
  fetchEventDetails,
  fetchPlayerDetails,
  fetchTeamDetails,
  fetchTournamentDetails,
  fetchTournamentsFromTeam,
} from '@/api/api'

export function HeaderEventBreadcrumbs(props: {
  event?: Event
  tournament?: Tournament
  player?: Player
  team?: Team
}) {
  const [event, setEvent] = useState<Event | undefined>(props.event)
  const [tournament, setTournament] = useState<Tournament | undefined>(props.tournament)
  const [player, setPlayer] = useState<Player | undefined>(props.player)
  const [team, setTeam] = useState<Team | undefined>(props.team)

  useEffect(() => {
    if (props.player !== undefined) {
      fetchTeamDetails(props.player.team.id)
        .then(teamData => {
          fetchTournamentsFromTeam(teamData.id)
            .then(data => setTournament(data[0]))
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    }

    if (props.team !== undefined) {
      fetchTournamentsFromTeam(props.team.id)
        .then(data => setTournament(data[0]))
        .catch(error => console.error(error))
    }

    console.log(event, tournament, player, team)
  }, [props.event, props.tournament, props.player, props.team])

  return (
    <HStack w={`100%`} h={`48px`} justifyContent={`flex-start`} alignItems={`center`} px={`12px`} display={`flex`}>
      <HStack
        className="Micro"
        userSelect={`none`}
        cursor={'default'}
        alignItems={'center'}
        color={'colors.onSurfaceLv2'}
        visibility={event || tournament || player ? 'visible' : 'hidden'}
      >
        <Link href={`/${event?.tournament.sport.slug || tournament?.sport.slug || player?.sport.slug}`}>
          {event?.tournament.sport.name || tournament?.sport.name || player?.sport.name}
        </Link>
        {(event || player || team) && (
          <>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={`/tournament/${event?.tournament.id || tournament?.id}`}>
              {event?.tournament.name || tournament?.name}
            </Link>
          </>
        )}
        {player && (
          <>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={`/team/${player.team.id}`}>{player.team.name}</Link>
          </>
        )}
        <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
        <Text userSelect={'none'}>
          {event ? `${event?.homeTeam.name} vs ${event?.awayTeam.name}` : ``}
          {tournament && !player && !team ? tournament.name : ``}
          {player ? player.name : ``}
          {team ? team.name : ``}
        </Text>
      </HStack>
    </HStack>
  )
}

export default HeaderEventBreadcrumbs
