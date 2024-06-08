import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import { HStack, VStack, Box, Flex, Image, Text, Link } from '@kuma-ui/core'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { GetServerSidePropsContext } from 'next'
import { useAppContext } from '@/context/AppContext'
import { fetchEventDetails, getPlayerImageLink, getTeamImageLink, getTournamentImageLink } from '@/api/api'
import { useEffect, useState } from 'react'
import Matches from '@/components/sections/Matches'
import { useRouter } from 'next/router'
import { Event, Player, Positions, Tournament } from '@/utils/types'
import { FlagComponent } from '@/components/FlagComponent'
import { format } from 'date-fns'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${context.query.id}`)
  const currentPlayer = await response.json()

  const response2 = await fetch(`https://academy-backend.sofascore.dev/sport/${currentPlayer.sport.slug}/tournaments`)
  const tournaments = await response2.json()

  return {
    props: {
      currentPlayer: currentPlayer,
      tournaments,
    },
  }
}

export default function PlayerPage(props: { currentPlayer: Player; tournaments: Tournament[] }) {
  const router = useRouter()
  const appContext = useAppContext()
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
        position={`relative`}
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
            <HeaderEventBreadcrumbs player={props.currentPlayer} />
          </Box>
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} flexDir={'column'} flex={`1 1 0`}>
            <TournamentsSection tournaments={props.tournaments} />
          </Box>

          <VStack flexDir={'column'} flex={`2 1 0`} gap={`12px`}>
            <PlayerHeader player={props.currentPlayer} />
            <HStack w={`100%`} gap={`24px`}>
              <Flex flex={`1 1 0`} justifyContent={'center'}>
                <Matches objectId={props.currentPlayer.id} objectType="player" />
              </Flex>
              <Box flex={`1 1 0`} display={[`none`, `none`, `flex`]}>
                {event && <EventDetailsSection event={event} />}
              </Box>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}

function PlayerHeader(props: { player?: Player }) {
  const appContext = useAppContext()

  const date = props.player?.dateOfBirth ? new Date(props.player?.dateOfBirth) : undefined

  return (
    <Box
      w={`100%`}
      bg={`colors.surface1`}
      borderRadius={[`0`, `16px`]}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      display={`flex`}
      flexDir={`column`}
    >
      <VStack
        h={'min-content'}
        w={`100%`}
        position={[`sticky`, `unset`]}
        bg={'colors.surface1'}
        top={[`48px`, `0`]}
        boxShadow={[`0 2px 16px 0 rgba(0, 0, 0, 0.12)`, `unset`]}
      >
        <Box display={['flex', 'none']}>
          <HeaderEventBreadcrumbs player={props.player} />
        </Box>
        <Flex h={[`64px`, `112px`]} alignItems={'center'} px={`16px`} flexGrow={0} gap={[`16px`, `24px`]}>
          <Flex
            aspectRatio={1}
            h={[`56px`, `80px`]}
            borderRadius={`4px`}
            border={`solid 1px var(--on-surface-on-surface-lv-3)`}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Image h={[`40px`, `57px`]} aspectRatio={1} src={getPlayerImageLink(Number(props.player?.id))} />
          </Flex>
          <VStack>
            <Text className={appContext.isMobile ? `Headline-1` : `Headline-1-Desktop`}>{props.player?.name}</Text>
          </VStack>
        </Flex>
      </VStack>
      <Link href={`/team/${props.player?.team.id}`} color={'colors.onSurfaceLv1'}>
        <HStack h={`56px`} w={`100%`} alignItems={'center'} px={`16px`} gap={`16px`}>
          <Image src={getTeamImageLink(Number(props.player?.team.id))} h={`40px`} aspectRatio={1} />
          <Text className="Headline-3">{props.player?.team.name}</Text>
        </HStack>
      </Link>
      <HStack h={[`70px`, `88px`]} w={`100%`} pt={`4px`} px={[`8px`, `16px`]} gap={[`8px`, `16px`]}>
        <Flex
          bg={`colors.secondaryDefault`}
          w={`100%`}
          h={`56px`}
          borderRadius={`4px`}
          mx={[`0`, `10px`]}
          justifyContent={'center'}
          alignItems={'center'}
          flexFlow={'column'}
          gap={`4px`}
        >
          <Text color={'colors.onSurfaceLv2'} className="Assistive">
            Nationality
          </Text>
          <HStack gap={`4px`}>
            <FlagComponent countryName={props.player?.country.name || ''} />
            <Text className="Headline-3">{props.player?.country.name}</Text>
          </HStack>
        </Flex>
        <Flex
          bg={`colors.secondaryDefault`}
          w={`100%`}
          h={`56px`}
          borderRadius={`4px`}
          mx={[`0`, `10px`]}
          justifyContent={'center'}
          alignItems={'center'}
          flexFlow={'column'}
          gap={`4px`}
        >
          <Text color={'colors.onSurfaceLv2'} className="Assistive">
            Position
          </Text>
          <Text className="Headline-3">{Positions[props.player?.position as keyof typeof Positions] || 'Unknown'}</Text>
        </Flex>
        {date && (
          <Flex
            bg={`colors.secondaryDefault`}
            w={`100%`}
            h={`56px`}
            borderRadius={`4px`}
            mx={[`0`, `10px`]}
            justifyContent={'center'}
            alignItems={'center'}
            flexFlow={'column'}
            gap={`4px`}
          >
            <Text color={'colors.onSurfaceLv2'} className="Assistive">
              {format(date, 'dd.MM.yyyy')}
            </Text>
            <Text className="Headline-3">{`${new Date().getFullYear() - date.getFullYear()} Yrs`}</Text>
          </Flex>
        )}
      </HStack>
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
