import { fetcher } from '@/pages/_app'
import { Event, EventIncidents, Player, Tournament, TournamentStandings } from '@/utils/types'
import useSWR from 'swr'

//? Events

export function getEventDetails(id: number | undefined): { data: Event; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/event/${id}/` : null, fetcher)
  return { data, error, isLoading }
}

export async function getchEventDetails(id: number) {
  const res = await fetch(`/api/event/${id}/`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export function getEventIncidents(id: number): { data: EventIncidents; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/event/${id}/incidents/` : null, fetcher)
  return { data, error, isLoading }
}

//? Players

export function getPlayerDetails(id: number): { data: Player; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/player/${id}/` : null, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromPlayer(
  id: number,
  span: 'next' | 'last',
  page: number
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(
    id && span && page ? `api/player/${id}/events/${span}/${page}` : null,
    fetcher
  )
  return { data, error, isLoading }
}

export function getPlayerImageLink(id: number) {
  return id ? `/api/player/${id}/image` : ``
}

//? Sports

export function getEventsFromSportAndDate(
  sport: string,
  date: string
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(sport && date ? `/api/sport/${sport}/events/${date}/` : null, fetcher)
  return { data, error, isLoading }
}

export function getTournamentsFromSport(sport: string): { data: Tournament[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(sport ? `/api/sport/${sport}/tournaments` : null, fetcher)
  return { data, error, isLoading }
}

//? Teams

export function getTeamDetails(id: number) {
  const { data, error, isLoading } = useSWR(id ? `/api/team/${id}/` : null, fetcher)
  return { data, error, isLoading }
}

export function getPlayersFromTeam(id: number): { data: Player[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/team/${id}/players` : null, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromTeam(id: number): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/team/${id}/events` : null, fetcher)
  return { data, error, isLoading }
}

export function getTeamImageLink(id: number) {
  return id ? `/api/team/${id}/image` : ``
}

export function getToutnamentsFromTeam(id: number): { data: Tournament[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/team/${id}/tournaments` : null, fetcher)
  return { data, error, isLoading }
}

//? Tournaments

export function getTournamentDetails(id: number) {
  const { data, error, isLoading } = useSWR(id ? `/api/tournament/${id}/` : null, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromTournament(
  id: number,
  span: 'next' | 'last',
  page: number
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id && span && page ? `api/${id}/events/${span}/${page}` : null, fetcher)
  return { data, error, isLoading }
}

export function getTournamentStandings(id: number): { data: TournamentStandings; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(id ? `/api/tournament/${id}/standings` : null, fetcher)
  return { data, error, isLoading }
}

export function getTournamentImageLink(id: number) {
  return id ? `/api/tournament/${id}/image` : ``
}
