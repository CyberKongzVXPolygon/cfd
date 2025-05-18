import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    BackpackWalletAdapter,
    CoinbaseWalletAdapter,
    GlowWalletAdapter,
    TrustWalletAdapter,
    SlopeWalletAdapter,
    ExodusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import the wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletConnectionProvider = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.MainnetBeta;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => {
        // Use custom RPC URL from environment variables if available
        if (process.env.REACT_APP_RPC_URL) {
            return process.env.REACT_APP_RPC_URL;
        }
        return clusterApiUrl(network);
    }, [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new GlowWalletAdapter(),
            new TrustWalletAdapter(),
            new SlopeWalletAdapter(),
            new ExodusWalletAdapter(),
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
