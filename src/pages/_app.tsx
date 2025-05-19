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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap');
  
  :root {
    --primary-blue: #4a8eff;
    --primary-purple: #8964e0;
    --primary-gradient: linear-gradient(90deg, #4a8eff, #8964ff);
    --dark-bg: #0c1224;
    --darker-bg: #080e1c;
    --card-bg: rgba(30, 40, 60, 0.5);
    --border-color: #2a3a5a;
    --text-light: #a2b3d6;
    --text-white: #ffffff;
    --accent-cyan: #00b8d9;
    --accent-green: #4caf50;
    --accent-red: #ff5252;
    --button-purple: #6954d6;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', 'Inter', sans-serif;
  }
  
  html {
    overflow-y: scroll;
  }
  
  body {
    background-color: var(--dark-bg);
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(74, 142, 255, 0.07) 0%, rgba(10, 15, 30, 0) 60%),
      radial-gradient(circle at 90% 50%, rgba(137, 100, 224, 0.08) 0%, rgba(10, 15, 30, 0) 70%);
    color: var(--text-white);
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
  }

  /* Animation for gradient elements */
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Override wallet adapter button styles */
  .wallet-adapter-button {
    background-color: var(--button-purple) !important;
    border-radius: 50px !important;
    padding: 14px 24px !important;
    height: auto !important;
    font-size: 16px !important;
    font-weight: 600 !important;
  }

  .wallet-adapter-button:hover {
    background-color: #5d49c3 !important;
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
