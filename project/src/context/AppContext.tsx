import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, ReactChildren, ReactNode, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface AppProviderContext {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  dateFormat: string
  setDateFormat: (dateFormat: string) => void
  timeFormat: string
}

const AppContext = createContext<AppProviderContext>({} as AppProviderContext)

export function AppContextProvider(props: { children: ReactNode }) {
  const router = useRouter()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [dateFormat, _setDateFormat] = useState<string>('      ')
  const [timeFormat, setTimeFormat] = useState<string>('HH:mm')

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function setDateFormat(dateFormat: string) {
    Cookies.set('dateFormat', dateFormat)
    _setDateFormat(dateFormat)
  }

  useEffect(() => {
    if (dateFormat === `MM/dd/yyyy`) {
      setTimeFormat('h:mm aa')
    } else if (dateFormat === `dd.MM.yyyy.`) {
      setTimeFormat(`HH:mm`)
    } else if (dateFormat === `dd-MM-yyyy`) {
      setTimeFormat(`HH:mm`)
    }
  }, [dateFormat])

  useEffect(() => {
    const dateFormatCookie = Cookies.get('dateFormat')
    if (dateFormatCookie) {
      _setDateFormat(dateFormatCookie)
    }
  }, [Cookies.get()])

  return (
    <AppContext.Provider
      value={{
        isMobile,
        setIsMobile,
        dateFormat,
        setDateFormat,
        timeFormat,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
