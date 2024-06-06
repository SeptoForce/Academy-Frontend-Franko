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
    if (props.event !== undefined) {
      fetchEventDetails(props.event.id)
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    }

    if (props.tournament != undefined) {
      fetchTournamentDetails(props.tournament.id)
        .then(data => setTournament(data))
        .catch(error => console.error(error))
    }

    if (props.player !== undefined) {
      fetchPlayerDetails(props.player.id)
        .then(data => {
          setPlayer(data)
          fetchTeamDetails(data.team.id)
            .then(teamData => {
              setTeam(teamData)
              fetchTournamentsFromTeam(data.team.id)
                .then(data => setTournament(data[0]))
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    }

    if (props.team !== undefined) {
      fetchTeamDetails(props.team.id)
        .then(data => setTeam(data))
        .catch(error => console.error(error))
    }
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
        {(event || player) && (
          <>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={`/tournament/${event?.tournament.id || tournament?.id}`}>
              {event?.tournament.name || tournament?.name}
            </Link>
          </>
        )}
        <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
        <Text userSelect={'none'}>
          {event ? `${event?.homeTeam.name} vs ${event?.awayTeam.name}` : ``}
          {tournament && !player && !team ? tournament.name : ``}
          {player ? player.name : ``}
        </Text>
      </HStack>
    </HStack>
  )
}

export default HeaderEventBreadcrumbs
