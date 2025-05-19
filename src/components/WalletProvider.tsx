import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAuthorizationResultCache, MobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // You can also use your custom RPC endpoint
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl('mainnet-beta');
  
  const wallets = useMemo(
    () => [
      new MobileWalletAdapter({
        appIdentity: {
          name: 'CoinFast',
          uri: 'https://coinfastfun.vercel.app',
          icon: 'https://coinfastfun.vercel.app/favicon.ico',
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: 'mainnet-beta',
      }),
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
