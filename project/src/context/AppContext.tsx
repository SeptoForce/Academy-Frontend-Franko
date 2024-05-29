import { Event } from '@/utils/types'
import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface AppProviderContext {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  selectedSport?: string
  setSelectedSport: (sport: string, notShallow?: boolean) => void
  selectedDate?: string
  setSelectedDate: (date: string) => void
  selectedEvent?: Event
  setSelectedEvent: (event: Event) => void
  selectedLeague?: number
  setSelectedLeague: (league: number) => void
  selectedTeam?: number
  setSelectedTeam: (team: number) => void
  selectedPlayer?: number
  setSelectedPlayer: (player: number) => void
}

const AppContext = createContext<AppProviderContext>({} as AppProviderContext)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [selectedSport, _setSelectedSport] = useState<string>('/')
  const [selectedDate, _setSelectedDate] = useState<string>()
  const [selectedEvent, _setSelectedEvent] = useState<Event>()
  const [selectedLeague, _setSelectedLeague] = useState<number>()
  const [selectedTeam, _setSelectedTeam] = useState<number>()
  const [selectedPlayer, _setSelectedPlayer] = useState<number>()

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 993
      setIsMobile(isMobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const setSelectedSport = (sport: string, notShallow?: boolean) => {
    if (sport === selectedSport) {
      return
    }
    _setSelectedSport(sport)
    router.replace(`/${sport}`, undefined, { shallow: !notShallow })
  }

  const setSelectedDate = (date: string) => {
    if (!date) {
      date = new Date().toISOString().split('T')[0]
    }
    _setSelectedDate(date)
    router.replace({ query: { slug: selectedSport, d: date } }, undefined, { shallow: true })
  }

  const setSelectedEvent = (event: Event) => {
    _setSelectedEvent(event)

    if (!event) {
      return
    }
    if (isMobile) {
      router.push(`event/${event.id}`, undefined, { shallow: true })
    } else {
      router.replace({ query: { ...router.query, e: event.id } }, undefined, { shallow: true })
    }
  }

  const setSelectedLeague = (league: number) => {
    _setSelectedLeague(league)
    router.push(`league/${league}`)
  }

  const setSelectedTeam = (team: number) => {
    _setSelectedTeam(team)
    router.push(`team/${team}`)
  }

  const setSelectedPlayer = (player: number) => {
    _setSelectedPlayer(player)
    router.push(`player/${player}`)
  }

  return (
    <AppContext.Provider
      value={{
        isMobile,
        setIsMobile,
        setSelectedSport,
        selectedDate,
        setSelectedDate,
        selectedEvent,
        setSelectedEvent,
        selectedLeague,
        setSelectedLeague,
        selectedTeam,
        setSelectedTeam,
        selectedPlayer,
        setSelectedPlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
