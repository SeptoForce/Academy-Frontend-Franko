import { Box, Button, Text, VStack } from '@kuma-ui/core'
import IconChevronLeft from '../svg/IconChevronLeft'
import IconChevronRight from '../svg/IconChevronRight'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function Calendar(props: { mobile?: boolean }) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(router.query.d as string)

  useEffect(() => {
    if (router.query.d) {
      setSelectedDate(router.query.d as string)
    } else {
      setSelectedDate(new Date().toISOString().split('T')[0])
    }
  }, [router.query])

  const NUMBER_OF_SHOWN_DATES = 9

  function goToDate(date: Date) {
    const ISODate = date.toISOString().split('T')[0]
    router.push({ query: { ...router.query, d: ISODate } })
  }

  return (
    <Box
      h={`48px`}
      w={`100%`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`colors.primaryVariant`}
      position={`relative`}
      display={props.mobile ? [`flex`, `none`] : [`none`, `flex`]}
      overflow={`hidden`}
      flexShrink={0}
    >
      <Box
        w={`100%`}
        h={`100%`}
        position={`absolute`}
        bg={`linear-gradient(90deg, var(--color-primary-variant) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, var(--color-primary-variant) 100%)`}
        style={{ pointerEvents: 'none' }}
      />
      <Button
        position={'absolute'}
        w={`32px`}
        aspectRatio={1}
        bg={`colors.surface1`}
        borderRadius={`2px`}
        left={`8px`}
        onClick={() => {
          goToDate(new Date(Date.parse(selectedDate as string) - 60 * 60 * 24 * 1000))
        }}
      >
        <IconChevronLeft color="var(--on-surface-on-surface-lv-2)" />
      </Button>
      <Button
        position={'absolute'}
        w={`32px`}
        aspectRatio={1}
        bg={`colors.surface1`}
        borderRadius={`2px`}
        right={`8px`}
        onClick={() => {
          goToDate(new Date(Date.parse(selectedDate as string) + 60 * 60 * 24 * 1000))
        }}
      >
        <IconChevronRight color="var(--on-surface-on-surface-lv-2)" />
      </Button>
      {Array.from({ length: NUMBER_OF_SHOWN_DATES }, (_, i) => {
        const date: Date = new Date(selectedDate || new Date().toISOString().split('T')[0])
        date.setDate(date.getDate() + i - Math.floor(NUMBER_OF_SHOWN_DATES / 2))
        const active = date.toISOString().split('T')[0] === selectedDate
        return <CalendarUnit key={i} date={date} active={active} />
      })}
    </Box>
  )
}

export default Calendar

function CalendarUnit(props: { date: Date; active?: boolean }) {
  const router = useRouter()

  function goToDate(date: Date) {
    return () => {
      const ISODate = date.toISOString().split('T')[0]
      router.push({ query: { ...router.query, d: ISODate } })
    }
  }

  return (
    <VStack
      w={`56px`}
      h={`100%`}
      pt={`8px`}
      justifyContent={`flex-start`}
      alignItems={`center`}
      cursor={`pointer`}
      className="Micro"
      color={`colors.surface0`}
      flexShrink={0}
      userSelect={`none`}
      onClick={goToDate(props.date)}
    >
      <Text>
        {props.date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
          ? 'TODAY'
          : props.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
      </Text>
      <Text>{props.date.toLocaleDateString('hr-HR', { day: 'numeric', month: 'numeric' }).replace('. ', '.')}</Text>
      {props.active ? (
        <Box
          w={`48px`}
          h={`4px`}
          position={'absolute'}
          bottom={0}
          bg={`colors.surface1`}
          borderRadius={`2px 2px 0 0`}
        />
      ) : null}
    </VStack>
  )
}
