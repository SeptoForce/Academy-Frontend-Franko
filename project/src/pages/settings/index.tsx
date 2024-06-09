import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { HStack, VStack, Box, Text, Spacer } from '@kuma-ui/core'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'
import { useThemeContext } from '@/context/ThemeContext'
import IconRadioOn from '../../components/svg/IconRadioOn'
import IconRadioOff from '@/components/svg/IconRadioOff'
import IconSofascoreLogo from '@/components/svg/IconSofascoreLogo'
import { GetServerSidePropsContext } from 'next'
import { format } from 'date-fns'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { theme } = parseCookies(context)

  return {
    props: {
      theme,
    },
  }
}

export default function SettingsPage(props: { theme: 'dark' | 'light' }) {
  const [isDark, setIsDark] = useState(props.theme === 'dark')

  const router = useRouter()
  const appContext = useAppContext()
  const themeContext = useThemeContext()

  useEffect(() => {
    setIsDark(themeContext.isDark)
  }, [themeContext.isDark])

  return (
    <>
      <Header noCalendar noNavigation />
      <VStack
        as="main"
        h={`100%`}
        maxW={`1392px`}
        w={`100%`}
        justifyContent={`flex-start`}
        alignItems={`center`}
        px={[`0px`, `24px`]}
        flexGrow={1}
      >
        <HStack
          w={`100%`}
          h={`48px`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          px={`12px`}
          display={[`none`, `flex`]}
        ></HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box
            display={[`none`, `none`, `none`, `flex`]}
            w={`100%`}
            flexBasis={0}
            flexGrow={1}
            flexDir={'column'}
          ></Box>

          <Box display={`flex`} w={`200px`} flexDir={'column'} flexShrink={0} flexBasis={0} flexGrow={1}>
            <VStack
              h={`min-content`}
              w={`100%`}
              bg={'colors.surface1'}
              boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
              borderRadius={[`0px`, `16px`]}
              p={`8px`}
              py={`16px`}
              gap={`16px`}
            >
              <HStack h={`48px`} px={`16px`} alignItems={'center'}>
                <Text className="Headline-1">Settings</Text>
              </HStack>
              <VStack bg={'colors.surface2'} w={`100%`} h={`fit-content`} borderRadius={`8px`} p={`16px`}>
                <HStack w={`100%`} h={`48px`} justifyContent={'space-between'} alignItems={'center'}>
                  <Text color={'colors.primaryDefault'} className="Assistive">
                    Theme
                  </Text>
                </HStack>
                <HStack
                  w={`100%`}
                  h={`48px`}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  onMouseDown={() => themeContext.setTheme('light')}
                  cursor={'pointer'}
                  userSelect={'none'}
                >
                  <Text>Light</Text>
                  {isDark ? <IconRadioOff /> : <IconRadioOn />}
                </HStack>
                <HStack
                  w={`100%`}
                  h={`48px`}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  onMouseDown={() => themeContext.setTheme('dark')}
                  cursor={'pointer'}
                  userSelect={'none'}
                >
                  <Text>Dark</Text>
                  {isDark ? <IconRadioOn /> : <IconRadioOff />}
                </HStack>
              </VStack>
              <VStack bg={'colors.surface2'} w={`100%`} h={`fit-content`} borderRadius={`8px`} p={`16px`}>
                <HStack w={`100%`} h={`48px`} justifyContent={'space-between'} alignItems={'center'}>
                  <Text color={'colors.primaryDefault'} className="Assistive">
                    Date Format - {format(new Date(), appContext.dateFormat)}
                  </Text>
                </HStack>
                <HStack
                  w={`100%`}
                  h={`48px`}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  onMouseDown={() => appContext.setDateFormat('dd.MM.yyyy.')}
                  cursor={'pointer'}
                  userSelect={'none'}
                >
                  <Text>DD. MM. YYYY.</Text>
                  {appContext.dateFormat === 'dd.MM.yyyy.' ? <IconRadioOn /> : <IconRadioOff />}
                </HStack>
                <HStack
                  w={`100%`}
                  h={`48px`}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  onMouseDown={() => appContext.setDateFormat('MM/dd/yyyy')}
                  cursor={'pointer'}
                  userSelect={'none'}
                >
                  <Text>MM / DD / YYYY</Text>
                  {appContext.dateFormat === 'MM/dd/yyyy' ? <IconRadioOn /> : <IconRadioOff />}
                </HStack>
                <HStack
                  w={`100%`}
                  h={`48px`}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  onMouseDown={() => appContext.setDateFormat('dd-MM-yyyy')}
                  cursor={'pointer'}
                  userSelect={'none'}
                >
                  <Text>DD-MM-YYYY</Text>
                  {appContext.dateFormat === 'dd-MM-yyyy' ? <IconRadioOn /> : <IconRadioOff />}
                </HStack>
              </VStack>
              <VStack
                bg={'colors.surface2'}
                w={`100%`}
                h={`fit-content`}
                borderRadius={`8px`}
                p={`16px`}
                pb={`32px`}
                gap={`16px`}
              >
                <VStack w={`100%`}>
                  <Text className="Headline-1">About</Text>
                </VStack>
                <VStack w={`100%`} gap={`2px`}>
                  <Text className="Headline-2">Sofascore Frontend Academy</Text>
                  <Text>Class 2024</Text>
                </VStack>
                <Spacer borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
                <VStack w={`100%`} gap={`2px`}>
                  <Text className="Assistive" color={'colors.onSurfaceLv2'}>
                    App Name
                  </Text>
                  <Text>Mini Sofascore App</Text>
                </VStack>
                <VStack w={`100%`} gap={`2px`}>
                  <Text className="Assistive" color={'colors.onSurfaceLv2'}>
                    API Credit
                  </Text>
                  <Text>Sofascore</Text>
                </VStack>
                <VStack w={`100%`} gap={`2px`}>
                  <Text className="Assistive" color={'colors.onSurfaceLv2'}>
                    Developer
                  </Text>
                  <Text>Franko Žarković</Text>
                </VStack>
                <Spacer borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
                <VStack w={`100%`} gap={`2px`} alignItems={'center'}>
                  <IconSofascoreLogo color={`var(--color-primary-default)`} />
                </VStack>
              </VStack>
            </VStack>
          </Box>

          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
