import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ProxyConnection } from '@/utils/connection';

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use our proxy endpoint for client-side operations
  const connection = useMemo(() => {
    return new ProxyConnection('confirmed');
  }, []);

  // All popular wallets now support the Wallet Standard
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider connection={connection}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
