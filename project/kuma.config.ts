import { createTheme } from '@kuma-ui/core'

const theme = createTheme({
  colors: {
    primaryDefault: 'var(--color-primary-default)',
    secondaryDefault: 'var(--color-secondary-default)',
    primaryVariant: 'var(--color-primary-variant)',
    secondaryVariant: 'var(--color-secondary-variant)',
    primaryHighlight: 'var(--color-primary-highlight)',
    secondaryHighlight: 'var(--color-secondary-highlight)',
    onColorPrimary: 'var(--on-color-on-color-primary)',
    onColorSecondary: 'var(--on-color-on-color-secondary)',
    surface1: 'var(--surface-surface-1)',
    surface0: 'var(--surface-surface-0)',
    surface2: 'var(--surface-surface-2)',
    onSurfaceLv1: 'var(--on-surface-on-surface-lv-1)',
    onSurfaceLv2: 'var(--on-surface-on-surface-lv-2)',
    onSurfaceLv3: 'var(--on-surface-on-surface-lv-3)',
    onSurfaceLv4: 'var(--on-surface-on-surface-lv-4)',
    statusError: 'var(--status-error)',
    statusAlert: 'var(--status-alert)',
    statusSuccess: 'var(--status-success)',
    specificLive: 'var(--specific-live)',
  },
  spacings: {
    xs: '4px',
    sm: '8px',
    md: '32px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  fonts: {
    roboto: 'Roboto, sans-serif',
    robotoCondensed: 'Roboto Condensed, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        padding: '4px',
        fontWeight: 600,
        _hover: {
          opacity: 0.9,
        },
        backgroundColor: 'transparent',
        border: '0',
      },
    },
    Link: {
      defaultProps: {
        color: 'colors.primaryDefault',
        _hover: {
          opacity: 0.8,
        },
        cursor: 'pointer',
      },
    },
  },
})

type UserTheme = typeof theme

declare module '@kuma-ui/core' {
  export interface Theme extends UserTheme {}
}

export default theme
