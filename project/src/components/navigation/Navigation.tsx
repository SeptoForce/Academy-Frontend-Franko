import { Box, Flex, HStack, VStack } from '@kuma-ui/core'
import IconFootball from '../svg/IconFootball'
import IconBasketball from '../svg/IconBasketball'
import IconAmericanFootball from '../svg/IconAmericanFootball'

function NavigationTab(props: { active?: boolean; children: React.ReactNode }) {
  const PADDING_HORIZONTAL = '8px'

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
      <NavigationTab active={true}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconFootball size="16px" />
          <span>Football</span>
        </Flex>
      </NavigationTab>
      <NavigationTab>
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconBasketball size="16px" />
          <span>Basketball</span>
        </Flex>
      </NavigationTab>
      <NavigationTab>
        <Flex justifyContent={'center'} alignItems={'center'} gap={'4px'} flexDir={['column', 'row']}>
          <IconAmericanFootball size="16px" />
          <span>Am. Football</span>
        </Flex>
      </NavigationTab>
    </HStack>
  )
}
