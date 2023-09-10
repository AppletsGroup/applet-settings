import React, { useEffect } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { appletStore } from 'applet-store'
import { Provider } from 'react-redux'

import { AppletProvider, SubPageLayout } from 'applet-shell'
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage'
import { queryChannels } from 'applet-apis'
import HomePage from './pages/HomePage/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/" element={<HomePage />}></Route>
      <Route element={<SubPageLayout />}>
        <Route
          path="/profile"
          element={<ProfileSettingsPage />} />
      </Route>
    </Route>
  )
)

const App: React.FC = () => {
  return (
    <AppletProvider>
      <Provider store={appletStore}>
        <RouterProvider router={router} />
      </Provider>
    </AppletProvider>
  )
}

export default App
