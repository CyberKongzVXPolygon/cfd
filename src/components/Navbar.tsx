import { useState } from 'react';
import styled from 'styled-components';
import { ConnectWallet } from "@thirdweb-dev/react";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  border-bottom: 1px solid var(--border-color);
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <NavbarContainer>
        <MenuIcon onClick={() => setIsMenuOpen(true)}>☰</MenuIcon>
        <Logo>CoinFast</Logo>
        <NavLinks>
          <NavLink href="#">Create Token</NavLink>
          <NavLink href="#">Trending Tokens <NewBadge>SOON</NewBadge></NavLink>
          <NavLink href="https://raydium.io/liquidity/create-pool/" target="_blank">Create Liquidity</NavLink>
          <NavLink href="https://raydium.io/portfolio/" target="_blank">Manage Liquidity</NavLink>
        </NavLinks>
        <WalletButtonWrapper>
          <ConnectWallet 
            theme="dark" 
            btnTitle="Connect Wallet"
            modalSize="compact"
          />
        </WalletButtonWrapper>
      </NavbarContainer>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileMenuClose onClick={() => setIsMenuOpen(false)}>✕</MobileMenuClose>
        <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Create Token</MobileNavLink>
        <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Trending Tokens <NewBadge>SOON</NewBadge></MobileNavLink>
        <MobileNavLink href="https://raydium.io/liquidity/create-pool/" target="_blank" onClick={() => setIsMenuOpen(false)}>Create Liquidity</MobileNavLink>
        <MobileNavLink href="https://raydium.io/portfolio/" target="_blank" onClick={() => setIsMenuOpen(false)}>Manage Liquidity</MobileNavLink>
        <MobileWalletButtonWrapper>
          <ConnectWallet 
            theme="dark" 
            btnTitle="Connect Wallet"
            modalSize="compact"
          />
        </MobileWalletButtonWrapper>
      </MobileMenu>
    </>
  );
};

export default Navbar;
