import { Box, Button, Text, VStack } from '@kuma-ui/core'
import IconChevronLeft from '../svg/IconChevronLeft'
import IconChevronRight from '../svg/IconChevronRight'

export function Calendar(props: { mobile?: boolean }) {
  return (
    <Box
      h={`48px`}
      w={`100%`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`colors.primaryVariant`}
      position={`relative`}
      display={props.mobile ? [`flex`, `none`] : [`none`, `flex`]}
    >
      <Box
        w={`100%`}
        h={`100%`}
        position={`absolute`}
        bg={`linear-gradient(90deg, #1327baff 5%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, #1327baff 95%)`}
      />
      <Button position={'absolute'} w={`32px`} aspectRatio={1} bg={`#fff`} borderRadius={`2px`} left={`8px`}>
        <IconChevronLeft color="#000" />
      </Button>
      <Button position={'absolute'} w={`32px`} aspectRatio={1} bg={`#fff`} borderRadius={`2px`} right={`8px`}>
        <IconChevronRight color="#000" />
      </Button>
      <CalendarUnit text={`MON`} date={`31.12.`} />
      <CalendarUnit text={`TUE`} date={`01.01.`} />
      <CalendarUnit text={`WED`} date={`02.01.`} />
      <CalendarUnit text={`THU`} date={`03.01.`} />
      <CalendarUnit text={`FRI`} date={`04.01.`} />
      <CalendarUnit text={`SAT`} date={`05.01.`} />
      <CalendarUnit text={`SUN`} date={`06.01.`} />
      <CalendarUnit text={`MON`} date={`07.01.`} active />
      <CalendarUnit text={`TUE`} date={`08.01.`} />
      <CalendarUnit text={`WED`} date={`09.01.`} />
      <CalendarUnit text={`THU`} date={`10.01.`} />
      <CalendarUnit text={`FRI`} date={`11.01.`} />
      <CalendarUnit text={`SAT`} date={`12.01.`} />
      <CalendarUnit text={`SUN`} date={`13.01.`} />
      <CalendarUnit text={`MON`} date={`14.01.`} />
    </Box>
  )
}

export default Calendar

function CalendarUnit(props: { text: string; date: string; active?: boolean }) {
  return (
    <VStack
      w={`56px`}
      h={`100%`}
      pt={`8px`}
      justifyContent={`flex-start`}
      alignItems={`center`}
      cursor={`pointer`}
      className="Micro"
      color={`#fff`}
      flexShrink={0}
    >
      <Text>{props.text}</Text>
      <Text>{props.date}</Text>
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
