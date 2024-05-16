import { useThemeContext } from '@/context/ThemeContext'
import { Box, Button } from '@kuma-ui/core'
import Head from 'next/head'

export default function Home() {
  const { setIsDark } = useThemeContext()

  return (
    <>
      <Head>
        <title>Mini Sofascore</title>
        <meta name="description" content="Final project for Sofascore Academy. Simpler version of Sofascore website." />
      </Head>
      <Box as="main" background="colors.primary">
        <Box as="h1" color="colors.surface1" fontFamily="fonts.roboto">
          This is your homepage
        </Box>
        <Button onClick={() => setIsDark(v => !v)}>Toggle theme</Button>
      </Box>
    </>
  )
}
