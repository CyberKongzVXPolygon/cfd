import styled from 'styled-components';

const StepsBoxContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  border: 1px solid var(--border-color);
  text-align: left;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const StepsTitle = styled.h2`
  font-size: 28px;
  color: var(--primary-blue);
  margin-bottom: 20px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 22px;
    background: linear-gradient(90deg, #4a8eff, #c353ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StepsSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StepsList = styled.ol`
  padding-left: 20px;
`;

const Step = styled.li`
  margin-bottom: 15px;
  color: #d1d7e0;
  position: relative;
  padding-left: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }

  &::marker {
    color: var(--primary-blue);
    font-weight: bold;
  }
`;

const PriceInfo = styled.div`
  color: var(--text-light);
  margin-top: 20px;
  line-height: 1.6;
`;

const PriceHighlight = styled.span`
  color: var(--accent-cyan);
  font-weight: bold;
`;

const TrendingHighlight = styled.span`
  color: #c353ff;
  font-weight: bold;
`;

const StepsBox = () => {
  return (
    <StepsBoxContainer>
      <StepsTitle>How to use Solana Token Creator</StepsTitle>
      <StepsSubtitle>Follow these simple steps:</StepsSubtitle>
      <StepsList>
        <Step>Connect your Solana wallet.</Step>
        <Step>Write the name you want for your Token.</Step>
        <Step>Write the symbol (max 8 characters)</Step>
        <Step>Upload the image for your token (max 5MB)</Step>
        <Step>Select the decimals quantity (9 is usually used for meme tokens).</Step>
        <Step>Type in the total supply your token should have.</Step>
        <Step>Write the description you want for your SPL Token.</Step>
        <Step>On step 3 fill in the remaining details about your token</Step>
        <Step>Choose if you want to leave the revoke options turned on or off</Step>
        <Step>Click on Create, accept the transaction, and wait until your token is ready.</Step>
      </StepsList>
      <PriceInfo>
        The cost of creating a regular Token is <PriceHighlight>0.1 SOL</PriceHighlight>, which includes all fees needed for the SPL Token creation.
      </PriceInfo>
      <PriceInfo>
        Creating a <TrendingHighlight>trending token</TrendingHighlight> costs <PriceHighlight>only 0.1 SOL</PriceHighlight> and includes <TrendingHighlight>1 billion supply</TrendingHighlight>, 9 decimals with all 3 revoke options (freeze, mint, update) turned on by default.
      </PriceInfo>
      <PriceInfo>
        The creation process will start and will take some seconds. After that, you will receive the total supply of the token in the wallet you chose.
      </PriceInfo>
    </StepsBoxContainer>
  );
};

export default StepsBox;
