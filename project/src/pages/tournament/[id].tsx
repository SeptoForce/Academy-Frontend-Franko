import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import { HStack, VStack, Box, Flex, Image, Text } from '@kuma-ui/core'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import { Event, Tournament } from '@/utils/types'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { GetServerSidePropsContext } from 'next'
import { useAppContext } from '@/context/AppContext'
import { fetchEventDetails, getTournamentImageLink } from '@/api/api'
import { useEffect, useState } from 'react'
import Matches from '@/components/sections/Matches'
import { useRouter } from 'next/router'
import Standings from '@/components/sections/Standings'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${context.query.id}`)
  const currentTournament = await response.json()
  console.log(currentTournament)

  const response2 = await fetch(
    `https://academy-backend.sofascore.dev/sport/${currentTournament.sport.slug}/tournaments`
  )
  const tournaments = await response2.json()
  console.log(tournaments)

  return {
    props: {
      currentTournament,
      tournaments,
    },
  }
}

export default function TournamentPage(props: { currentTournament: Tournament; tournaments: Tournament[] }) {
  const router = useRouter()
  const appContext = useAppContext()
  const [tab, setTab] = useState<'matches' | 'standings'>('matches')
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    if (router.query.e) {
      fetchEventDetails(Number(router.query.e))
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    } else {
      setEvent(undefined)
    }
  }, [router.query])

  return (
    <>
      <Header noCalendar noNavigation={appContext.isMobile} />
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
        >
          <Box display={['none', 'flex']}>
            <HeaderEventBreadcrumbs tournament={props.currentTournament} />
          </Box>
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} flexDir={'column'} flex={`1 1 0`}>
            <TournamentsSection tournaments={props.tournaments} />
          </Box>

          <VStack flexDir={'column'} flex={`2 1 0`} gap={`12px`}>
            <TournamentHeader tournament={props.currentTournament} tab={tab} setTab={setTab} />
            {tab === `matches` ? (
              <HStack w={`100%`} gap={`24px`}>
                <Flex flex={`1 1 0`} justifyContent={'center'}>
                  <Matches objectId={props.currentTournament.id} objectType="tournament" />
                </Flex>
                <Box flex={`1 1 0`} display={[`none`, `none`, `flex`]}>
                  {event && <EventDetailsSection event={event} />}
                </Box>
              </HStack>
            ) : (
              <HStack w={`100%`} gap={`24px`}>
                <Flex flex={`1 1 0`} justifyContent={'center'}>
                  <Standings objectId={props.currentTournament.id} objectType="tournament" />
                </Flex>
              </HStack>
            )}
          </VStack>
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}

function TournamentHeader(props: {
  tournament?: Tournament
  tab: 'matches' | 'standings'
  setTab: (tab: 'matches' | 'standings') => void
}) {
  const appContext = useAppContext()

  return (
    <Box
      w={`100%`}
      h={`160px`}
      bg={`colors.surface1`}
      borderRadius={[`0`, `16px`]}
      overflow={`hidden`}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      position={[`sticky`, `unset`]}
      top={`0`}
      display={`flex`}
      flexDir={`column`}
    >
      <Box display={['flex', 'none']}>
        <HeaderEventBreadcrumbs tournament={props.tournament} />
      </Box>
      <Flex h={`100%`} alignItems={'center'} px={`16px`} flexGrow={0} gap={[`16px`, `24px`]}>
        <Flex
          aspectRatio={1}
          h={[`56px`, `80px`]}
          borderRadius={`4px`}
          border={`solid 1px var(--on-surface-on-surface-lv-3)`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image h={[`40px`, `57px`]} aspectRatio={1} src={getTournamentImageLink(Number(props.tournament?.id))} />
        </Flex>
        <VStack>
          <Text className={appContext.isMobile ? `Headline-1` : `Headline-1-Desktop`}>{props.tournament?.name}</Text>
          <HStack gap={`4px`} alignItems={'center'}>
            <Box h={`16px`} aspectRatio={1} bg={'black'} borderRadius={999} />
            <Text className="Headline-3">{props.tournament?.country.name}</Text>
          </HStack>
        </VStack>
      </Flex>
      <Flex h={`48px`} flexShrink={0}>
        <NavigationButton text={`Matches`} active={props.tab === 'matches'} onClick={() => props.setTab(`matches`)} />
        <NavigationButton
          text={`Standings`}
          active={props.tab === 'standings'}
          onClick={() => props.setTab(`standings`)}
        />
      </Flex>
    </Box>
  )
}

function NavigationButton(props: { text: string; active?: boolean; onClick: () => void }) {
  return (
    <Flex
      w={[`100%`, `auto`]}
      px={`12px`}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
      color={props.active ? `var(--color-primary-default)` : `var(--on-surface-on-surface-lv-2)`}
      onClick={props.onClick}
      userSelect={`none`}
      cursor={`pointer`}
    >
      {props.text}
      {props.active && (
        <Box position={`absolute`} bottom={`0`} w={`calc(100% - 24px)`} h={`4px`} bg={`colors.primaryDefault`} />
      )}
    </Flex>
  )
}
