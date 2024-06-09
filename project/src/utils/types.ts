export interface TournamentImage {
  imageUrl: string
}

export enum Positions {
  // Football
  F = 'Forward',
  M = 'Midfield',
  D = 'Defender',
  GK = 'Goalkeeper',

  // Basketball
  G = 'Guard',
  PG = 'Point Guard',
  SG = 'Shooting Guard',
  SF = 'Small Forward',
  PF = 'Power Forward',
  C = 'Center',

  // American Football
  CB = 'Cornerback',
  QB = 'Quarterback',
  RB = 'Running Back',
  WR = 'Wide Receiver',
  TE = 'Tight End',
  OL = 'Offensive Line',
  DL = 'Defensive Line',
  LB = 'Linebacker',
  DB = 'Defensive Back',
  K = 'Kicker',
  P = 'Punter',
  LS = 'Long Snapper',
  SAF = 'Safety',
  OLB = 'Outside Linebacker',
  DE = 'Defensive End',
}

export enum EventStatus {
  LIVE = 'inprogress',
  UPCOMING = 'notstarted',
  FINISHED = 'finished',
}

export enum WinnerCode {
  HOME = 'home',
  AWAY = 'away',
  DRAW = 'draw',
}

export enum GoalType {
  REGULAR = 'regular',
  OWNGOAL = 'owngoal',
  PENALTY = 'penalty',
  ONEPOINT = 'onepoint',
  TWOPOINT = 'twopoint',
  THREEPOINT = 'threepoint',
  TOUCHDOWN = 'touchdown',
  SAFETY = 'safety',
  FIELDGOAL = 'fieldgoal',
  EXTRAPOINT = 'extrapoint',
}

export enum TeamSide {
  HOME = 'home',
  AWAY = 'away',
}

export enum CardColor {
  YELLOW = 'yellow',
  RED = 'red',
  YELLOWRED = 'yellowred',
}

export enum IncidentType {
  CARD = 'card',
  GOAL = 'goal',
  PERIOD = 'period',
}

export enum StandingsType {
  TOTAL = 'total',
  HOME = 'home',
  AWAY = 'away',
}

export type Event = {
  id: number
  slug: string
  tournament: {
    id: number
    name: string
    slug: string
    sport: {
      id: number
      name: string
      slug: string
    }
    country: {
      id: number
      name: string
    }
  }
  homeTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  awayTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  status: 'inprogress' | 'notstarted' | 'finished'
  startDate: string
  homeScore: {
    total?: number
    period1?: number
    period2?: number
    period3?: number
    period4?: number
    overtime?: number
  }
  awayScore: {
    total?: number
    period1?: number
    period2?: number
    period3?: number
    period4?: number
    overtime?: number
  }
  winnerCode?: 'home' | 'away' | 'draw'
  round: number
}

export type Tournament = {
  id: number
  name: string
  slug: string
  sport: {
    id: number
    name: string
    slug: string
  }
  country: {
    id: number
    name: string
  }
  numberOfCompetitors?: number
  headToHeadCount?: number
}

export type Player = {
  id: number
  name: string
  slug: string
  sport: {
    id: number
    name: string
    slug: string
  }
  team: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  country: {
    id: number
    name: string
  }
  position: string
  dateOfBirth: string
}

export type Team = {
  id: number
  name: string
  country: {
    id: number
    name: string
  }
  managerName: string
  venue: string
}

export type TournamentStandings = {
  id: number
  tournament: {
    id: number
    name: string
    slug: string
    sport: {
      id: number
      name: string
      slug: string
    }
    country: {
      id: number
      name: string
    }
  }
  type: 'total' | 'home' | 'away'
  sortedStandingsRows: {
    id: number
    team: {
      id: number
      name: string
      country: {
        id: number
        name: string
      }
    }
    points: number
    scoresFor: number
    scoresAgainst: number
    played: number
    wins: number
    draws: number
    losses: number
    percentage?: number
  }[]
}[]

export type TournamentStandingsRow = {
  id: number
  team: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  points: number
  scoresFor: number
  scoresAgainst: number
  played: number
  wins: number
  draws: number
  losses: number
  percentage?: number
}

export type EventIncidents = EventIncident[]

export type EventIncident = {
  player?: {
    id: number
    name: string
    slug: string
    country: {
      id: number
      name: string
    }
    position: string
  }
  scoringTeam?: 'home' | 'away'
  homeScore?: number
  awayScore?: number
  goalType?:
    | 'regular'
    | 'owngoal'
    | 'penalty'
    | 'onepoint'
    | 'twopoint'
    | 'threepoint'
    | 'touchdown'
    | 'safety'
    | 'fieldgoal'
    | 'extrapoint'
  teamSide?: 'home' | 'away'
  color?: 'yellow' | 'red' | 'yellowred'
  text?: string
  id: number
  time: number
  type: 'card' | 'goal' | 'period'
}
