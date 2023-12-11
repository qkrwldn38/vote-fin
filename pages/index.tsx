import { ConnectWallet } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'
import { WalletConnectorContext } from '../context/WalletConnectionContext'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { isWalletConnected } = useContext(WalletConnectorContext) || {} // 기본값으로 빈 객체를 제공합니다.
  const router = useRouter()

  useEffect(() => {
    if (isWalletConnected) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }, [isWalletConnected])

  return (
    <>
      {!isWalletConnected && (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <Typography variant="h3" fontWeight={'bold'}>
            로그인해주세요.
          </Typography>
          <ConnectWallet theme="light" />
        </Box>
      )}
    </>
  )
}

export default Home
