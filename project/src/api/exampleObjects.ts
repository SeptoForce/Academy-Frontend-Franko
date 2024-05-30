import { Event, EventIncidents, Player, Team, Tournament, TournamentStandings } from '@/utils/types'

export function getExampleEvent(): Event {
  return {
    id: 1,
    slug: 'fulham-manchester-united',
    tournament: {
      id: 1,
      name: 'Premier League',
      slug: 'premier-league',
      sport: {
        id: 1,
        name: 'Football',
        slug: 'football',
      },
      country: {
        id: 70,
        name: 'England',
      },
    },
    homeTeam: {
      id: 7,
      name: 'Fulham',
      country: {
        id: 70,
        name: 'England',
      },
    },
    awayTeam: {
      id: 1,
      name: 'Manchester United',
      country: {
        id: 70,
        name: 'England',
      },
    },
    status: 'finished',
    startDate: '2024-01-06T12:10:00+00:00',
    homeScore: {
      total: 3,
      period1: 1,
      period2: 2,
    },
    awayScore: {
      total: 4,
      period1: 2,
      period2: 2,
    },
    winnerCode: 'away',
    round: 1,
  }
}

export function getExampleEventsFromSportAndDate(): Event[] {
  return [
    {
      id: 1,
      slug: 'fulham-manchester-united',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 7,
        name: 'Fulham',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 1,
        name: 'Manchester United',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'finished',
      startDate: '2024-01-06T12:10:00+00:00',
      homeScore: {
        total: 3,
        period1: 1,
        period2: 2,
      },
      awayScore: {
        total: 4,
        period1: 2,
        period2: 2,
      },
      winnerCode: 'away',
      round: 1,
    },
    {
      id: 28,
      slug: 'newcastle-united-brighton-and-hove-albion',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 10,
        name: 'Newcastle United',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 2,
        name: 'Brighton & Hove 2',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'inprogress',
      startDate: '2024-05-25T12:00:00+00:00',
      homeScore: {
        total: 0,
        period2: 0,
      },
      awayScore: {
        total: 2,
        period2: 2,
      },
      winnerCode: 'away',
      round: 21,
    },
    {
      id: 22,
      slug: 'sheffield-united-nottingham-forest',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 8,
        name: 'Sheffield United',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 6,
        name: 'Nottingham Forest',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T13:50:00+00:00',
      homeScore: {
        total: 0,
        period2: 0,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'away',
      round: 21,
    },
    {
      id: 24,
      slug: 'manchester-united-liverpool',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 1,
        name: 'Manchester United',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 17,
        name: 'Liverpool',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T14:20:00+00:00',
      homeScore: {
        total: 1,
        period2: 1,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'draw',
      round: 21,
    },
    {
      id: 26,
      slug: 'luton-town-wolverhampton',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 14,
        name: 'Luton Town',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 20,
        name: 'Wolverhampton',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T14:50:00+00:00',
      homeScore: {
        total: 2,
        period2: 2,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'home',
      round: 21,
    },
    {
      id: 30,
      slug: 'fulham-brentford',
      tournament: {
        id: 1,
        name: 'Premier League',
        slug: 'premier-league',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 70,
          name: 'England',
        },
      },
      homeTeam: {
        id: 7,
        name: 'Fulham',
        country: {
          id: 70,
          name: 'England',
        },
      },
      awayTeam: {
        id: 18,
        name: 'Brentford',
        country: {
          id: 70,
          name: 'England',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T15:00:00+00:00',
      homeScore: {
        total: 0,
        period2: 0,
      },
      awayScore: {
        total: 2,
        period2: 2,
      },
      winnerCode: 'away',
      round: 21,
    },
    {
      id: 423,
      slug: 'hnk-rijeka-nk-osijek',
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      homeTeam: {
        id: 24,
        name: 'HNK Rijeka',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      awayTeam: {
        id: 30,
        name: 'NK Osijek',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T11:50:00+00:00',
      homeScore: {
        total: 1,
        period2: 1,
      },
      awayScore: {
        total: 0,
        period2: 0,
      },
      winnerCode: 'home',
      round: 21,
    },
    {
      id: 427,
      slug: 'nk-slaven-belupo-nk-istra-1961',
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      homeTeam: {
        id: 29,
        name: 'NK Slaven Belupo',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      awayTeam: {
        id: 23,
        name: 'NK Istra 1961',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T14:40:00+00:00',
      homeScore: {
        total: 0,
        period2: 0,
      },
      awayScore: {
        total: 2,
        period2: 2,
      },
      winnerCode: 'away',
      round: 21,
    },
    {
      id: 431,
      slug: 'hnk-hajduk-split-hnk-gorica',
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      homeTeam: {
        id: 27,
        name: 'HNK Hajduk Split',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      awayTeam: {
        id: 26,
        name: 'HNK Gorica',
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T19:10:00+00:00',
      homeScore: {
        total: 0,
        period2: 0,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'away',
      round: 21,
    },
    {
      id: 584,
      slug: 'getafe-almeria',
      tournament: {
        id: 3,
        name: 'LaLiga',
        slug: 'laliga',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      homeTeam: {
        id: 42,
        name: 'Getafe',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      awayTeam: {
        id: 41,
        name: 'Almería',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T11:20:00+00:00',
      homeScore: {
        total: 2,
        period2: 2,
      },
      awayScore: {
        total: 2,
        period2: 2,
      },
      winnerCode: 'draw',
      round: 21,
    },
    {
      id: 588,
      slug: 'las-palmas-cadiz',
      tournament: {
        id: 3,
        name: 'LaLiga',
        slug: 'laliga',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      homeTeam: {
        id: 39,
        name: 'Las Palmas',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      awayTeam: {
        id: 50,
        name: 'Cádiz',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T12:50:00+00:00',
      homeScore: {
        total: 2,
        period2: 2,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'home',
      round: 21,
    },
    {
      id: 586,
      slug: 'deportivo-alaves-rayo-vallecano',
      tournament: {
        id: 3,
        name: 'LaLiga',
        slug: 'laliga',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      homeTeam: {
        id: 44,
        name: 'Deportivo Alavés',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      awayTeam: {
        id: 47,
        name: 'Rayo Vallecano',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T14:30:00+00:00',
      homeScore: {
        total: 1,
        period2: 1,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'draw',
      round: 21,
    },
    {
      id: 590,
      slug: 'atletico-madrid-girona-fc',
      tournament: {
        id: 3,
        name: 'LaLiga',
        slug: 'laliga',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      homeTeam: {
        id: 49,
        name: 'Atlético Madrid',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      awayTeam: {
        id: 38,
        name: 'Girona FC',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T17:30:00+00:00',
      homeScore: {
        total: 2,
        period2: 2,
      },
      awayScore: {
        total: 0,
        period2: 0,
      },
      winnerCode: 'home',
      round: 21,
    },
    {
      id: 582,
      slug: 'athletic-club-valencia',
      tournament: {
        id: 3,
        name: 'LaLiga',
        slug: 'laliga',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      homeTeam: {
        id: 36,
        name: 'Athletic Club',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      awayTeam: {
        id: 45,
        name: 'Valencia',
        country: {
          id: 218,
          name: 'Spain',
        },
      },
      status: 'finished',
      startDate: '2024-05-25T17:30:00+00:00',
      homeScore: {
        total: 2,
        period2: 2,
      },
      awayScore: {
        total: 1,
        period2: 1,
      },
      winnerCode: 'home',
      round: 21,
    },
  ]
}

export function getExampleTourament(): Tournament {
  return {
    id: 1,
    name: 'Premier League',
    slug: 'premier-league',
    sport: {
      id: 1,
      name: 'Football',
      slug: 'football',
    },
    country: {
      id: 70,
      name: 'England',
    },
    numberOfCompetitors: 20,
    headToHeadCount: 2,
  }
}

export function getExampleTeam(): Team {
  return {
    id: 1,
    name: 'Manchester United',
    country: {
      id: 70,
      name: 'England',
    },
    managerName: 'Erik ten Hag',
    venue: 'Old Trafford',
  }
}

export function getExamplePlayer(): Player {
  return {
    id: 1,
    name: 'Shoretire, Shola',
    slug: 'shoretire-shola',
    sport: {
      id: 1,
      name: 'Football',
      slug: 'football',
    },
    team: {
      id: 1,
      name: 'Manchester United',
      country: {
        id: 70,
        name: 'England',
      },
    },
    country: {
      id: 70,
      name: 'England',
    },
    position: 'M',
    dateOfBirth: '2004-02-02T00:00:00+00:00',
  }
}

export function getExampleIncidents(): EventIncidents {
  return [
    {
      player: {
        id: 4,
        name: 'Zachary Dearnley',
        slug: 'zachary-dearnley',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 0,
      awayScore: 1,
      goalType: 'regular',
      id: 56,
      time: 2,
      type: 'goal',
    },
    {
      player: {
        id: 12,
        name: 'Sofyan Amrabat',
        slug: 'sofyan-amrabat',
        country: {
          id: 154,
          name: 'Morocco',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 74,
      time: 26,
      type: 'card',
    },
    {
      player: {
        id: 218,
        name: 'Armando Broja',
        slug: 'armando-broja',
        country: {
          id: 3,
          name: 'Albania',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 1,
      awayScore: 1,
      goalType: 'regular',
      id: 57,
      time: 27,
      type: 'goal',
    },
    {
      player: {
        id: 20,
        name: 'Rasmus Højlund',
        slug: 'rasmus-hojlund',
        country: {
          id: 62,
          name: 'Denmark',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 1,
      awayScore: 2,
      goalType: 'regular',
      id: 58,
      time: 29,
      type: 'goal',
    },
    {
      player: {
        id: 29,
        name: 'Luke Shaw',
        slug: 'luke-shaw',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'D',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 76,
      time: 31,
      type: 'card',
    },
    {
      player: {
        id: 30,
        name: 'Scott McTominay',
        slug: 'scott-mctominay',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 77,
      time: 36,
      type: 'card',
    },
    {
      player: {
        id: 218,
        name: 'Armando Broja',
        slug: 'armando-broja',
        country: {
          id: 3,
          name: 'Albania',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 2,
      awayScore: 2,
      goalType: 'penalty',
      id: 59,
      time: 38,
      type: 'goal',
    },
    {
      player: {
        id: 27,
        name: 'Joe Hugill',
        slug: 'joe-hugill',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 2,
      awayScore: 3,
      goalType: 'regular',
      id: 60,
      time: 44,
      type: 'goal',
    },
    {
      player: {
        id: 219,
        name: 'João Palhinha',
        slug: 'joao-palhinha',
        country: {
          id: 185,
          name: 'Portugal',
        },
        position: 'M',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 71,
      time: 45,
      type: 'card',
    },
    {
      player: {
        id: 14,
        name: 'Toby Collyer',
        slug: 'toby-collyer',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 75,
      time: 45,
      type: 'card',
    },
    {
      text: 'HT 1-2',
      id: 54,
      time: 46,
      type: 'period',
    },
    {
      player: {
        id: 3,
        name: 'Demetri Mitchell',
        slug: 'demetri-mitchell',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'D',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 73,
      time: 48,
      type: 'card',
    },
    {
      player: {
        id: 20,
        name: 'Rasmus Højlund',
        slug: 'rasmus-hojlund',
        country: {
          id: 62,
          name: 'Denmark',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 2,
      awayScore: 4,
      goalType: 'regular',
      id: 61,
      time: 50,
      type: 'goal',
    },
    {
      player: {
        id: 224,
        name: 'Raúl Jiménez',
        slug: 'raul-jimenez',
        country: {
          id: 147,
          name: 'Mexico',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 3,
      awayScore: 4,
      goalType: 'regular',
      id: 62,
      time: 58,
      type: 'goal',
    },
    {
      player: {
        id: 222,
        name: 'Bernd Leno',
        slug: 'bernd-leno',
        country: {
          id: 87,
          name: 'Germany',
        },
        position: 'G',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 72,
      time: 60,
      type: 'card',
    },
    {
      player: {
        id: 206,
        name: 'Jordan Evans',
        slug: 'jordan-evans',
        country: {
          id: 250,
          name: 'Wales',
        },
        position: 'D',
      },
      teamSide: 'home',
      color: 'red',
      id: 67,
      time: 62,
      type: 'card',
    },
    {
      player: {
        id: 218,
        name: 'Armando Broja',
        slug: 'armando-broja',
        country: {
          id: 3,
          name: 'Albania',
        },
        position: 'F',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 70,
      time: 62,
      type: 'card',
    },
    {
      player: {
        id: 218,
        name: 'Armando Broja',
        slug: 'armando-broja',
        country: {
          id: 3,
          name: 'Albania',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 4,
      awayScore: 4,
      goalType: 'regular',
      id: 63,
      time: 64,
      type: 'goal',
    },
    {
      player: {
        id: 216,
        name: 'Sa\u0161a Luki\u0107',
        slug: 'sasa-lukic',
        country: {
          id: 205,
          name: 'Serbia',
        },
        position: 'M',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 69,
      time: 66,
      type: 'card',
    },
    {
      player: {
        id: 34,
        name: 'Shola Shoretire',
        slug: 'shola-shoretire',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 4,
      awayScore: 5,
      goalType: 'regular',
      id: 64,
      time: 75,
      type: 'goal',
    },
    {
      player: {
        id: 214,
        name: 'Bobby Decordova-Reid',
        slug: 'bobby-decordova-reid',
        country: {
          id: 116,
          name: 'Jamaica',
        },
        position: 'M',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 68,
      time: 81,
      type: 'card',
    },
    {
      player: {
        id: 217,
        name: 'Floyd Ama Ayite',
        slug: 'floyd-ama-ayite',
        country: {
          id: 229,
          name: 'Togo',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 5,
      awayScore: 5,
      goalType: 'regular',
      id: 65,
      time: 83,
      type: 'goal',
    },
    {
      player: {
        id: 218,
        name: 'Armando Broja',
        slug: 'armando-broja',
        country: {
          id: 3,
          name: 'Albania',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 5,
      awayScore: 6,
      goalType: 'owngoal',
      id: 66,
      time: 83,
      type: 'goal',
    },
    {
      text: 'FT 3-4',
      id: 55,
      time: 91,
      type: 'period',
    },
  ]
}

export function getExampleStandings(): TournamentStandings {
  return [
    {
      id: 4,
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      type: 'home',
      sortedStandingsRows: [
        {
          id: 66,
          team: {
            id: 26,
            name: 'HNK Gorica',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 16,
          scoresFor: 19,
          scoresAgainst: 15,
          played: 9,
          wins: 5,
          draws: 1,
          losses: 3,
        },
        {
          id: 62,
          team: {
            id: 21,
            name: 'NK Varaždin',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 16,
          scoresFor: 19,
          scoresAgainst: 15,
          played: 9,
          wins: 4,
          draws: 4,
          losses: 1,
        },
        {
          id: 61,
          team: {
            id: 25,
            name: 'NK Lokomotiva Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 14,
          scoresFor: 19,
          scoresAgainst: 16,
          played: 9,
          wins: 4,
          draws: 2,
          losses: 3,
        },
        {
          id: 65,
          team: {
            id: 24,
            name: 'HNK Rijeka',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 12,
          scoresFor: 21,
          scoresAgainst: 20,
          played: 8,
          wins: 4,
          draws: 0,
          losses: 4,
        },
        {
          id: 63,
          team: {
            id: 22,
            name: 'NK Rude\u0161',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 12,
          scoresFor: 17,
          scoresAgainst: 14,
          played: 8,
          wins: 3,
          draws: 3,
          losses: 2,
        },
        {
          id: 70,
          team: {
            id: 29,
            name: 'NK Slaven Belupo',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 10,
          scoresFor: 17,
          scoresAgainst: 15,
          played: 8,
          wins: 2,
          draws: 4,
          losses: 2,
        },
        {
          id: 69,
          team: {
            id: 27,
            name: 'HNK Hajduk Split',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 8,
          scoresFor: 19,
          scoresAgainst: 21,
          played: 9,
          wins: 2,
          draws: 2,
          losses: 5,
        },
        {
          id: 67,
          team: {
            id: 28,
            name: 'GNK Dinamo Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 7,
          scoresFor: 15,
          scoresAgainst: 25,
          played: 8,
          wins: 2,
          draws: 1,
          losses: 5,
        },
        {
          id: 68,
          team: {
            id: 23,
            name: 'NK Istra 1961',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 7,
          scoresFor: 14,
          scoresAgainst: 22,
          played: 9,
          wins: 2,
          draws: 1,
          losses: 6,
        },
        {
          id: 64,
          team: {
            id: 30,
            name: 'NK Osijek',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 3,
          scoresFor: 13,
          scoresAgainst: 19,
          played: 8,
          wins: 0,
          draws: 3,
          losses: 5,
        },
      ],
    },
    {
      id: 5,
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      type: 'away',
      sortedStandingsRows: [
        {
          id: 73,
          team: {
            id: 22,
            name: 'NK Rude\u0161',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 22,
          scoresFor: 26,
          scoresAgainst: 13,
          played: 9,
          wins: 7,
          draws: 1,
          losses: 1,
        },
        {
          id: 76,
          team: {
            id: 26,
            name: 'HNK Gorica',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 16,
          scoresFor: 19,
          scoresAgainst: 18,
          played: 8,
          wins: 5,
          draws: 1,
          losses: 2,
        },
        {
          id: 71,
          team: {
            id: 25,
            name: 'NK Lokomotiva Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 14,
          scoresFor: 19,
          scoresAgainst: 19,
          played: 8,
          wins: 4,
          draws: 2,
          losses: 2,
        },
        {
          id: 75,
          team: {
            id: 24,
            name: 'HNK Rijeka',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 14,
          scoresFor: 19,
          scoresAgainst: 18,
          played: 9,
          wins: 4,
          draws: 2,
          losses: 3,
        },
        {
          id: 78,
          team: {
            id: 23,
            name: 'NK Istra 1961',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 13,
          scoresFor: 16,
          scoresAgainst: 14,
          played: 8,
          wins: 4,
          draws: 1,
          losses: 3,
        },
        {
          id: 80,
          team: {
            id: 29,
            name: 'NK Slaven Belupo',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 13,
          scoresFor: 13,
          scoresAgainst: 11,
          played: 9,
          wins: 4,
          draws: 1,
          losses: 4,
        },
        {
          id: 77,
          team: {
            id: 28,
            name: 'GNK Dinamo Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 11,
          scoresFor: 23,
          scoresAgainst: 25,
          played: 9,
          wins: 2,
          draws: 5,
          losses: 2,
        },
        {
          id: 79,
          team: {
            id: 27,
            name: 'HNK Hajduk Split',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 10,
          scoresFor: 13,
          scoresAgainst: 15,
          played: 8,
          wins: 2,
          draws: 4,
          losses: 2,
        },
        {
          id: 72,
          team: {
            id: 21,
            name: 'NK Varaždin',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 8,
          scoresFor: 16,
          scoresAgainst: 17,
          played: 8,
          wins: 2,
          draws: 2,
          losses: 4,
        },
        {
          id: 74,
          team: {
            id: 30,
            name: 'NK Osijek',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 8,
          scoresFor: 18,
          scoresAgainst: 23,
          played: 9,
          wins: 2,
          draws: 2,
          losses: 5,
        },
      ],
    },
    {
      id: 6,
      tournament: {
        id: 2,
        name: 'HNL',
        slug: 'hnl',
        sport: {
          id: 1,
          name: 'Football',
          slug: 'football',
        },
        country: {
          id: 56,
          name: 'Croatia',
        },
      },
      type: 'total',
      sortedStandingsRows: [
        {
          id: 83,
          team: {
            id: 22,
            name: 'NK Rude\u0161',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 34,
          scoresFor: 43,
          scoresAgainst: 27,
          played: 17,
          wins: 10,
          draws: 4,
          losses: 3,
        },
        {
          id: 86,
          team: {
            id: 26,
            name: 'HNK Gorica',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 32,
          scoresFor: 38,
          scoresAgainst: 33,
          played: 17,
          wins: 10,
          draws: 2,
          losses: 5,
        },
        {
          id: 81,
          team: {
            id: 25,
            name: 'NK Lokomotiva Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 28,
          scoresFor: 38,
          scoresAgainst: 35,
          played: 17,
          wins: 8,
          draws: 4,
          losses: 5,
        },
        {
          id: 85,
          team: {
            id: 24,
            name: 'HNK Rijeka',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 26,
          scoresFor: 40,
          scoresAgainst: 38,
          played: 17,
          wins: 8,
          draws: 2,
          losses: 7,
        },
        {
          id: 82,
          team: {
            id: 21,
            name: 'NK Varaždin',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 24,
          scoresFor: 35,
          scoresAgainst: 32,
          played: 17,
          wins: 6,
          draws: 6,
          losses: 5,
        },
        {
          id: 90,
          team: {
            id: 29,
            name: 'NK Slaven Belupo',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 23,
          scoresFor: 30,
          scoresAgainst: 26,
          played: 17,
          wins: 6,
          draws: 5,
          losses: 6,
        },
        {
          id: 88,
          team: {
            id: 23,
            name: 'NK Istra 1961',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 20,
          scoresFor: 30,
          scoresAgainst: 36,
          played: 17,
          wins: 6,
          draws: 2,
          losses: 9,
        },
        {
          id: 87,
          team: {
            id: 28,
            name: 'GNK Dinamo Zagreb',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 18,
          scoresFor: 38,
          scoresAgainst: 50,
          played: 17,
          wins: 4,
          draws: 6,
          losses: 7,
        },
        {
          id: 89,
          team: {
            id: 27,
            name: 'HNK Hajduk Split',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 18,
          scoresFor: 32,
          scoresAgainst: 36,
          played: 17,
          wins: 4,
          draws: 6,
          losses: 7,
        },
        {
          id: 84,
          team: {
            id: 30,
            name: 'NK Osijek',
            country: {
              id: 56,
              name: 'Croatia',
            },
          },
          points: 11,
          scoresFor: 31,
          scoresAgainst: 42,
          played: 17,
          wins: 2,
          draws: 5,
          losses: 10,
        },
      ],
    },
  ]
}
