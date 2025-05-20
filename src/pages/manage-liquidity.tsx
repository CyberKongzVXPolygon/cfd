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
  padding: 20px 0 40px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden;
  
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

// Seamless iframe container that expands with content
const IframeContainer = styled.div<{ isLoaded: boolean }>`
  position: relative;
  overflow: visible; /* Allow popups to extend beyond container */
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  min-height: 800px; /* Starting height before load */
  background-color: rgba(15, 23, 42, 0.7);
  transition: height 0.3s ease;
  
  @media (max-width: 768px) {
    border-radius: 0; /* Full width on mobile */
    border-left: none;
    border-right: none;
    box-shadow: none;
    overflow: visible; /* Ensure popups can be seen and interacted with */
    min-height: 900px; /* Increase minimum height for mobile */
  }
`;

// Responsive iframe that automatically adjusts height and scales to 90% on mobile
const ResponsiveIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  overflow: visible; /* Change to visible to allow popups to extend beyond iframe */
  position: absolute;
  top: 0;
  left: 0;
  
  @media (max-width: 768px) {
    transform: scale(0.9); /* Scale to 90% on mobile */
    transform-origin: 0 0;
    width: 111.11%; /* Compensate for scaling to maintain full width (100% ÷ 0.9 = 111.11%) */
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

const ManageLiquidityPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('800px');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add custom CSS to handle wallet popups
  useEffect(() => {
    // Create a style element to inject custom CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Override any z-index issues that might prevent interaction */
      .wallet-adapter-modal {
        z-index: 9999 !important;
      }
      
      /* Make sure Raydium wallet selector is scrollable on mobile */
      iframe {
        pointer-events: auto !important;
      }
      
      body {
        overflow: auto !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Handle iframe load event with improved height management
  const handleIframeLoad = () => {
    setIsLoaded(true);
    
    // Function to check if we can access the iframe content
    const canAccessIframe = () => {
      try {
        // Try to access the iframe contentWindow
        return !!iframeRef.current?.contentWindow?.document;
      } catch (e) {
        return false;
      }
    };
    
    // Update height based on iframe content or set a fixed height
    const updateHeight = () => {
      // Get the iframe element
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      // Try to get the content height if we can access the iframe
      if (canAccessIframe()) {
        try {
          const height = iframe.contentWindow?.document.body.scrollHeight + 'px';
          setIframeHeight(height);
          if (containerRef.current) {
            containerRef.current.style.height = height;
          }
        } catch (e) {
          console.log("Could not access iframe content height");
          setDefaultHeight();
        }
      } else {
        // If we can't access the iframe content, set a larger default height
        setDefaultHeight();
      }
    };
    
    // Set a default height based on screen size
    const setDefaultHeight = () => {
      const height = window.innerWidth <= 768 ? '1500px' : '1000px';
      setIframeHeight(height);
      if (containerRef.current) {
        containerRef.current.style.height = height;
      }
    };

    // Initial height update
    updateHeight();
    
    // Update height when window is resized
    window.addEventListener('resize', updateHeight);
    
    // Set up interval to check for height changes
    const interval = setInterval(updateHeight, 1000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateHeight);
    };
  };

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
          
          <IframeContainer ref={containerRef} isLoaded={isLoaded} style={{ height: iframeHeight }}>
            <LoadingOverlay isLoading={!isLoaded}>
              <LoadingSpinner />
            </LoadingOverlay>
            <ResponsiveIframe 
              ref={iframeRef}
              src="https://raydium.io/portfolio/" 
              title="Manage Liquidity on Raydium" 
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin"
              onLoad={handleIframeLoad}
              allow="fullscreen"
            />
          </IframeContainer>
        </ContentWrapper>
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default ManageLiquidityPage;
