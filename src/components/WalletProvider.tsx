import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, WalletAdapterNetwork } from '@solana/web3.js';
import { 
  createDefaultAuthorizationResultCache, 
  createDefaultAddressSelector,
  createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter 
} from '@solana-mobile/wallet-adapter-mobile';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // You can also use your custom RPC endpoint
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl('mainnet-beta');
  
  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: 'CoinFast',
          uri: 'https://coinfastfun.vercel.app',
          icon: 'favicon.ico',
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: WalletAdapterNetwork.MainnetBeta,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
