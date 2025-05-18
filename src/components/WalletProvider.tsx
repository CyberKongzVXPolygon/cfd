import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use a conditional endpoint based on whether we're in the browser or server
  const endpoint = useMemo(() => {
    // During server-side rendering, use a public endpoint
    if (typeof window === 'undefined') {
      return clusterApiUrl('mainnet-beta');
    }
    
    // In the browser, use absolute URL to our proxy endpoint
    const origin = window.location.origin; // Gets the base URL like https://coinfastfun.vercel.app
    return `${origin}/api/rpc-proxy`;
  }, []);

  // All popular wallets now support the Wallet Standard
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
