import styled from 'styled-components';

const FooterContainer = styled.div`
  text-align: center;
  padding: 30px;
  color: var(--text-light);
  font-size: 14px;
  border-top: 1px solid var(--border-color);
  line-height: 1.6;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FooterLink = styled.a`
  color: #4a8eff;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterContainer>
      FOLLOW OUR OFFICIAL <FooterLink href="#">X ACCOUNT</FooterLink> AND <FooterLink href="#">TELEGRAM CHANNEL</FooterLink> FOR UPDATES
      <br /><br />
      CoinFast is a token creation platform that allows users to generate Solana-based tokens instantly, with no coding required. CoinFast does not issue, endorse, manage, or provide liquidity for any tokens created using our service. We do not provide financial advice, investment recommendations, or guarantees of value, price, or returns on any tokens. Tokens created on CoinFast are not securities, and users are solely responsible for ensuring compliance with applicable laws and regulations in their jurisdiction. CoinFast does not facilitate token trading, fundraising, or liquidity provision. By using CoinFast, you acknowledge that creating and trading tokens carry significant risks, including loss of funds, market volatility, and regulatory uncertainty. CoinFast is provided "as is" without warranties of any kind. We are not responsible for any outcomes related to the use of our platform. By using CoinFast, you accept full responsibility for your actions and any consequences that may arise. Always conduct your own due diligence before engaging with any token or project.
      <br /><br />
      © 2025 CoinFast | All Rights Reserved | Support on Telegram <FooterLink href="#">@coinfastofficial</FooterLink> | Become an affiliate for CoinFast
    </FooterContainer>
  );
};

export default Footer;
