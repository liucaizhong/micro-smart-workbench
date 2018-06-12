import React from 'react'
import { render } from 'react-dom'
import { LocaleProvider } from 'antd-mobile'
import { addLocaleData, IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import 'intl'
import 'intl/locale-data/jsonp/en.js'
import configureStore from './configureStore'
import configureAppLocale from './configureAppLocale'
import App from './routes/App'
import registerServiceWorker from './registerServiceWorker'
import './index.less'

// set locale langage data
const appLocale = configureAppLocale()
addLocaleData(appLocale.data)

// declare a redux store
const store = configureStore()

// const rootElement = document.getElementById('root')
//
// if (rootElement.hasChildNodes()) {
//   hydrate((
//     <LocaleProvider locale={appLocale.antd}>
//       <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </IntlProvider>
//     </LocaleProvider>
//   ), rootElement)
// } else {
//   render((
//     <LocaleProvider locale={appLocale.antd}>
//       <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </IntlProvider>
//     </LocaleProvider>
//   ), rootElement)
// }
render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
