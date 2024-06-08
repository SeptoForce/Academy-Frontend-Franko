import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface AppProviderContext {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

const AppContext = createContext<AppProviderContext>({} as AppProviderContext)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsMobile(isMobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <AppContext.Provider
      value={{
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
