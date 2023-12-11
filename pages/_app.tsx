import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { WalletContextProvider } from '../context/WalletConnectionContext'
import { ThemeProvider } from '@mui/material'
import theme from '../styles/theme'
import { ResponsiveDrawer } from '../components'
import { AuthorityContextProvider } from '../context/AuthorityContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <WalletContextProvider>
        <AuthorityContextProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveDrawer>
              <Component {...pageProps} />
            </ResponsiveDrawer>
          </ThemeProvider>
        </AuthorityContextProvider>
      </WalletContextProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
