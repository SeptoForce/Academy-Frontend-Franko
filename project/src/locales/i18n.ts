import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslation from '@/locales/en.json'
import frTranslation from '@/locales/fr.json'
import xxTranslation from '@/locales/xx.json'
import hrTranslation from '@/locales/hr.json'
import noTranslation from '@/locales/no.json'
import uwuTranslation from '@/locales/uwu.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  xx: {
    translation: xxTranslation,
  },
  hr: {
    translation: hrTranslation,
  },
  no: {
    translation: noTranslation,
  },
  uwu: {
    translation: uwuTranslation,
  },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
