import React from 'react'
import ReactDOM from 'react-dom/client'
import { initApolloClient } from 'applet-apis'

import App from './App'
import './index.css'

const { VITE_APPLET_AUTH_URL, VITE_APP_API_HOST } = import.meta.env

initApolloClient({
  graphQLUri: `${VITE_APP_API_HOST}/graphql`,
  appletAuthUrl: VITE_APPLET_AUTH_URL
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
