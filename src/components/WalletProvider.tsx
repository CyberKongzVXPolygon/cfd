import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use our proxy endpoint for client-side operations
  const endpoint = useMemo(() => {
    return "/api/rpc-proxy"; // This will route through our server
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
