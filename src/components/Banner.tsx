import styled from 'styled-components';

const BannerContainer = styled.div`
  background: linear-gradient(90deg, #4a8eff, #8964ff, #c353ff);
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.2px;
`;

const Banner = () => {
  return (
    <BannerContainer>
      CREATE YOUR COIN FOR ONLY 0.1 SOL, FAST!
    </BannerContainer>
  );
};

export default Banner;
