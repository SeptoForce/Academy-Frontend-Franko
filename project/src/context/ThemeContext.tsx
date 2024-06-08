import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface ContextValue {
  isDark: boolean
  setTheme: (theme: 'dark' | 'light') => void
}

const ThemeContext = createContext<ContextValue>({} as ContextValue)

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(true)

  const setTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      Cookies.set('theme', 'dark', { expires: 365, path: '/' })
      setIsDark(true)
    } else {
      Cookies.set('theme', 'light', { expires: 365, path: '/' })
      setIsDark(false)
    }
  }

  useEffect(() => {
    setIsDark(Cookies.get('theme') === 'dark')
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
