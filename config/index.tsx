import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneiumMinato, solana, solanaDevnet, solanaTestnet, bitcoin} from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Lazy imports for client-side adapters
let SolanaAdapter: any, BitcoinAdapter: any, PhantomWalletAdapter: any, SolflareWalletAdapter: any;

if (typeof window !== 'undefined') {
  // Dynamically import browser-only modules
  SolanaAdapter = require('@reown/appkit-adapter-solana/react').SolanaAdapter;
  BitcoinAdapter = require('@reown/appkit-adapter-bitcoin').BitcoinAdapter;
  PhantomWalletAdapter = require('@solana/wallet-adapter-wallets').PhantomWalletAdapter;
  SolflareWalletAdapter = require('@solana/wallet-adapter-wallets').SolflareWalletAdapter;
}

export const networks = [mainnet, arbitrum, scroll, morph, berachainTestnetbArtio, mantle, soneiumMinato, solana, solanaDevnet, solanaTestnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false, // Disable SSR for wagmiAdapter
  networks,
  projectId,
});

// Safely initialize Solana and Bitcoin adapters (client-side only)
export const solanaWeb3JsAdapter =
  typeof window !== 'undefined'
    ? new SolanaAdapter({
        wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
      })
    : undefined;

export const bitcoinAdapter =
  typeof window !== 'undefined'
    ? new BitcoinAdapter({
        networks: [bitcoin],
        projectId,
      })
    : undefined;

export const config = wagmiAdapter.wagmiConfig;
