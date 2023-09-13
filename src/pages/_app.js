import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import { StateContext } from '../utils/context/StateContext'

import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      // Here you can add whatever props you want. Check out here: https://clerk.com/docs/components/clerk-provider#props
    >
      <StateContext>
        <Toaster />
        <Component {...pageProps} />
      </StateContext>
    </ClerkProvider>
  )
}

export default MyApp
