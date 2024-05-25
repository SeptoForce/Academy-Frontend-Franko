import { fetcher } from '@/pages/_app'
import { Event, EventIncidents, Player, Tournament, TournamentStandings } from '@/utils/types'
import useSWR from 'swr'

//? Events

export function getEventDetails(id: number): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/event/${id}/`, fetcher)
  if (error) console.error('Failed to fetch event:', error)
  return { data, error, isLoading }
}

export function getEventIncidents(id: number): { data: EventIncidents; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/event/${id}/incidents/`, fetcher)
  return { data, error, isLoading }
}

//? Players

export function getPlayerDetails(id: number): { data: Player; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/player/${id}/`, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromPlayer(
  id: number,
  span: 'next' | 'last',
  page: number
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`api/player/${id}/events/${span}/${page}`, fetcher)
  return { data, error, isLoading }
}

export function getPlayerImageLink(id: number) {
  return `/api/player/${id}/image`
}

//? Sports

export function getEventsFromSportAndDate(
  sport: string,
  date: string
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/sport/${sport}/events/${date}/`, fetcher)
  return { data, error, isLoading }
}

export function getTournamentsFromSport(sport: string): { data: Tournament[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/sport/${sport}/tournaments`, fetcher)
  return { data, error, isLoading }
}

//? Teams

export function getTeamDetails(id: number) {
  const { data, error, isLoading } = useSWR(`/api/team/${id}/`, fetcher)
  return { data, error, isLoading }
}

export function getPlayersFromTeam(id: number): { data: Player[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/team/${id}/players`, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromTeam(id: number): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/team/${id}/events`, fetcher)
  return { data, error, isLoading }
}

export function getTeamImageLink(id: number) {
  return `/api/team/${id}/image`
}

export function getToutnamentsFromTeam(id: number): { data: Tournament[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/team/${id}/tournaments`, fetcher)
  return { data, error, isLoading }
}

//? Tournaments

export function getTournamentDetails(id: number) {
  const { data, error, isLoading } = useSWR(`/api/tournament/${id}/`, fetcher)
  return { data, error, isLoading }
}

export function getEventsFromTournament(
  id: number,
  span: 'next' | 'last',
  page: number
): { data: Event[]; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`api/${id}/events/${span}/${page}`, fetcher)
  return { data, error, isLoading }
}

export function getTournamentStandings(id: number): { data: TournamentStandings; error: any; isLoading: boolean } {
  const { data, error, isLoading } = useSWR(`/api/tournament/${id}/standings`, fetcher)
  return { data, error, isLoading }
}

export function getTournamentImageLink(id: number) {
  return `/api/tournament/${id}/image`
}
