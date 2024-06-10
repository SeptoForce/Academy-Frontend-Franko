import { fetchTournamentDetails } from '@/api/api'
import { EventMatch, Tournament } from '@/utils/types'
import { useEffect, useState } from 'react'
import EventCell from './EventCell'
import LeagueCell from './LeagueCell'
import { Spacer } from '@kuma-ui/core'

export function LeagueEvents(props: { tournamentId: number; events: EventMatch[] }) {
  const [tournament, setTournament] = useState<Tournament>()

  useEffect(() => {
    fetchTournamentDetails(props.tournamentId)
      .then(data => setTournament(data))
      .catch(error => console.error(error))
  }, [props.tournamentId])

  return (
    <>
      <LeagueCell tournament={tournament} />
      {props.events.map(event => {
        const parsedEvent = event as EventMatch

        return <EventCell key={parsedEvent.id} event={parsedEvent} />
      })}
      <Spacer h={`16px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
    </>
  )
}

export default LeagueEvents
