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
    --dark-bg: #0a1022;
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
  
  /* Enhanced animated background */
  body {
    background-color: #0a1022; /* Darker background color */
    background-image: 
      radial-gradient(circle at 15% 15%, rgba(74, 142, 255, 0.08) 0%, rgba(10, 15, 30, 0) 60%),
      radial-gradient(circle at 85% 25%, rgba(137, 100, 224, 0.1) 0%, rgba(10, 15, 30, 0) 70%),
      radial-gradient(circle at 50% 50%, rgba(20, 30, 60, 0.05) 0%, rgba(10, 15, 30, 0) 80%),
      radial-gradient(circle at 20% 70%, rgba(120, 90, 230, 0.07) 0%, rgba(10, 15, 30, 0) 70%);
    color: var(--text-white);
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
    position: relative;
    overflow: hidden;
  }

  /* Background animation blobs */
  body::before, body::after {
    content: '';
    position: absolute;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    background: radial-gradient(rgba(74, 142, 255, 0.05), rgba(10, 15, 30, 0));
    animation: moveBlob 25s infinite alternate ease-in-out;
    z-index: -1;
  }

  body::before {
    top: -400px;
    left: -200px;
  }

  body::after {
    bottom: -400px;
    right: -200px;
    background: radial-gradient(rgba(137, 100, 224, 0.05), rgba(10, 15, 30, 0));
    animation: moveBlob 30s infinite alternate-reverse ease-in-out;
  }

  @keyframes moveBlob {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(100px, 50px);
    }
    100% {
      transform: translate(50px, 100px);
    }
  }

  /* Improved gradient animation for smoother effect */
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
  
  /* Floating animation for text */
  @keyframes floatingAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* Override wallet adapter button styles to exactly match "Create Token" button */
  .wallet-adapter-button {
    background: linear-gradient(90deg, #4a8eff, #8964ff) !important;
    background-size: 200% auto !important;
    animation: gradientAnimation 5s ease infinite !important;
    border-radius: 12px !important;
    padding: 14px 26px !important;
    height: auto !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 12px rgba(74, 142, 255, 0.3) !important;
    transition: all 0.3s ease !important;
    min-width: 0 !important;
    min-height: 0 !important;
    line-height: normal !important;
  }

  .wallet-adapter-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 15px rgba(74, 142, 255, 0.4) !important;
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
