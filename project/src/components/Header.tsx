import { Box, Flex, HStack, Link } from '@kuma-ui/core'
import IconSofascoreLogo from './svg/IconSofascoreLogo'
import IconTrophy from './svg/IconTrophy'
import IconSettings from './svg/IconSettings'
import { Navigation } from './navigation/Navigation'
import Calendar from './navigation/Calendar'
import IconBookmarkSolid from './svg/IconBookmarkSolid'
import IconBookmark from './svg/IconBookmark'
import IconBookmarkRemove from './svg/IconBookmarkRemove'

export function Header(props: { noNavigation?: boolean; noCalendar?: boolean }) {
  return (
    <Flex as="header" flexDirection={'column'} position={'sticky'} top={0} w={`100%`} zIndex={999}>
      <HStack
        background="colors.primaryDefault"
        h={[`48px`, `64px`]}
        justifyContent="space-between"
        alignItems="center"
        px={[`16px`, `24px`]}
      >
        <Box flexGrow={1} flexBasis={0} display={['none', 'block']} />
        <Box
          as="h1"
          color="colors.surface1"
          fontFamily="fonts.roboto"
          flexGrow={1}
          flexBasis={0}
          textAlign={[`start`, `center`]}
        >
          <Link href="/">
            <IconSofascoreLogo />
          </Link>
        </Box>
        <HStack
          color="colors.surface1"
          fontFamily="fonts.roboto"
          flexGrow={1}
          flexBasis={0}
          alignItems="center"
          justifyContent="flex-end"
          gap={`24px`}
        >
          <Link href="/tracked">
            <IconBookmarkSolid />
          </Link>
          <Flex display={[`flex`, `none`]}>
            <Link>
              <IconTrophy />
            </Link>
          </Flex>
          <Link href="/settings">
            <IconSettings />
          </Link>
        </HStack>
      </HStack>
      {props.noNavigation ? null : <Navigation />}
      {props.noCalendar ? null : <Calendar mobile />}
    </Flex>
  )
}

export default Header
