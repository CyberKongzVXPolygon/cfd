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
  
  body {
    background-color: #0a1022; /* Darker background color */
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(74, 142, 255, 0.07) 0%, rgba(10, 15, 30, 0) 60%),
      radial-gradient(circle at 90% 50%, rgba(137, 100, 224, 0.08) 0%, rgba(10, 15, 30, 0) 70%);
    color: var(--text-white);
    min-height: 100vh;
    padding-top: env(safe-area-inset-top);
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

  /* Override wallet adapter button styles to match "Create Token" button */
  .wallet-adapter-button {
    background: linear-gradient(90deg, #4a8eff, #8964ff) !important;
    background-size: 200% auto !important;
    animation: gradientAnimation 5s ease infinite !important;
    border-radius: 12px !important; /* Reduced from 50px to match Create Token button */
    padding: 12px 20px !important; /* Reduced padding to match size */
    height: auto !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 12px rgba(74, 142, 255, 0.3) !important;
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
