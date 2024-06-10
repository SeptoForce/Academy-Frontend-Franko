import { getTournamentImageLink } from '@/api/api'
import { Tournament } from '@/utils/types'
import { Flex, HStack, Image, Link, Text } from '@kuma-ui/core'
import IconPointerRight from '../svg/IconPointerRight'

export function LeagueCell(props: { tournament?: Tournament }) {
  if (props.tournament === undefined) {
    return null
  }

  return (
    <Link href={`/tournament/${props.tournament?.id}`}>
      <Flex h={`56px`} w={`100%`} px={`16px`} alignItems={'center'} gap={`32px`}>
        <Image
          src={getTournamentImageLink(props.tournament?.id)}
          alt="League image"
          h={`32px`}
          aspectRatio={1}
          flexShrink={0}
        />
        <HStack h={`100%`} alignItems={'center'}>
          <Text className="Headline-3" color={`colors.onSurfaceLv1`}>
            {props.tournament?.country.name}
          </Text>
          <IconPointerRight color={`var(--on-surface-on-surface-lv-2)`} />
          <Text color={`colors.onSurfaceLv2`}>{props.tournament?.name}</Text>
        </HStack>
      </Flex>
    </Link>
  )
}

export default LeagueCell
