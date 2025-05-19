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
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 30px 15px 40px 15px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const ConnectBox = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(13, 19, 35, 0.7);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(42, 58, 90, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4a8eff, transparent);
    animation: borderGlow 4s infinite;
  }

  @keyframes borderGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-bottom: 40px;
  }
`;

const ConnectMessage = styled.p`
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 20px;
  font-weight: 500;
`;

const WalletButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default function Home() {
  const { connected } = useWallet();
  const [showPhantomPrompt, setShowPhantomPrompt] = useState(false);
  
  useEffect(() => {
    // Check if we're in Phantom's browser
    const isPhantomBrowser = /phantom/i.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && !isPhantomBrowser) {
      setShowPhantomPrompt(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>CoinFast - Create Your Own Token</title>
        <meta name="description" content="Launch your own token on Solana in seconds. No coding required." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Navbar />
      
      <MainContent>
        <Title>Create Your Own Coin FAST</Title>
        <Subtitle>Launch your own token on Solana in seconds. No coding required.</Subtitle>
        
        <ConnectBox>
          {!connected && (
            <>
              <ConnectMessage>Please connect your wallet to continue</ConnectMessage>
              <WalletButtonContainer>
                <WalletMultiButton />
              </WalletButtonContainer>
            </>
          )}
          
          {connected && <TokenCreationForm />}
        </ConnectBox>
        
        <StepsBox />
        <FAQ />
      </MainContent>
      
      <Footer />
    </>
  );
}
