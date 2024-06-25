import { Text, VStack } from '@kuma-ui/core'
import IconSofascoreLogo from './svg/IconSofascoreLogo'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <VStack
      as="footer"
      background="colors.surface1"
      h="auto"
      w="100vw"
      mt={`48px`}
      p={`24px`}
      pb={`32px`}
      alignItems={`center`}
      justify={`flex-start`}
      gap={`24px`}
      boxShadow={`0 2px 16px 0 rgba(0, 0, 0, 0.12)`}
    >
      <IconSofascoreLogo color={`var(--on-surface-on-surface-lv-1)`} />
      <Text color={`colors.onSurfaceLv2`} className="Micro">
        © 2024 Sofascore – {t('allRightsReserved')}.
      </Text>
    </VStack>
  )
}

export default Footer
