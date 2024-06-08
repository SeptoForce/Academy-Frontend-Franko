import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { isWindowDefined } from 'swr/_internal'
import Cookies from 'js-cookie'

interface ContextValue {
  isDark: boolean
  setTheme: (theme: 'dark' | 'light') => void
}

const ThemeContext = createContext<ContextValue>({} as ContextValue)

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false)

  const setTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      Cookies.set('theme', 'dark')
      setIsDark(true)
    } else {
      Cookies.set('theme', 'light')
      setIsDark(false)
    }
  }

  useEffect(() => {
    if (isWindowDefined) {
      const theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        setIsDark(true)
      }
      return
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // setIsDark(true)
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
