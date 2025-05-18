import styled from 'styled-components';

const BannerContainer = styled.div`
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

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      CREATE YOUR COIN FOR ONLY 0.1 SOL, FAST!
    </BannerContainer>
  );
};

export default Banner;
