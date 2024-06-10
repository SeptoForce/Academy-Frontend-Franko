import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { HStack, VStack, Box, Text, Button, Link } from '@kuma-ui/core'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import IconFootball from '../../components/svg/IconFootball'
import { Tournament } from '@/utils/types'
import { fetchTournamentsFromSport, getTournamentImageLink } from '@/api/api'
import IconBasketball from '@/components/svg/IconBasketball'
import IconAmericanFootball from '@/components/svg/IconAmericanFootball'
import { Image } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}

export default function TournamentsPage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'football' | 'basketball' | 'american-football'>('football')
  const [tournaments, setTournaments] = useState<Tournament[]>()

  useEffect(() => {
    fetchTournamentsFromSport(tab).then(data => {
      setTournaments(data)
    })
  }, [tab])

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

          <Box display={`flex`} w={`200px`} flexDir={'column'} flexShrink={0} flexBasis={0} flexGrow={2}>
            <VStack
              h={`min-content`}
              w={`100%`}
              bg={'colors.surface1'}
              boxShadow={[` 0 2px 16px 0 rgba(0, 0, 0, 0.12)`, `0 1px 4px 0 rgba(0, 0, 0, 0.08)`]}
              borderRadius={[`0px`, `16px 16px 0 0 `]}
              pt={`16px`}
              gap={`16px`}
              zIndex={1}
              borderBottom={`1px solid #E0E0E0`}
            >
              <HStack className="Headline-1" px={`16px`}>
                {t('leagues')}
              </HStack>
              <HStack h={`48px`}>
                <Button
                  h={`100%`}
                  w={`100%`}
                  position={`relative`}
                  onClick={() => {
                    setTab('football')
                  }}
                >
                  <VStack color={'colors.primaryDefault'} alignItems={'center'} gap={`4px`}>
                    <IconFootball color="currentColor" size="16" />
                    <Text className="Body">{t('football')}</Text>
                    {tab === 'football' && (
                      <Box
                        position={'absolute'}
                        w={`calc(100% - 16px)`}
                        h={`4px`}
                        bottom={0}
                        bg={'colors.primaryDefault'}
                        borderRadius={`2px 2px 0 0`}
                      />
                    )}
                  </VStack>
                </Button>
                <Button
                  h={`100%`}
                  w={`100%`}
                  position={`relative`}
                  onClick={() => {
                    setTab('basketball')
                  }}
                >
                  <VStack color={'colors.primaryDefault'} alignItems={'center'} gap={`4px`}>
                    <IconBasketball color="currentColor" size="16" />
                    <Text className="Body">{t('basketball')}</Text>
                    {tab === 'basketball' && (
                      <Box
                        position={'absolute'}
                        w={`calc(100% - 16px)`}
                        h={`4px`}
                        bottom={0}
                        bg={'colors.primaryDefault'}
                        borderRadius={`2px 2px 0 0`}
                      />
                    )}
                  </VStack>
                </Button>
                <Button
                  h={`100%`}
                  w={`100%`}
                  position={`relative`}
                  onClick={() => {
                    setTab('american-football')
                  }}
                >
                  <VStack color={'colors.primaryDefault'} alignItems={'center'} gap={`4px`}>
                    <IconAmericanFootball color="currentColor" size="16" />
                    <Text className="Body">{t('amFootball')}</Text>
                    {tab === 'american-football' && (
                      <Box
                        position={'absolute'}
                        w={`calc(100% - 16px)`}
                        h={`4px`}
                        bottom={0}
                        bg={'colors.primaryDefault'}
                        borderRadius={`2px 2px 0 0`}
                      />
                    )}
                  </VStack>
                </Button>
              </HStack>
            </VStack>
            <VStack
              h={`fit-content`}
              w={`100%`}
              bg={'colors.surface1'}
              boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
              borderRadius={[`0px`, `0 0 16px 16px`]}
              py={`32px`}
              px={`12px`}
              gap={`16px`}
            >
              {tournaments?.map(tournament => (
                <Link
                  href={`/tournament/${tournament.id}`}
                  key={tournament.id}
                  color={'colors.onSurfaceLv1'}
                  className="Headline-3"
                >
                  <HStack gap={`16px`} alignItems={'center'}>
                    <Image src={getTournamentImageLink(tournament.id)} h={`40px`} aspectRatio={1} ml={`10%`} />
                    <Text>{tournament.name}</Text>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </Box>

          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
