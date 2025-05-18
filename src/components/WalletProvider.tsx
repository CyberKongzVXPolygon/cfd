import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use public RPC endpoint for client-side
  // The private RPC endpoint will only be used server-side in API routes
  const endpoint = useMemo(() => {
    return clusterApiUrl('mainnet-beta');
  }, []);

  // All popular wallets now support the Wallet Standard
  // We don't need to specify any wallet adapters
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

