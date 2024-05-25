import { fetcher } from '@/pages/_app'
import useSWR from 'swr'

export function getTournamentDetails(id: number) {
  const { data, error, isLoading } = useSWR(`/api/tournament/${id}/`, fetcher)
  return { data, error, isLoading }
}

export function getTeamDetails(id: number) {
  const { data, error, isLoading } = useSWR(`/api/team/${id}/`, fetcher)
  return { data, error, isLoading }
}

export function getEventDetails(id: number) {
  const { data, error, isLoading } = useSWR(`/api/event/${id}/`, fetcher)
  if (error) console.error('Failed to fetch event:', error)
  return { data, error, isLoading }
}

export function getLeagueImageLink(id: number) {
  return `/api/tournament/${id}/image`
}

export function getTeamImageLink(id: number) {
  return `/api/team/${id}/image`
}

export function getPlayerImageLink(id: number) {
  return `/api/player/${id}/image`
}

export function getEventsFromSportAndDate(sport: string, date: string) {
  const { data, error, isLoading } = useSWR(`/api/sport/${sport}/events/${date}/`, fetcher)
  return { data, error, isLoading }
}

export function getTournamentsFromSport(sport: string) {
  const { data, error, isLoading } = useSWR(`/api/sport/${sport}/tournaments`, fetcher)
  return { data, error, isLoading }
}
