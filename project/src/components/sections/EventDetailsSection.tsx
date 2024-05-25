import { Box, Flex, Link, Spacer, Text, Button, VStack } from '@kuma-ui/core'
import IconClose from '../svg/IconClose'
import IconChevronRight from '../svg/IconChevronRight'
import IconCardRed from '../svg/IconCardRed'
import IconBallFootball from '../svg/IconBallFootball'
import IconCardYellow from '../svg/IconCardYellow'
import { useRouter } from 'next/router'

export function EventDetailsSection() {
  const router = useRouter()

  if (router.query.e === undefined) {
    return <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexDir={'column'}></Box>
  }

  return (
    <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexDir={'column'}>
      <Box w={`100%`} bg={`colors.surface1`} borderRadius={`16px`} overflow={'hidden'}>
        <Actions />
        <Hero />
        <Spacer borderBottom={`1px solid var(--on-surface-on-surface-lv-4)`} w={`100%`} />
        <IncidentSection />
      </Box>
    </Box>
  )
}

function IncidentSection() {
  return (
    <VStack w={`100%`} alignItems={'flex-end'} pb={`16px`} justifyContent={'space-between'}>
      <Flex w={`100%`} h={`40px`} p={`8px`}>
        <Flex
          w={`100%`}
          h={`100%`}
          borderRadius={`16px`}
          bg={'colors.secondaryHighlight'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Text color={'colors.specificLive'} className="Assistive">
            First Half (2 - 1)
          </Text>
        </Flex>
      </Flex>
      <IncidentCell type={IncidentType.RED_CARD} player={'Jonathan Livingstone'} argument={'Foul'} time={'36"'} />
      <IncidentCell type={IncidentType.GOAL} player={'Leonel Messi'} time={'21"'} flipped />
      <IncidentCell type={IncidentType.YELLOW_CARD} player={'John Smith'} argument={'Foul'} time={'17"'} flipped />
      <IncidentCell type={IncidentType.YELLOW_CARD} player={'Christiano Rolando'} argument={'Argument'} time={'17"'} />
    </VStack>
  )
}

enum IncidentType {
  GOAL = 'GOAL',
  YELLOW_CARD = 'YELLOW_CARD',
  RED_CARD = 'RED_CARD',
}
function IncidentCell(props: {
  flipped?: boolean
  type?: IncidentType
  player?: string
  argument?: string
  time?: string
}) {
  return (
    <Box
      display={'flex'}
      h={`56px`}
      w={`100%`}
      alignItems={'center'}
      py={`8px`}
      flexDir={props.flipped ? 'row-reverse' : 'row'}
    >
      <Box
        w={`55px`}
        h={`100%`}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        flexShrink={0}
        borderEnd={props.flipped ? 'none' : '1px solid var(--on-surface-on-surface-lv-4)'}
        borderStart={props.flipped ? '1px solid var(--on-surface-on-surface-lv-4)' : 'none'}
        color={'colors.onSurfaceLv2'}
      >
        {props.type === IncidentType.GOAL && <IconBallFootball size="24" />}
        {props.type === IncidentType.YELLOW_CARD && <IconCardYellow />}
        {props.type === IncidentType.RED_CARD && <IconCardRed />}
        <Text className="Micro">{props.time}</Text>
      </Box>
      <Box
        h={`100%`}
        alignItems={'center'}
        justifyContent={'center'}
        display={'flex'}
        flexDir={props.flipped ? 'row-reverse' : 'row'}
      >
        <Text
          className="Headline-1"
          flexShrink={0}
          w={`84px`}
          display={props.type === IncidentType.GOAL ? 'flex' : 'none'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          0 - 1
        </Text>
        <VStack
          h={`100%`}
          w={`100%`}
          mx={props.type === IncidentType.GOAL ? '0px' : '12px'}
          justifyContent={'center'}
          alignItems={props.flipped ? 'flex-end' : 'flex-start'}
        >
          <Text className="Body" color={`colors.onSurfaceLv1`} flexShrink={0}>
            {props.player}
          </Text>
          <Text className="Micro" color={`colors.onSurfaceLv2`} flexShrink={0}>
            {props.argument}
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

function Actions() {
  return (
    <Box
      display={[`none`, 'flex']}
      w={`100%`}
      h={`56px`}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={`16px`}
    >
      <Button>
        <IconClose color="var(--on-surface-on-surface-lv-1)" size="24" />
      </Button>
      <Link className="Action" display={'flex'}>
        <Text>View Full Page</Text>
        <IconChevronRight color="var(--color-primary-default)" />
      </Link>
    </Box>
  )
}

function Hero() {
  return (
    <Flex w={`100%`} h={`112px`} alignItems={'flex-end'} justifyContent={'space-between'} p={`16px`}>
      <HeroSectionUnit />
      <Score />
      <HeroSectionUnit />
    </Flex>
  )
}

function HeroSectionUnit() {
  return (
    <VStack h={`80px`} w={`96px`} alignItems={'center'} justifyContent={'space-between'}>
      <Box h={`40px`} flexShrink={0} aspectRatio={1} bg={`black`} />
      <Text
        h={`100%`}
        w={`100%`}
        textAlign={'center'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        className="Assistive"
      >
        Manchester United
      </Text>
    </VStack>
  )
}

function Score() {
  return (
    <VStack h={`112px`} w={`96px`} alignItems={'center'} justifyContent={'center'}>
      <Flex
        h={`40px`}
        w={`100%`}
        alignItems={'center'}
        justifyContent={'center'}
        className="Headline-1-Desktop"
        gap={`4px`}
        color={'colors.specificLive'}
      >
        <Text className="Display">1</Text>
        <Spacer />
        <Text className="Display">-</Text>
        <Spacer />
        <Text className="Display">0</Text>
      </Flex>
      <Text className="Micro" color={'colors.specificLive'}>
        36'
      </Text>
    </VStack>
  )
}

export default EventDetailsSection
