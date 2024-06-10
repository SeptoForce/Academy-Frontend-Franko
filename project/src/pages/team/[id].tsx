import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import EventDetailsSection from '@/components/sections/EventDetailsSection'
import { HStack, VStack, Box, Flex, Image, Text, Spacer, Link } from '@kuma-ui/core'
import HeaderEventBreadcrumbs from '@/components/navigation/HeaderEventBreadcrumbs'
import TournamentsSection from '@/components/sections/TournamentsSection'
import { GetServerSidePropsContext } from 'next'
import { useAppContext } from '@/context/AppContext'
import {
  fetchEventDetails,
  fetchEventsFromTeam,
  fetchPlayersFromTeam,
  fetchTournamentsFromTeam,
  getPlayerImageLink,
  getTeamImageLink,
  getTournamentImageLink,
} from '@/api/api'
import { Fragment, useEffect, useState } from 'react'
import Matches from '@/components/sections/Matches'
import { useRouter } from 'next/router'
import Standings from '@/components/sections/Standings'
import { EventMatch, Player, Team, Tournament } from '@/utils/types'
import { FlagComponent } from '@/components/FlagComponent'
import IconTeam from '@/components/svg/IconTeam'
import LeagueCell from '@/components/util/LeagueCell'
import EventCell from '@/components/util/EventCell'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${context.query.id}`)
  const currentTeam = (await response.json()) as Team

  const response2 = await fetch(`https://academy-backend.sofascore.dev/team/${context.query.id}/tournaments`)
  const tournaments = await response2.json()

  return {
    props: {
      currentTeam: currentTeam,
      tournaments: tournaments,
    },
  }
}

export default function TeamPage(props: { currentTeam: Team; tournaments: Tournament[] }) {
  const router = useRouter()
  const appContext = useAppContext()
  const [tab, setTab] = useState<'details' | 'matches' | 'standings' | 'squad'>('details')
  const [event, setEvent] = useState<EventMatch>()

  useEffect(() => {
    if (router.query.e) {
      fetchEventDetails(Number(router.query.e))
        .then(data => setEvent(data))
        .catch(error => console.error(error))
    } else {
      setEvent(undefined)
    }
  }, [router.query])

  function renderTab(tab: 'details' | 'matches' | 'standings' | 'squad') {
    switch (tab) {
      case 'details':
        return (
          <VStack w={`100%`} gap={[`1px`, `12px`]}>
            <Flex flex={`1 1 0`} justifyContent={'center'} flexDir={[`column`, `row`]} gap={[`1px`, `24px`]}>
              <TeamInfoBox team={props.currentTeam} />
              <TeamTournamentsBox team={props.currentTeam} />
            </Flex>
            <Flex flex={`1 1 0`} justifyContent={'center'} flexDir={[`column`, `row`]} gap={[`1px`, `24px`]}>
              <TeamVenueBox team={props.currentTeam} />
              <TeamNextMatchBox team={props.currentTeam} />
            </Flex>
          </VStack>
        )
      case 'matches':
        return (
          <HStack w={`100%`} gap={`24px`} mt={`12px`}>
            <Flex flex={`1 1 0`} justifyContent={'center'}>
              <Matches objectId={props.currentTeam.id} objectType="team" />
            </Flex>
            <Box flex={`1 1 0`} display={[`none`, `none`, `flex`]}>
              {event && <EventDetailsSection event={event} />}
            </Box>
          </HStack>
        )
      case 'standings':
        return (
          <HStack w={`100%`} gap={`24px`}>
            <Flex flex={`1 1 0`} justifyContent={'center'}>
              <Standings objectId={props.currentTeam.id} objectType="team" />
            </Flex>
          </HStack>
        )
      case 'squad':
        return (
          <HStack w={`100%`} gap={`24px`}>
            <Flex flex={`1 1 0`} justifyContent={'center'}>
              <TeamSquadSection team={props.currentTeam} />
            </Flex>
          </HStack>
        )
    }
  }

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
            <HeaderEventBreadcrumbs team={props.currentTeam} />
          </Box>
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} flexDir={'column'} flex={`1 1 0`}>
            <TournamentsSection tournaments={props.tournaments} />
          </Box>

          <VStack flexDir={'column'} flex={`2 1 0`} gap={[`0px`, `12px`]}>
            <TeamHeader team={props.currentTeam} tab={tab} setTab={setTab} />
            {renderTab(tab)}
          </VStack>
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}

function TeamHeader(props: {
  team?: Team
  tab: 'details' | 'matches' | 'standings' | 'squad'
  setTab: (tab: 'details' | 'matches' | 'standings' | 'squad') => void
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
      px={`16px`}
    >
      <Box display={['flex', 'none']}>
        <HeaderEventBreadcrumbs team={props.team} />
      </Box>
      <Flex h={`100%`} alignItems={'center'} flexGrow={0} gap={[`16px`, `24px`]}>
        <Flex
          aspectRatio={1}
          h={[`56px`, `80px`]}
          borderRadius={`4px`}
          border={`solid 1px var(--on-surface-on-surface-lv-3)`}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image h={[`40px`, `57px`]} aspectRatio={1} src={getTeamImageLink(Number(props.team?.id))} />
        </Flex>
        <VStack>
          <Text className={appContext.isMobile ? `Headline-1` : `Headline-1-Desktop`}>{props.team?.name}</Text>
          <HStack gap={`4px`} alignItems={'center'}>
            <FlagComponent countryName={props.team?.country.name || ''} />
            <Text className="Headline-3">{props.team?.country.name}</Text>
          </HStack>
        </VStack>
      </Flex>
      <Flex h={`48px`} flexShrink={0}>
        <NavigationButton text={`Details`} active={props.tab === 'details'} onClick={() => props.setTab(`details`)} />
        <NavigationButton text={`Matches`} active={props.tab === 'matches'} onClick={() => props.setTab(`matches`)} />
        <NavigationButton
          text={`Standings`}
          active={props.tab === 'standings'}
          onClick={() => props.setTab(`standings`)}
        />
        <NavigationButton text={`Squad`} active={props.tab === 'squad'} onClick={() => props.setTab(`squad`)} />
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
        <Box
          position={`absolute`}
          bottom={`0`}
          w={`calc(100% - 24px)`}
          borderRadius={`2px 2px 0 0`}
          h={`4px`}
          bg={`colors.primaryDefault`}
        />
      )}
    </Flex>
  )
}

// ? ADD PIE CHART FOR FOREIGN PLAYERS WITH D3 LIBRARY
function TeamInfoBox(props: { team?: Team }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [numberOfForeignPlayers, setNumberOfForeignPlayers] = useState<number>(0)
  const team = props.team

  useEffect(() => {
    if (team) {
      fetchPlayersFromTeam(team.id)
        .then(data => setPlayers(data))
        .catch(error => console.error(error))
    }
  }, [team])

  useEffect(() => {
    if (players) {
      setNumberOfForeignPlayers(players.filter(player => player.country.name !== team?.country.name).length)
    }
  }, [players])

  if (team === undefined || team === null) {
    return <></>
  }
  return (
    <VStack
      h={[`min-content`, `256px`]}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={[`0px`, `16px`]}
      p={`8px`}
      pb={`28px`}
    >
      <Flex h={`48px`} w={`100%`} justifyContent={'center'} alignItems={'center'}>
        <Text className="Headline-2">Team Info</Text>
      </Flex>
      <Flex h={`56px`} w={`100%`} alignItems={'center'} px={`16px`} gap={`16px`}>
        <Image
          h={`40px`}
          aspectRatio={1}
          borderRadius={9999}
          src={'https://www.sofascore.com/static/images/placeholders/player.svg'}
        />
        <Text>Coach: {team.managerName}</Text>
      </Flex>
      <Spacer h={`8px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
      <HStack h={`116px`}>
        <VStack gap={`8px`} justifyContent={'center'} alignItems={'center'} h={`100%`} w={`100%`}>
          <IconTeam color="var(--color-primary-default)" size="40px" />
          <Text color={`colors.primaryDefault`} className="Headline-3">
            {players.length}
          </Text>
          <Text color={`colors.onSurfaceLv2`} className="Micro">
            Team Size
          </Text>
        </VStack>
        <VStack gap={`8px`} justifyContent={'center'} alignItems={'center'} h={`100%`} w={`100%`}>
          <IconTeam color="var(--color-primary-default)" size="40px" />
          <Text color={`colors.primaryDefault`} className="Headline-3">
            {numberOfForeignPlayers}
          </Text>
          <Text color={`colors.onSurfaceLv2`} className="Micro">
            Foreign Players
          </Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

function TeamVenueBox(props: { team?: Team }) {
  const team = props.team

  if (team === undefined || team === null) {
    return <></>
  }
  return (
    <VStack
      h={`min-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={[`0px`, `16px`]}
      p={`8px`}
      pb={`16px`}
    >
      <Flex h={`48px`} w={`100%`} justifyContent={'center'} alignItems={'center'}>
        <Text className="Headline-2">Venue</Text>
      </Flex>
      <Flex h={`32px`} w={`100%`} justifyContent={`space-between`} alignItems={'center'} px={`16px`} gap={`16px`}>
        <Text>Stadium</Text>
        <Text>{team.venue}</Text>
      </Flex>
    </VStack>
  )
}

function TeamTournamentsBox(props: { team?: Team }) {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const team = props.team

  useEffect(() => {
    if (team) {
      fetchTournamentsFromTeam(team.id)
        .then(data => setTournaments(data))
        .catch(error => console.error(error))
    }
  }, [team])

  if (team === undefined || team === null) {
    return <></>
  }
  return (
    <VStack
      h={`256px`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={[`0px`, `16px`]}
      p={`8px`}
      pb={`16px`}
    >
      <Flex h={`48px`} w={`100%`} justifyContent={'center'} alignItems={'center'}>
        <Text className="Headline-2">Tournaments</Text>
      </Flex>
      <Flex h={`min-content`} w={`100%`} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
        {tournaments.map((tournament, index) => (
          <Link
            key={index}
            h={`96px`}
            w={`33%`}
            href={`/tournament/${tournament.id}
          `}
          >
            <VStack h={`100%`} w={`100%`} justifyContent={'center'} alignItems={'center'} gap={`4px`}>
              <Image h={`40px`} aspectRatio={1} src={getTournamentImageLink(tournament.id)} />
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                h={`32px`}
                className="Micro"
                color={'colors.onSurfaceLv2'}
              >
                <Text>{tournament.name}</Text>
              </Flex>
            </VStack>
          </Link>
        ))}
      </Flex>
    </VStack>
  )
}

function TeamNextMatchBox(props: { team?: Team }) {
  const [event, setEvent] = useState<EventMatch | undefined>()
  const [tournament, setTournament] = useState<Tournament | undefined>()
  const team = props.team

  useEffect(() => {
    if (team) {
      fetchTournamentsFromTeam(team.id)
        .then(data => setTournament(data[0]))
        .catch(error => console.error(error))

      fetchEventsFromTeam(team.id, 'next', 0)
        .then(data => setEvent(data[0]))
        .catch(error => console.error(error))
    }
  }, [team])

  if (team === undefined || team === null) {
    return <></>
  }
  return (
    <VStack
      h={`min-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={[`0px`, `16px`]}
      p={`8px`}
      pb={`16px`}
    >
      <Flex h={`48px`} w={`100%`} justifyContent={'center'} alignItems={'center'}>
        <Text className="Headline-2">Next Match</Text>
      </Flex>
      {tournament && event && (
        <>
          <LeagueCell tournament={tournament} />
          <EventCell event={event} directLink />
        </>
      )}
    </VStack>
  )
}

function TeamSquadSection(props: { team?: Team }) {
  const [players, setPlayers] = useState<Player[]>([])
  const team = props.team

  useEffect(() => {
    if (team) {
      fetchPlayersFromTeam(team.id)
        .then(data => setPlayers(data))
        .catch(error => console.error(error))
    }
  }, [team])

  return (
    <VStack
      h={`min-content`}
      w={`100%`}
      bg={'colors.surface1'}
      boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
      borderRadius={`16px`}
      pb={`16px`}
    >
      <Flex h={`48px`} alignItems={'flex-end'} px={`16px`} pb={`8px`}>
        <Text className="Assistive">Coach</Text>
      </Flex>
      <HStack h={`56px`} w={`100%`} gap={`16px`} p={`8px`} px={`16px`}>
        <Image
          h={`40px`}
          aspectRatio={1}
          borderRadius={9999}
          src={'https://www.sofascore.com/static/images/placeholders/player.svg'}
        />
        <VStack gap={`4px`} justifyContent={'center'}>
          <Text>{team?.managerName}</Text>
        </VStack>
      </HStack>
      <Spacer h={`8px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
      <Flex h={`48px`} alignItems={'flex-end'} px={`16px`} pb={`8px`}>
        <Text className="Assistive">Players</Text>
      </Flex>
      {players.map((player, index) => (
        <Fragment key={index}>
          <PlayerCell player={player} />
          {index < players.length - 1 && (
            <Spacer h={`8px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
          )}
        </Fragment>
      ))}
    </VStack>
  )
}

function PlayerCell(props: { player: Player }) {
  function handleImageError(event: any) {
    event.target.src = 'https://www.sofascore.com/static/images/placeholders/player.svg'
  }

  return (
    <Link h={`56px`} w={`100%`} href={`/player/${props.player.id}`}>
      <HStack h={`100%`} w={`100%`} gap={`16px`} p={`8px`} px={`16px`}>
        <Image
          h={`40px`}
          aspectRatio={1}
          borderRadius={9999}
          src={getPlayerImageLink(props.player.id)}
          onError={handleImageError}
        />
        <VStack gap={`4px`} justifyContent={'center'}>
          <Text>{props.player.name}</Text>
          <HStack gap={`4px`} alignItems={'center'}>
            <FlagComponent countryName={props.player.country.name} />
            <Text className="Assistive" color={`colors.onSurfaceLv2`}>
              {props.player.country.name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  )
}
