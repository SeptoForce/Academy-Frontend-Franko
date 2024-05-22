import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import LeagueSection from '@/components/sections/LeagueSection'
import LiveSection from '@/components/sections/LiveSection'
import IconPointerRight from '@/components/svg/IconPointerRight'
import { HStack, VStack, Text, Link, Box, Spacer, Flex } from '@kuma-ui/core'

export default function Home() {
  return (
    <>
      <Header />
      <VStack
        as="main"
        h={`100%`}
        maxW={`1392px`}
        w={`100%`}
        justifyContent={`flex-start`}
        alignItems={`center`}
        px={[`8px`, `24px`]}
      >
        <HStack
          w={`100%`}
          h={`48px`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          px={`12px`}
          display={[`none`, `flex`]}
        >
          <HStack
            className="Micro"
            userSelect={`none`}
            cursor={'default'}
            alignItems={'center'}
            color={'colors.onSurfaceLv2'}
          >
            <Link href={'#'}>Football</Link>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Link href={'#'}>LaLiga</Link>
            <IconPointerRight size={`24px`} color={`var(--on-surface-on-surface-lv-2)`} />
            <Text userSelect={'none'}>{`Manchester United vs Barcelona`}</Text>
          </HStack>
        </HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <LeagueSection />
          <LiveSection />

          {1 === 0 ? (
            <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`}>
              <Box w={`100%`} bg={`black`} />
            </Box>
          ) : (
            <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} />
          )}
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}
