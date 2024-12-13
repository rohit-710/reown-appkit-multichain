import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneiumMinato, solana, solanaDevnet, solanaTestnet} from '@reown/appkit/networks'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneiumMinato, solana, solanaDevnet, solanaTestnet]

export const solanaWeb3JsAdapter = typeof window !== 'undefined' ? new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
}) : null;

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: false,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig