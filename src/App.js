import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';
import TokenCreationForm from './TokenCreationForm';

const AppContainer = styled.div`
  background-color: #0f1528;
  background-image: radial-gradient(circle at 10% 20%, rgba(20, 30, 60, 0.5) 0%, rgba(10, 15, 30, 0.5) 90%);
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Banner = styled.div`
  background: linear-gradient(90deg, #4a8eff, #c353ff);
  text-align: center;
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  border-bottom: 1px solid #2a3a5a;
  background-color: rgba(15, 21, 40, 0.9);
  backdrop-filter: blur(10px);
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(90deg, #4a8eff, #ff6b8b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #8a9cc2;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  position: relative;
  padding: 5px 0;

  &:hover {
    color: #ffffff;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #4a8eff, #c353ff);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NewBadge = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 5px;
  display: inline-block;
  vertical-align: middle;
`;

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
  color: #8a9cc2;
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
  border: 1px solid #2a3a5a;
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
    background: linear-gradient(90deg, transparent, #4a8eff, transparent);
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
    background-color: #00b8d9;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 184, 217, 0.3);

    &:hover {
      background-color: #00a0c0;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 184, 217, 0.4);
    }
  }

  .wallet-adapter-button-trigger {
    background-color: #00b8d9;
  }

  .wallet-adapter-button.wallet-adapter-button-trigger.wallet-connected {
    background-color: #4caf50;
  }
`;

function App() {
  const { connected } = useWallet();

  return (
    <AppContainer>
      <Banner>CREATE YOUR COIN FOR ONLY 0.1 SOL, FAST!</Banner>
      
      <Navbar>
        <Logo>CoinFast</Logo>
        <NavLinks>
          <NavLink href="#">Create Token</NavLink>
          <NavLink href="#">Trending Tokens <NewBadge>SOON</NewBadge></NavLink>
          <NavLink href="https://raydium.io/liquidity/create-pool/" target="_blank">Create Liquidity</NavLink>
          <NavLink href="https://raydium.io/portfolio/" target="_blank">Manage Liquidity</NavLink>
        </NavLinks>
        <WalletMultiButton />
      </Navbar>
      
      <MainContent>
        <Title>Create Your Own Coin FAST</Title>
        <Subtitle>Launch your own token on Solana in seconds. No coding required.</Subtitle>
        
        <ConnectBox>
          <WalletButtonContainer>
            <WalletMultiButton />
          </WalletButtonContainer>
          
          {connected && <TokenCreationForm />}
        </ConnectBox>
      </MainContent>
    </AppContainer>
  );
}

export default App;
