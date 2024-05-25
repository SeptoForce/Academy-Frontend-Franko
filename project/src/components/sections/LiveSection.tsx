import { Box, Flex, HStack, Image, Spacer, Text, VStack } from '@kuma-ui/core'
import Calendar from '../navigation/Calendar'
import IconPointerRight from '../svg/IconPointerRight'
import { getEventsFromSportAndDate, getLeagueImageLink, getTeamDetails, getTeamImageLink } from '@/api/api'
import { useRouter } from 'next/router'
import { EventType } from '@/utils/types'
import { getTournamentDetails } from '../../api/api'

export function LiveSection() {
  const router = useRouter()
  const slug = router.query.slug as string
  const date = router.query.d as string
  const events: EventType[] | undefined = getEventsFromSportAndDate(slug, date).data

  const groupedEventsByTournament = events?.reduce((acc, event) => {
    if (!acc[event.tournament.id]) {
      acc[event.tournament.id] = []
    }
    acc[event.tournament.id].push(event)
    return acc
  }, {} as { [key: number]: EventType[] })

  return (
    <VStack w={[`100%`, `448px`]} alignItems={'center'} flexBasis={'auto'}>
      <ListSectionSecondary mobile />
      <VStack
        w={[`100%`, `448px`]}
        maxW={`100%`}
        borderRadius={[`16px`, `8px 8px 16px 16px`]}
        bg={`colors.surface1`}
        boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
        overflow={`hidden`}
      >
        <Calendar />
        <ListSectionSecondary numberOfEvents={events?.length} />
        {groupedEventsByTournament &&
          Object.keys(groupedEventsByTournament || {}).map(tournamentId => (
            <LeagueEvents
              key={tournamentId}
              tournamentId={parseInt(tournamentId)}
              events={groupedEventsByTournament[parseInt(tournamentId)]}
            />
          ))}
      </VStack>
    </VStack>
  )
}

function ListSectionSecondary(props: { mobile?: boolean; numberOfEvents?: number }) {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]
  let date = router.query.d || today
  const locale = typeof window !== 'undefined' ? navigator.language : 'hr-HR'
  date = date === today ? 'Today' : new Date(date as string).toLocaleDateString(locale)

  return (
    <Box
      w={`100%`}
      h={`48px`}
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      p={`8px 16px`}
      className="Assistive"
      display={[props.mobile ? `flex` : `none`, props.mobile ? `none` : `flex`]}
    >
      <Text color={'colors.onSurfaceLv1'}>{date}</Text>
      <Text color={`colors.onSurfaceLv2`}>{props.numberOfEvents} Events</Text>
    </Box>
  )
}

function LeagueCell(props: { tournamentId: number }) {
  return (
    <Flex h={`56px`} w={`100%`} px={`16px`} alignItems={'center'} gap={`32px`}>
      <Image
        src={getLeagueImageLink(props.tournamentId)}
        alt="League image"
        h={`32px`}
        aspectRatio={1}
        flexShrink={0}
      />
      <HStack h={`100%`} alignItems={'center'}>
        <Text className="Headline-3" color={`colors.onSurfaceLv1`}>
          {getTournamentDetails(props.tournamentId).data?.country.name}
        </Text>
        <IconPointerRight color={`var(--on-surface-on-surface-lv-2)`} />
        <Text color={`colors.onSurfaceLv2`}>{getTournamentDetails(props.tournamentId).data?.name}</Text>
      </HStack>
    </Flex>
  )
}
enum EventState {
  LIVE = 'LIVE',
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED',
}
function EventCell(props: {
  state: EventState
  time: string
  team1Id: number
  team2Id: number
  scoreTeam1?: number
  scoreTeam2?: number
  currentMinute?: number
}) {
  const winningTeam =
    props.scoreTeam1 !== undefined && props.scoreTeam2 !== undefined
      ? props.scoreTeam1 !== props.scoreTeam2
        ? props.scoreTeam1 > props.scoreTeam2
          ? 1
          : 2
        : 0
      : 0

  return (
    <HStack h={`56px`} w={`100%`} alignItems={'center'} py={`8px`}>
      <VStack
        w={`64px`}
        h={`100%`}
        className="Micro"
        justifyContent={'center'}
        alignItems={'center'}
        gap={`4px`}
        flexShrink={0}
        borderEnd={`1px solid var(--on-surface-on-surface-lv-4)`}
        color={`colors.onSurfaceLv2`}
      >
        <Text>{props.time}</Text>
        <Text color={props.state === EventState.LIVE ? `var(--specific-live)` : ``}>
          {props.state === EventState.FINISHED ? `FT` : ``}
          {props.state === EventState.LIVE ? `${props.currentMinute}'` : ``}
          {props.state === EventState.UPCOMING ? `-` : ``}
        </Text>
      </VStack>
      <VStack h={`100%`} w={`100%`} px={`16px`} justifyContent={'center'} gap={`4px`}>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image src={getTeamImageLink(props.team1Id)} alt="League image" w={`16px`} aspectRatio={1} flexShrink={0} />
          <Text
            className="Body-1"
            color={
              props.state === EventState.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.state === EventState.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winningTeam === 1 ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {getTeamDetails(props.team1Id).data?.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.state === EventState.LIVE
                ? `var(--specific-live)`
                : `${winningTeam === 1 ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.state === EventState.UPCOMING ? `` : `${props.scoreTeam1}`}
          </Text>
        </HStack>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image src={getTeamImageLink(props.team2Id)} alt="League image" w={`16px`} aspectRatio={1} flexShrink={0} />
          <Text
            className="Body-1"
            color={
              props.state === EventState.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.state === EventState.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winningTeam === 2 ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {getTeamDetails(props.team2Id).data?.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.state === EventState.LIVE
                ? `var(--specific-live)`
                : `${winningTeam === 2 ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.state === EventState.UPCOMING ? `` : `${props.scoreTeam2}`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

function LeagueEvents(props: { tournamentId: number; events: Object[] }) {
  return (
    <>
      <LeagueCell tournamentId={props.tournamentId} />
      {props.events.map(event => {
        const parsedEvent = event as EventType

        const startingTime = new Date(parsedEvent.startDate).toISOString().split('T')[1].slice(0, 5)
        const eventState = parsedEvent.status === 'finished' ? EventState.FINISHED : EventState.UPCOMING

        return (
          <EventCell
            key={parsedEvent.id}
            team1Id={parsedEvent.homeTeam.id}
            team2Id={parsedEvent.awayTeam.id}
            state={eventState}
            time={startingTime}
            scoreTeam1={parsedEvent.homeScore.total}
            scoreTeam2={parsedEvent.awayScore.total}
          />
        )
      })}
      <Spacer h={`8px`} borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} />
    </>
  )
}

export default LiveSection
