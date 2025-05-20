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
`;

const EmbedContainer = styled.div`
  position: relative;
  height: calc(100vh - 180px);
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const NavigationBar = styled.div`
  background-color: rgba(15, 23, 42, 0.7);
  padding: 10px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
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
  
  &:hover {
    background-color: rgba(30, 40, 60, 0.5);
    color: var(--text-white);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ManageLiquidityPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PageContainer>
      <Head>
        <title>Manage Liquidity | CoinFast</title>
        <meta name="description" content="Manage your liquidity pools and token positions on Solana." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Navbar />

      <MainContent>
        <ContentWrapper>
          <NavigationBar>
            <NavText>
              <NavLink href="/">Home</NavLink> {' > '} Manage Liquidity
            </NavText>
            <ExternalLink href="https://raydium.io/portfolio/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Raydium
            </ExternalLink>
          </NavigationBar>
          
          <EmbedContainer>
            <StyledIframe 
              src="https://raydium.io/portfolio/" 
              title="Manage Liquidity on Raydium" 
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoading(false)}
            />
          </EmbedContainer>
        </ContentWrapper>
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default ManageLiquidityPage;
