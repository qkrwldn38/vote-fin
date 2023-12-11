import { createContext, useEffect, useState } from 'react'
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react'

interface WalletConnectorContextType {
  isWalletConnected: boolean
  isAdminWalletConnected: boolean
}

export const WalletConnectorContext = createContext<
  WalletConnectorContextType | undefined
>(undefined)

interface ChildrenType {
  children: React.ReactNode
}

export const WalletContextProvider = ({ children }: ChildrenType) => {
  const [isWalletConnected, setWalletStatus] = useState(false)
  const [isAdminWalletConnected, setAdminWalletStatus] = useState(false)

  const connectionStatus = useConnectionStatus()
  const address = useAddress()

  useEffect(() => {
    if (connectionStatus === 'connected') {
      setWalletStatus(true)
    } else {
      setWalletStatus(false)
    }
  }, [connectionStatus])

  useEffect(() => {
    if (address) {
      const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS
      setAdminWalletStatus(ownerAddress === address)
    }
  }, [address])

  return (
    <WalletConnectorContext.Provider
      value={{
        isWalletConnected,
        isAdminWalletConnected,
      }}
    >
      {children}
    </WalletConnectorContext.Provider>
  )
}
