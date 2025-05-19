import Head from 'next/head';
import styled from 'styled-components';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import TokenCreationForm from '@/components/TokenCreationForm';
import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import StepsBox from '@/components/StepsBox';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const MainContent = styled.div`
  text-align: center;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  background: linear-gradient(90deg, #4a8eff, #c353ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ConnectBox = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(30, 40, 60, 0.5);
  border-radius: 12px;
  padding: 40px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-blue), transparent);
    animation: borderGlow 4s infinite;
  }

  @keyframes borderGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 25px 15px;
    margin-bottom: 20px;
  }
`;

const WalletButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .wallet-adapter-button {
    background-color: var(--accent-cyan);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 184, 217, 0.3);

    &:hover {
      background-color: #00a0c0;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 184, 217, 0.4);
    }
  }

  .wallet-adapter-button-trigger {
    background-color: var(--accent-cyan);
  }

  .wallet-adapter-button.wallet-adapter-button-trigger.wallet-connected {
    background-color: var(--accent-green);
  }
`;

const PhantomPrompt = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.9);
  color: white;
  padding: 20px;
  z-index: 9999;
  text-align: center;
`;

const PhantomPromptTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const PhantomPromptText = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const PhantomPromptButton = styled.button`
  background: linear-gradient(90deg, #4a8eff, #c353ff);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

const ContinueButton = styled.button`
  background: transparent;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function Home() {
  const { connected } = useWallet();
  const [showPhantomPrompt, setShowPhantomPrompt] = useState(false);
  
  useEffect(() => {
    // Check if we're in Phantom's browser
    const isInPhantomBrowser = /phantom/i.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Show prompt if on mobile but not in Phantom browser
    if (isMobile && !isInPhantomBrowser) {
      setShowPhantomPrompt(true);
    }
  }, []);

  const openInPhantom = () => {
    // This is the most basic format that should work
    const universalUrl = `https://phantom.app/ul/browse/${window.location.href}`;
    
    // Redirect directly without any conditional logic
    window.location.href = universalUrl;
  };

  return (
    <>
      <Head>
        <title>CoinFast - Create Your Own Token</title>
        <meta name="description" content="Launch your own token on Solana in seconds. No coding required." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Phantom browser prompt */}
      {showPhantomPrompt && (
        <PhantomPrompt>
          <PhantomPromptTitle>Open in Phantom App</PhantomPromptTitle>
          <PhantomPromptText>
            For the best experience, please open this site directly in the Phantom wallet's browser.
          </PhantomPromptText>
          <PhantomPromptButton onClick={openInPhantom}>
            Open in Phantom
          </PhantomPromptButton>
          <ContinueButton onClick={() => setShowPhantomPrompt(false)}>
            Continue anyway
          </ContinueButton>
        </PhantomPrompt>
      )}

      <Banner />
      <Navbar />
      
      <MainContent>
        <Title>Create Your Own Coin FAST</Title>
        <Subtitle>Launch your own token on Solana in seconds. No coding required.</Subtitle>
        
        <ConnectBox>
          <WalletButtonContainer>
            <WalletMultiButton />
          </WalletButtonContainer>
          
          {connected && <TokenCreationForm />}
        </ConnectBox>
        
        <StepsBox />
        <FAQ />
      </MainContent>
      
      <Footer />
    </>
  );
}
