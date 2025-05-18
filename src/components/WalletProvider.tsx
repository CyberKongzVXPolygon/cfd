import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Always use a full URL for the endpoint
  const endpoint = useMemo(() => {
    // Use a public Solana RPC endpoint
    return "https://solana-mainnet.rpc.extrnode.com";
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
