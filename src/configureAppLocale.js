import LANGS from './locales/langList'

// get language
// const navigatorLang = navigator.language.toLowerCase()
let navigatorLang = (navigator.languages && navigator.languages[0]) ||
                    navigator.language ||
                    navigator.userLanguage
navigatorLang = navigatorLang.toLowerCase()
// console.log('navigatorLang', navigatorLang)

const showLangMap = [...LANGS].filter(
  ([k]) => !navigatorLang.localeCompare(k),
)

export default function configureAppLocale() {
  switch (showLangMap[1]) {
    case 0: {
      const appLocaleData = require('react-intl/locale-data/zh')
      const zhMessages = require('./locales/zh_cn')

      return Object.assign({}, {
        messages: {
          ...zhMessages,
        },
        antd: null,
        locale: 'zh-CN',
        data: appLocaleData,
      })
    }
    case 1: {
      // support further
      // const antdEn = require('antd-mobile/lib/locale-provider/en_US')
      // const appLocaleData = require('react-intl/locale-data/en')
      // const enMessages = require('./locales/en_us')
      //
      // return Object.assign({}, {
      //   messages: {
      //     ...enMessages,
      //   },
      //   antd: antdEn,
      //   locale: 'en-US',
      //   data: appLocaleData,
      // })
    }
    default: {
      const appLocaleData = require('react-intl/locale-data/zh')
      const zhMessages = require('./locales/zh_cn')

      return Object.assign({}, {
        messages: {
          ...zhMessages,
        },
        antd: null,
        locale: 'zh-CN',
        data: appLocaleData,
      })
    }
  }
}
