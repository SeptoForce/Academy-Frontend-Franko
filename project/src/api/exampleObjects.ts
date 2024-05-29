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
        id: 185,
        name: 'Ryan Yates',
        slug: 'ryan-yates',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 814,
      time: 6,
      type: 'card',
    },
    {
      player: {
        id: 184,
        name: 'Gardner, Joseph Charles',
        slug: 'gardner-joseph-charles',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 0,
      awayScore: 1,
      goalType: 'penalty',
      id: 801,
      time: 14,
      type: 'goal',
    },
    {
      player: {
        id: 299,
        name: 'Brennan Johnson',
        slug: 'brennan-johnson',
        country: {
          id: 250,
          name: 'Wales',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 1,
      awayScore: 1,
      goalType: 'regular',
      id: 802,
      time: 19,
      type: 'goal',
    },
    {
      player: {
        id: 185,
        name: 'Ryan Yates',
        slug: 'ryan-yates',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellowred',
      id: 815,
      time: 19,
      type: 'card',
    },
    {
      player: {
        id: 281,
        name: 'Austin, Brandon',
        slug: 'austin-brandon',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'G',
      },
      teamSide: 'home',
      color: 'red',
      id: 808,
      time: 22,
      type: 'card',
    },
    {
      player: {
        id: 197,
        name: 'Anthony Elanga',
        slug: 'anthony-elanga',
        country: {
          id: 223,
          name: 'Sweden',
        },
        position: 'F',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 817,
      time: 29,
      type: 'card',
    },
    {
      player: {
        id: 188,
        name: 'Ribeiro, Rodrigo',
        slug: 'ribeiro-rodrigo',
        country: {
          id: 185,
          name: 'Portugal',
        },
        position: 'F',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 816,
      time: 38,
      type: 'card',
    },
    {
      player: {
        id: 197,
        name: 'Anthony Elanga',
        slug: 'anthony-elanga',
        country: {
          id: 223,
          name: 'Sweden',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 1,
      awayScore: 2,
      goalType: 'regular',
      id: 803,
      time: 42,
      type: 'goal',
    },
    {
      player: {
        id: 177,
        name: 'Harry Arter',
        slug: 'harry-arter',
        country: {
          id: 111,
          name: 'Ireland',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 810,
      time: 43,
      type: 'card',
    },
    {
      text: 'HT 0-1',
      id: 799,
      time: 46,
      type: 'period',
    },
    {
      player: {
        id: 199,
        name: 'Matz Sels',
        slug: 'matz-sels',
        country: {
          id: 22,
          name: 'Belgium',
        },
        position: 'G',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 819,
      time: 48,
      type: 'card',
    },
    {
      player: {
        id: 177,
        name: 'Harry Arter',
        slug: 'harry-arter',
        country: {
          id: 111,
          name: 'Ireland',
        },
        position: 'M',
      },
      teamSide: 'away',
      color: 'yellowred',
      id: 811,
      time: 53,
      type: 'card',
    },
    {
      player: {
        id: 184,
        name: 'Gardner, Joseph Charles',
        slug: 'gardner-joseph-charles',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 813,
      time: 60,
      type: 'card',
    },
    {
      player: {
        id: 181,
        name: 'Morgan Gibbs-White',
        slug: 'morgan-gibbs-white',
        country: {
          id: 70,
          name: 'England',
        },
        position: 'F',
      },
      scoringTeam: 'away',
      homeScore: 1,
      awayScore: 3,
      goalType: 'regular',
      id: 804,
      time: 67,
      type: 'goal',
    },
    {
      player: {
        id: 299,
        name: 'Brennan Johnson',
        slug: 'brennan-johnson',
        country: {
          id: 250,
          name: 'Wales',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 2,
      awayScore: 3,
      goalType: 'regular',
      id: 805,
      time: 72,
      type: 'goal',
    },
    {
      player: {
        id: 289,
        name: 'Pape Matar Sarr',
        slug: 'pape-matar-sarr',
        country: {
          id: 204,
          name: 'Senegal',
        },
        position: 'M',
      },
      teamSide: 'home',
      color: 'yellow',
      id: 809,
      time: 78,
      type: 'card',
    },
    {
      player: {
        id: 280,
        name: 'Yves Bissouma',
        slug: 'yves-bissouma',
        country: {
          id: 140,
          name: 'Mali',
        },
        position: 'M',
      },
      teamSide: 'home',
      color: 'red',
      id: 807,
      time: 80,
      type: 'card',
    },
    {
      player: {
        id: 197,
        name: 'Anthony Elanga',
        slug: 'anthony-elanga',
        country: {
          id: 223,
          name: 'Sweden',
        },
        position: 'F',
      },
      teamSide: 'away',
      color: 'yellowred',
      id: 818,
      time: 82,
      type: 'card',
    },
    {
      player: {
        id: 285,
        name: 'Heung-min Son',
        slug: 'heung-min-son',
        country: {
          id: 216,
          name: 'South Korea',
        },
        position: 'F',
      },
      scoringTeam: 'home',
      homeScore: 3,
      awayScore: 3,
      goalType: 'regular',
      id: 806,
      time: 83,
      type: 'goal',
    },
    {
      player: {
        id: 203,
        name: 'Andrew Omobamidele',
        slug: 'andrew-omobamidele',
        country: {
          id: 111,
          name: 'Ireland',
        },
        position: 'D',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 820,
      time: 83,
      type: 'card',
    },
    {
      player: {
        id: 203,
        name: 'Andrew Omobamidele',
        slug: 'andrew-omobamidele',
        country: {
          id: 111,
          name: 'Ireland',
        },
        position: 'D',
      },
      teamSide: 'away',
      color: 'yellowred',
      id: 821,
      time: 85,
      type: 'card',
    },
    {
      player: {
        id: 183,
        name: 'Taiwo Awoniyi',
        slug: 'taiwo-awoniyi',
        country: {
          id: 166,
          name: 'Nigeria',
        },
        position: 'F',
      },
      teamSide: 'away',
      color: 'yellow',
      id: 812,
      time: 90,
      type: 'card',
    },
    {
      text: 'FT 1-1',
      id: 800,
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
