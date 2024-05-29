import '@/styles/globals.css'
import { ThemeContextProvider } from '@/context/ThemeContext'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { AppContextProvider } from '@/context/AppContext'

//@ts-ignore
export const fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404')
    }
  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AppContextProvider>
        <ThemeContextProvider>
          <Head>
            <title>Mini Sofascore</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content="Final project for Sofascore Academy. Simpler version of Sofascore website."
            />
          </Head>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </AppContextProvider>
    </SWRConfig>
  )
}
