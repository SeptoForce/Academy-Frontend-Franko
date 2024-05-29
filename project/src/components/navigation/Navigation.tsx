import { Box, Flex, HStack, VStack } from '@kuma-ui/core'
import IconFootball from '../svg/IconFootball'
import IconBasketball from '../svg/IconBasketball'
import IconAmericanFootball from '../svg/IconAmericanFootball'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'

function NavigationTab(props: { active?: boolean; children: React.ReactNode; redirect?: string }) {
  const router = useRouter()
  const PADDING_HORIZONTAL = '8px'

  const handleClick = () => {
    if (props.redirect) {
      const currentQuery = router.query
      const date = currentQuery.d || new Date().toISOString().split('T')[0]
      router.push(`/${props.redirect}?d=${date}`)
    }
  }

  return (
    <VStack
      w={['150px', 'auto']}
      h="100%"
      textAlign={'center'}
      justifyContent={'center'}
      alignItems={'center'}
      px={PADDING_HORIZONTAL}
      position={'relative'}
      flexBasis={[0, 'auto']}
      flexGrow={[1, 0]}
      userSelect={'none'}
      cursor={'pointer'}
      onMouseDown={handleClick}
    >
      {props.children}
      <Box
        w={`calc(100% - ${PADDING_HORIZONTAL} * 2)`}
        h="4px"
        background="colors.surface1"
        visibility={props.active ? 'visible' : 'hidden'}
        position={'absolute'}
        bottom={'0'}
      />
    </VStack>
  )
}

export function Navigation() {
  const router = useRouter()
  const appContext = useAppContext()
  const currentPath = router.query.slug as string
  return (
    <HStack
      as="nav"
      background="colors.primaryDefault"
      h="48px"
      justifyContent="center"
      alignItems="center"
      w="100%"
      color="colors.surface1"
    >
      <NavigationTab active={currentPath === `football`} redirect="football">
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconFootball size="16px" />
          <span>Football</span>
        </Flex>
      </NavigationTab>
      <NavigationTab active={currentPath === `basketball`} redirect="basketball">
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconBasketball size="16px" />
          <span>Basketball</span>
        </Flex>
      </NavigationTab>
      <NavigationTab active={currentPath === `american-football`} redirect="american-football">
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconAmericanFootball size="16px" />
          <span>{appContext.isMobile ? `Am. Football` : `American Football`}</span>
        </Flex>
      </NavigationTab>
    </HStack>
  )
}
