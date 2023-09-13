import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import { StateContext } from '../utils/context/StateContext'

import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <StateContext>
        <Toaster />
        <Component {...pageProps} />
      </StateContext>
    </ClerkProvider>
  )
}

export default MyApp
