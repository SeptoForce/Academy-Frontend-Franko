import {
  EventMatch,
  EventIncidents,
  Player,
  Team,
  Tournament,
  TournamentStandings,
  TeamSearchResult,
} from '@/utils/types'

//? Events

export async function fetchEventDetails(eventId: number): Promise<EventMatch> {
  const response = await fetch(`/api/event/${eventId}`)
  const data = await response.json()
  return data
}

export async function fetchEventIncidents(eventId: number): Promise<EventIncidents> {
  const response = await fetch(`/api/event/${eventId}/incidents`)
  const data = await response.json()
  return data
}

//? Players

export async function fetchPlayerDetails(id: number): Promise<Player> {
  const response = await fetch(`/api/player/${id}`)
  const data = await response.json()
  return data
}

export async function fetchEventsFromPlayer(id: number, span: 'next' | 'last', page: number): Promise<EventMatch[]> {
  const response = await fetch(`/api/player/${id}/events/${span}/${page}`)
  const data = await response.json()
  return data
}

export function getPlayerImageLink(id: number) {
  return id ? `/api/player/${id}/image` : ``
}

//? Sports

export async function fetchEventsFromSportAndDate(sport: string, date: string): Promise<EventMatch[]> {
  const response = await fetch(`/api/sport/${sport}/events/${date}`)
  const data = await response.json()
  return data
}

export async function fetchTournamentsFromSport(sport: string): Promise<Tournament[]> {
  const response = await fetch(`/api/sport/${sport}/tournaments`)
  const data = await response.json()
  return data
}

//? Teams

export async function fetchTeamDetails(id: number): Promise<Team> {
  const response = await fetch(`/api/team/${id}`)
  const data = await response.json()
  return data
}

export async function fetchPlayersFromTeam(id: number): Promise<Player[]> {
  const response = await fetch(`/api/team/${id}/players`)
  const data = await response.json()
  return data
}

export async function fetchEventsFromTeam(id: number, span: 'next' | 'last', page: number): Promise<EventMatch[]> {
  const response = await fetch(`/api/team/${id}/events/${span}/${page}`)
  const data = await response.json()
  return data
}

export function getTeamImageLink(id: number) {
  return id ? `/api/team/${id}/image` : ``
}

export async function fetchTournamentsFromTeam(id: number): Promise<Tournament[]> {
  const response = await fetch(`/api/team/${id}/tournaments`)
  const data = await response.json()
  return data
}

//? Tournaments

export async function fetchTournamentDetails(id: number): Promise<Tournament> {
  const response = await fetch(`/api/tournament/${id}`)
  const data = await response.json()
  return data
}

export async function fetchEventsFromTournament(
  id: number,
  span: 'next' | 'last',
  page: number
): Promise<EventMatch[]> {
  const response = await fetch(`/api/tournament/${id}/events/${span}/${page}`)
  const data = await response.json()
  return data
}

export async function fetchTournamentStandings(id: number): Promise<TournamentStandings> {
  const response = await fetch(`/api/tournament/${id}/standings`)
  const data = await response.json()
  return data
}

export function getTournamentImageLink(id: number) {
  return id ? `/api/tournament/${id}/image` : ``
}

export async function searchTeams(query: string): Promise<TeamSearchResult[]> {
  const response = await fetch(`/api/search/team/${query}`)
  const data = await response.json()
  return data
}

export async function searchPlayers(query: string): Promise<Player[]> {
  const response = await fetch(`/api/search/player/${query}`)
  const data = await response.json()
  return data
}
