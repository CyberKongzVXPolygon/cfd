import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';
import '@solana/wallet-adapter-react-ui/styles.css';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  :root {
    --primary-blue: #4a8eff;
    --primary-purple: #8a63d2;
    --primary-gradient: linear-gradient(90deg, #4a8eff, #c353ff);
    --dark-bg: #0f1528;
    --darker-bg: #0a0f1d;
    --card-bg: rgba(30, 40, 60, 0.5);
    --border-color: #2a3a5a;
    --text-light: #8a9cc2;
    --text-white: #ffffff;
    --accent-cyan: #00b8d9;
    --accent-green: #4caf50;
    --accent-red: #ff5252;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  html {
    overflow-y: scroll;
  }
  
  body {
    background-color: var(--dark-bg);
    background-image: radial-gradient(circle at 10% 20%, rgba(20, 30, 60, 0.5) 0%, rgba(10, 15, 30, 0.5) 90%);
    color: var(--text-white);
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl(network);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <>
      <GlobalStyle />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
