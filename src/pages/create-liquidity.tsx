import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px 0 40px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const NavigationBar = styled.div`
  background-color: rgba(15, 23, 42, 0.7);
  padding: 10px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const NavText = styled.div`
  color: var(--text-light);
  font-size: 14px;
  flex-grow: 1;
`;

const NavLink = styled.a`
  color: var(--primary-blue);
  text-decoration: none;
  margin-right: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-light);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(30, 40, 60, 0.5);
    color: var(--text-white);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 768px) {
    margin-top: 8px;
    width: 100%;
    justify-content: center;
  }
`;

// Responsive iframe container with modern approach
const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  height: calc(100vh - 200px);
  min-height: 500px;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(1.0);
  transform-origin: 0 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CreateLiquidityPage = () => {
  return (
    <PageContainer>
      <Head>
        <title>Create Liquidity | CoinFast</title>
        <meta name="description" content="Create liquidity pools for your Solana tokens quickly and easily." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      <Banner />
      <Navbar />

      <MainContent>
        <ContentWrapper>
          <NavigationBar>
            <NavText>
              <NavLink href="/">Home</NavLink> {' > '} Create Liquidity
            </NavText>
            <ExternalLink href="https://raydium.io/liquidity/create-pool/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Raydium
            </ExternalLink>
          </NavigationBar>
          
          <IframeContainer>
            <ResponsiveIframe 
              src="https://raydium.io/liquidity/create-pool/" 
              title="Create Liquidity on Raydium" 
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </IframeContainer>
        </ContentWrapper>
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default CreateLiquidityPage;
