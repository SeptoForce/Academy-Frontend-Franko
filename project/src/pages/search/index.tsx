import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { HStack, VStack, Box, Input, Image, Text, Spacer } from '@kuma-ui/core'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import { PlayerSearchResult, TeamSearchResult } from '@/utils/types'
import { getPlayerImageLink, getTeamImageLink, searchPlayers, searchTeams } from '@/api/api'
import { FlagComponent } from '@/components/FlagComponent'
import { Link } from '@kuma-ui/core'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}

export default function SearchPage() {
  const { t } = useTranslation()
  const [playerSearchResults, setPlayerSearchResults] = useState<PlayerSearchResult[]>([])
  const [teamSearchResults, setTeamSearchResults] = useState<TeamSearchResult[]>([])

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length < 2) {
          setPlayerSearchResults([])
          setTeamSearchResults([])
          return
        }

        searchPlayers(query)
          .then(data => {
            setPlayerSearchResults(data)
          })
          .catch(err => {
            console.error(err)
          })

        searchTeams(query)
          .then(data => {
            setTeamSearchResults(data)
          })
          .catch(err => {
            console.error(err)
          })
      }, 500),
    []
  )

  useEffect(() => {}, [playerSearchResults, teamSearchResults])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value)
  }

  return (
    <>
      <Header noCalendar noNavigation />
      <VStack
        as="main"
        h={`100%`}
        maxW={`1392px`}
        w={`100%`}
        justifyContent={`flex-start`}
        alignItems={`center`}
        px={[`8px`, `24px`]}
        pt={[`12px`, `0px`]}
        flexGrow={1}
      >
        <HStack
          w={`100%`}
          h={`48px`}
          justifyContent={`flex-start`}
          alignItems={`center`}
          px={`12px`}
          display={[`none`, `flex`]}
        ></HStack>

        <HStack w={`100%`} h={`100%`} justifyContent={'center'} gap={`24px`}>
          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />

          <Box display={`flex`} w={`200px`} flexDir={'column'} flexShrink={0} flexBasis={0} flexGrow={2} gap={`5px`}>
            <VStack
              h={`min-content`}
              w={`100%`}
              bg={'colors.surface1'}
              boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
              borderRadius={`16px`}
              gap={`16px`}
              zIndex={1}
              borderBottom={`1px solid #E0E0E0`}
              overflow={`hidden`}
            >
              <HStack>
                <Input
                  placeholder={t('search')}
                  h={`100%`}
                  w={`100%`}
                  fontSize={`20px`}
                  p={`8px`}
                  px={`16px`}
                  bg={'colors.surface1'}
                  color={`colors.onSurfaceLv1`}
                  onChange={handleSearchChange}
                />
              </HStack>
            </VStack>
            {playerSearchResults.length > 0 && (
              <>
                <Text className="Assistive" mx={`16px`} mt={`16px`}>
                  {t('players')}
                </Text>
                <VStack
                  w={`100%`}
                  h={'fit-content'}
                  p={`8px`}
                  px={`16px`}
                  borderRadius={`16px`}
                  boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
                  bg={'colors.surface1'}
                  gap={`8px`}
                >
                  {playerSearchResults.map(player => (
                    <PlayerSearchCell key={player.id} playerSearchResults={player} />
                  ))}
                </VStack>
              </>
            )}
            {teamSearchResults.length > 0 && (
              <>
                <Text className="Assistive" mx={`16px`} mt={`16px`}>
                  {t('teams')}
                </Text>
                <VStack
                  w={`100%`}
                  h={'fit-content'}
                  p={`8px`}
                  px={`16px`}
                  borderRadius={`16px`}
                  boxShadow={`0 1px 4px 0 rgba(0, 0, 0, 0.08)`}
                  bg={'colors.surface1'}
                  gap={`8px`}
                >
                  {teamSearchResults.map(team => (
                    <TeamSearchCell key={team.id} teamSearchResults={team} />
                  ))}
                </VStack>
              </>
            )}
          </Box>

          <Box display={[`none`, `none`, `none`, `flex`]} w={`100%`} flexBasis={0} flexGrow={1} />
        </HStack>
      </VStack>
      <Footer />
    </>
  )
}

function PlayerSearchCell(props: { playerSearchResults: PlayerSearchResult }) {
  const { t } = useTranslation()

  function handleImageError(event: any) {
    event.target.src = 'https://www.sofascore.com/static/images/placeholders/player.svg'
  }

  return (
    <Link
      href={`/player/${props.playerSearchResults.id}`}
      color={'colors.onSurfaceLv1'}
      _hover={{ bg: 'colors.primaryHighlight' }}
      p={`8px`}
      borderRadius={`8px`}
    >
      <HStack w={`100%`} gap={`16px`}>
        <Image
          src={getPlayerImageLink(props.playerSearchResults.id)}
          w={`40px`}
          aspectRatio={1}
          borderRadius={`50%`}
          onError={handleImageError}
        />
        <VStack justifyContent={'center'} gap={`4px`}>
          <Text>{props.playerSearchResults.name}</Text>
          <HStack className="Micro">
            <Text>{t(props.playerSearchResults.sport.name.toLowerCase())}</Text>
            <Spacer borderRight={`1px solid gray`} mx={`5px`} />
            <FlagComponent countryName={props.playerSearchResults.country.name} />
            <Spacer mx={`2px`} />
            <Text>{props.playerSearchResults.country.name}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  )
}

function TeamSearchCell(props: { teamSearchResults: TeamSearchResult }) {
  const { t } = useTranslation()

  function handleImageError(event: any) {
    event.target.src = 'https://www.sofascore.com/static/images/placeholders/player.svg'
  }

  return (
    <Link
      href={`/team/${props.teamSearchResults.id}`}
      color={'colors.onSurfaceLv1'}
      _hover={{ bg: 'colors.primaryHighlight' }}
      p={`8px`}
      borderRadius={`8px`}
    >
      <HStack w={`100%`} gap={`16px`}>
        <Image
          src={getTeamImageLink(props.teamSearchResults.id)}
          w={`40px`}
          aspectRatio={1}
          borderRadius={`50%`}
          onError={handleImageError}
        />
        <VStack justifyContent={'center'} gap={`4px`}>
          <Text>{props.teamSearchResults.name}</Text>
          <HStack className="Micro">
            <Text>{t(props.teamSearchResults.sport.name.toLowerCase())}</Text>
            <Spacer borderRight={`1px solid gray`} mx={`5px`} />
            <FlagComponent countryName={props.teamSearchResults.country.name} />
            <Spacer mx={`2px`} />
            <Text>{props.teamSearchResults.country.name}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  )
}
