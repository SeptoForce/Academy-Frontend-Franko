import { getTeamImageLink } from '@/api/api'
import { useAppContext } from '@/context/AppContext'
import { EventMatch, EventStatus } from '@/utils/types'
import { HStack, Image, Spacer, Text, VStack } from '@kuma-ui/core'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

export function EventCell(props: { event: EventMatch; directLink?: boolean }) {
  const appContext = useAppContext()
  const router = useRouter()

  const winnerCode = props.event.winnerCode

  const openEvent = (id: number) => () => {
    if (appContext.isMobile || props.directLink) {
      router.push(`/event/${id}`)
    } else {
      router.push({ query: { ...router.query, e: id } }, undefined, { shallow: true })
    }
  }

  const currentDateTime = new Date()
  const startDateTime = new Date(props.event.startDate)
  const minutesPassed = Math.floor((currentDateTime.getTime() - startDateTime.getTime()) / 60000)

  return (
    <HStack
      h={`56px`}
      w={`100%`}
      alignItems={'center'}
      py={`8px`}
      _hover={{ bg: 'colors.primaryHighlight', cursor: 'pointer' }}
      bg={props.event.id === Number(router.query.e) ? `colors.primaryHighlight` : `transparent`}
      onClick={openEvent(props.event.id)}
    >
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
        <Text>{`${format(props.event.startDate, appContext.timeFormat)}`}</Text>
        <Text color={props.event.status === EventStatus.LIVE ? `var(--specific-live)` : ``}>
          {props.event.status === EventStatus.FINISHED ? `FT` : ``}
          {props.event.status === EventStatus.LIVE ? `${minutesPassed}'` : ``}
          {props.event.status === EventStatus.UPCOMING ? `-` : ``}
        </Text>
      </VStack>
      <VStack h={`100%`} w={`100%`} px={`16px`} justifyContent={'center'} gap={`4px`}>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image
            src={getTeamImageLink(props.event.homeTeam.id)}
            alt="League image"
            w={`16px`}
            aspectRatio={1}
            flexShrink={0}
            loading="lazy"
          />
          <Text
            className="Body-1"
            color={
              props.event.status === EventStatus.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.event.status === EventStatus.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winnerCode === 'home' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.homeTeam.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.event.status === EventStatus.LIVE
                ? `var(--specific-live)`
                : `${winnerCode === 'home' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.status === EventStatus.UPCOMING ? `` : `${props.event.homeScore.total}`}
          </Text>
        </HStack>
        <HStack alignItems={'center'} gap={`8px`} className="Body">
          <Image
            src={getTeamImageLink(props.event.awayTeam.id)}
            alt="League image"
            w={`16px`}
            aspectRatio={1}
            flexShrink={0}
            loading="lazy"
          />
          <Text
            className="Body-1"
            color={
              props.event.status === EventStatus.UPCOMING
                ? `var(--on-surface-on-surface-lv-1)`
                : props.event.status === EventStatus.LIVE
                ? `var(--on-surface-on-surface-lv-1)`
                : `${winnerCode === 'away' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.awayTeam.name}
          </Text>
          <Spacer w={`100%`}></Spacer>
          <Text
            color={
              props.event.status === EventStatus.LIVE
                ? `var(--specific-live)`
                : `${winnerCode === 'away' ? `var(--on-surface-on-surface-lv-1)` : `var(--on-surface-on-surface-lv-2)`}`
            }
            flexShrink={0}
          >
            {props.event.status === EventStatus.UPCOMING ? `` : `${props.event.awayScore.total}`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default EventCell
