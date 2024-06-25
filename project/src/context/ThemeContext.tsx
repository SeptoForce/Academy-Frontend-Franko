import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'

function getInitialTheme() {
  const cookies = parseCookies()
  return cookies.theme || 'light'
}

interface ContextValue {
  isDark: boolean
  setTheme: (theme: 'dark' | 'light') => void
}

const ThemeContext = createContext<ContextValue>({} as ContextValue)

export const ThemeContextProvider = (props: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(getInitialTheme() === 'dark')

  const setTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      setCookie(null, 'theme', 'dark', { maxAge: 365 * 24 * 60 * 60, path: '/' })
      setIsDark(true)
    } else {
      setCookie(null, 'theme', 'light', { maxAge: 365 * 24 * 60 * 60, path: '/' })
      setIsDark(false)
    }
  }

  useEffect(() => {
    const theme = parseCookies().theme
    setIsDark(theme === 'dark')
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, setTheme }}>{props.children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
