import { useThemeContext } from '@/context/ThemeContext'
import { Box, Button, Flex, HStack } from '@kuma-ui/core'
import IconSofascoreLogo from './svg/IconSofascoreLogo'
import IconTrophy from './svg/IconTrophy'
import IconSettings from './svg/IconSettings'
import { Navigation } from './navigation/Navigation'
import Calendar from './navigation/Calendar'

export function Header() {
  const { setIsDark } = useThemeContext()

  return (
    <Flex flexDirection={'column'} position={'sticky'} top={0} w={`100%`}>
      <HStack
        as="header"
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
          <IconSofascoreLogo />
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
          <Flex display={[`flex`, `none`]}>
            <IconTrophy />
          </Flex>
          <Button onClick={() => setIsDark(v => !v)}>
            <IconSettings />
          </Button>
        </HStack>
      </HStack>
      <Navigation />
      <Calendar mobile />
    </Flex>
  )
}

export default Header
