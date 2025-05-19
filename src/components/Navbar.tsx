import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(15, 21, 40, 0.9);
  backdrop-filter: blur(10px);
  position: relative;
  transition: margin-top 0.3s ease;

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
  color: var(--text-light);
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  position: relative;
  padding: 5px 0;

  &:hover {
    color: var(--text-white);
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

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  color: var(--text-white);
  cursor: pointer;
  z-index: 101;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 21, 40, 0.95);
  z-index: 100;
  padding: 80px 30px 30px;
  flex-direction: column;
  align-items: center;
`;

const MobileMenuClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: var(--text-white);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 102;
`;

const MobileNavLink = styled.a`
  color: var(--text-white);
  text-decoration: none;
  font-size: 20px;
  margin-bottom: 20px;
  position: relative;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`;

const WalletButtonWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileWalletButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PhantomBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(78, 68, 206, 0.95);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const PhantomButton = styled.button`
  background: white;
  color: #4e44ce;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

const BannerText = styled.div`
  font-size: 14px;
  flex-grow: 1;
  margin-right: 10px;
`;

const BannerActions = styled.div`
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPhantomBanner, setShowPhantomBanner] = useState(false);

  useEffect(() => {
    // Check if on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if already in Phantom browser
    const isInPhantomBrowser = /phantom/i.test(navigator.userAgent);
    
    // Show banner if on mobile but not in Phantom browser
    if (isMobile && !isInPhantomBrowser) {
      setShowPhantomBanner(true);
    }
  }, []);

  const openInPhantomBrowser = () => {
    // Using the format from search result #5 with the correct URL
    const encodedUrl = encodeURIComponent('https://coinfastfun.vercel.app');
    
    // Format modeled after the working example in search result #5
    const phantomUrl = `https://phantom.app/ul/browse/${encodedUrl}?ref=coinfastfun://app`;
    
    // Try to open the URL
    try {
      window.location.href = phantomUrl;
    } catch (error) {
      console.error("Error opening Phantom:", error);
      // Fallback to direct app store link if deep linking fails
      window.location.href = 'https://phantom.app/download';
    }
  };

  return (
    <>
      {showPhantomBanner && (
        <PhantomBanner>
          <BannerText>
            For the best experience, open this site in the Phantom wallet browser
          </BannerText>
          <BannerActions>
            <PhantomButton onClick={openInPhantomBrowser}>
              Open in Phantom
            </PhantomButton>
            <CloseButton onClick={() => setShowPhantomBanner(false)}>
              Skip
            </CloseButton>
          </BannerActions>
        </PhantomBanner>
      )}

      <NavbarContainer style={{ marginTop: showPhantomBanner ? '60px' : '0' }}>
        <MenuIcon onClick={() => setIsMenuOpen(true)}>☰</MenuIcon>
        <Logo>CoinFast</Logo>
        <NavLinks>
          <NavLink href="#">Create Token</NavLink>
          <NavLink href="#">Trending Tokens <NewBadge>SOON</NewBadge></NavLink>
          <NavLink href="https://raydium.io/liquidity/create-pool/" target="_blank">Create Liquidity</NavLink>
          <NavLink href="https://raydium.io/portfolio/" target="_blank">Manage Liquidity</NavLink>
        </NavLinks>
        <WalletButtonWrapper>
          <WalletMultiButton />
        </WalletButtonWrapper>
      </NavbarContainer>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileMenuClose onClick={() => setIsMenuOpen(false)}>✕</MobileMenuClose>
        <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Create Token</MobileNavLink>
        <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Trending Tokens <NewBadge>SOON</NewBadge></MobileNavLink>
        <MobileNavLink href="https://raydium.io/liquidity/create-pool/" target="_blank" onClick={() => setIsMenuOpen(false)}>Create Liquidity</MobileNavLink>
        <MobileNavLink href="https://raydium.io/portfolio/" target="_blank" onClick={() => setIsMenuOpen(false)}>Manage Liquidity</MobileNavLink>
        <MobileWalletButtonWrapper>
          <WalletMultiButton />
        </MobileWalletButtonWrapper>
      </MobileMenu>
    </>
  );
};

export default Navbar;
