import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
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
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: 'CoinFast',
          uri: 'https://coinfastfun.vercel.app',
          icon: 'favicon.ico',
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: WalletAdapterNetwork.Mainnet,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      })
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
