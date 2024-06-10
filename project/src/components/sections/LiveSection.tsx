import { Box, Flex, Spacer, Text, VStack } from '@kuma-ui/core'
import Calendar from '../navigation/Calendar'
import { EventMatch } from '@/utils/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchEventsFromSportAndDate } from '@/api/api'
import { useAppContext } from '@/context/AppContext'
import { format } from 'date-fns'
import LeagueEvents from '../util/LeagueEvents'
import { useTranslation } from 'react-i18next'

export function LiveSection() {
  const { t } = useTranslation()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(router.query.d as string)
  const [events, setEvents] = useState<EventMatch[]>()

  useEffect(() => {
    let date = format(new Date(), 'yyyy-MM-dd')
    if (router.query.d) {
      date = router.query.d as string
    }
    setSelectedDate(date)
    fetchEventsFromSportAndDate(router.query.slug as string, date)
      .then(data => setEvents(data))
      .catch(error => console.error(error))
  }, [router.query])

  const slug = router.query.slug as string
  const dateToday = format(new Date(), 'yyyy-MM-dd')

  const groupedEventsByTournament = events?.reduce((acc: { [key: number]: EventMatch[] }, event: EventMatch) => {
    if (!acc[event.tournament.id]) {
      acc[event.tournament.id] = []
    }
    acc[event.tournament.id].push(event)
    return acc
  }, {} as { [key: number]: EventMatch[] })

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
        {events?.length === 0 && (
          <Flex
            h={`48px`}
            justifyContent={'center'}
            alignItems={'center'}
            borderTop={`1px solid var(--on-surface-on-surface-lv-4)`}
            mt={`5px`}
          >
            {t('noEventsForThisDay')}
          </Flex>
        )}
        <Spacer />
      </VStack>
    </VStack>
  )
}

function ListSectionSecondary(props: { mobile?: boolean; numberOfEvents?: number }) {
  const router = useRouter()
  const appContext = useAppContext()
  const [currentDate, setCurrentDate] = useState<string>(router.query.d as string)

  useEffect(() => {
    if (router.query.d) {
      setCurrentDate(router.query.d as string)
    } else {
      setCurrentDate(format(new Date(), 'yyyy-MM-dd'))
    }
  }, [router.query])

  const today = format(new Date(), 'yyyy-MM-dd')
  let date = currentDate || today
  date = date === today ? 'Today' : format(new Date(date as string), appContext.dateFormat)

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

export default LiveSection
