import { changeLanguage } from 'i18next'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react'
import { isWindowDefined } from 'swr/_internal'

interface AppProviderContext {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  dateFormat: string
  setDateFormat: (dateFormat: string) => void
  timeFormat: string
  language: string
  setLanguage: (language: string) => void
}

const AppContext = createContext<AppProviderContext>({} as AppProviderContext)

export function AppContextProvider(props: { children: ReactNode }) {
  const router = useRouter()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [dateFormat, _setDateFormat] = useState<string>('      ')
  const [timeFormat, setTimeFormat] = useState<string>('HH:mm')
  const [language, setLanguage] = useState<string>('en')

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isWindowDefined) {
      const languageCookie = localStorage.getItem('language')
      if (languageCookie) {
        setLanguage(languageCookie)
      }
    }
  }, [])

  useEffect(() => {
    if (isWindowDefined) {
      localStorage.setItem('language', language)
      changeLanguage(language)
    }
  }, [language])

  function setDateFormat(dateFormat: string) {
    setCookie(null, 'dateFormat', dateFormat, { maxAge: 365 * 24 * 60 * 60, path: '/' })
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
    const dateFormatCookie = parseCookies().dateFormat
    if (dateFormatCookie) {
      _setDateFormat(dateFormatCookie)
    }
  }, [parseCookies()])

  return (
    <AppContext.Provider
      value={{
        isMobile,
        setIsMobile,
        dateFormat,
        setDateFormat,
        timeFormat,
        language,
        setLanguage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
