import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
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
  padding: 20px 0 0;
  width: 100%;
  overflow: hidden; /* Prevent double scrollbars */
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0; /* Remove padding on mobile */
  }
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
    border-radius: 0; /* Remove border radius on mobile */
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

// Full-height iframe container with no scrollbar
const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 180px); /* Full viewport height minus header */
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    height: calc(100vh - 140px);
  }
`;

// Loading state display
const LoadingOverlay = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isLoading ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.isLoading ? 'auto' : 'none'};
  z-index: 10;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// The iframe container that looks like part of our site
const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  overflow: hidden; /* Hide iframe scrollbar */
  background-color: rgba(15, 23, 42, 0.7);
  
  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }
`;

// The iframe itself - full height and width
const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ManageLiquidityPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Apply custom CSS for better iframe integration
  useEffect(() => {
    // Remove footer when iframe is loaded to give more space
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Create a style element to inject custom CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Make sure the body doesn't have its own scrollbar */
      body {
        overflow: hidden !important;
      }
      
      /* Force high z-index for wallet dialogs */
      .wallet-adapter-modal {
        z-index: 999999 !important;
      }
      
      /* Fix any iframe scrolling issues */
      iframe {
        -webkit-overflow-scrolling: touch !important;
      }
      
      /* Remove any potential page breaks in design */
      #__next {
        height: 100vh;
        overflow: hidden;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      // Restore footer visibility
      if (footer) {
        footer.style.display = '';
      }
      // Remove custom styles
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>Manage Liquidity | CoinFast</title>
        <meta name="description" content="Manage your liquidity pools and token positions on Solana." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
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
          
          <IframeWrapper>
            <LoadingOverlay isLoading={!isLoaded}>
              <LoadingSpinner />
            </LoadingOverlay>
            <IframeContainer>
              <StyledIframe
                ref={iframeRef}
                src="https://raydium.io/portfolio/" 
                title="Manage Liquidity on Raydium"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setIsLoaded(true)}
                allowFullScreen
              />
            </IframeContainer>
          </IframeWrapper>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default ManageLiquidityPage;
