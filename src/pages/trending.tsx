import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 60px;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  background: linear-gradient(90deg, #4a8eff 0%, #9364ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: 
    gradientAnimation 5s ease infinite,
    floatingAnimation 3s ease-in-out infinite;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-light);
  font-size: 18px;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  strong {
    color: var(--text-white);
  }
`;

const TokenGrid = styled.div`
  margin-top: 30px;
`;

const TokenCard = styled.div`
  background-color: rgba(15, 23, 42, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(42, 58, 90, 0.5);
  padding: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(74, 142, 255, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TokenIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(30, 40, 60, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-white);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TokenDetails = styled.div`
  max-width: 600px;
`;

const TokenName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: var(--text-white);
    margin-right: 12px;
  }

  span {
    background-color: rgba(30, 40, 60, 0.8);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const TokenDescription = styled.p`
  color: var(--text-light);
  font-size: 15px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const MarketCap = styled.div`
  text-align: right;
  margin-bottom: 10px;

  p {
    color: var(--text-light);
    font-size: 14px;
    margin-bottom: 4px;
  }

  span {
    font-size: 20px;
    font-weight: 700;
    color: #4caf50;
  }
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 150px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 142, 255, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 40, 60, 0.5);
  color: var(--text-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 6px;
  margin-right: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(40, 50, 70, 0.5);
    color: var(--text-white);
  }
`;

const RefreshButton = styled.button`
  background: transparent;
  color: var(--text-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(30, 40, 60, 0.5);
    color: var(--text-white);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  color: var(--text-light);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 8px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.active ? 'rgba(74, 142, 255, 0.2)' : 'rgba(30, 40, 60, 0.5)'};
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--text-light)'};
  border: 1px solid ${props => props.active ? 'var(--primary-blue)' : 'var(--border-color)'};
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(74, 142, 255, 0.1);
    color: var(--primary-blue);
  }
`;

interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  image?: string;
}

const TrendingPage = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchTrendingTokens();
  }, []);

  const fetchTrendingTokens = async () => {
    setLoading(true);
    
    try {
      // We would normally fetch from the pump.fun API here
      // Using hardcoded data for now
      setTimeout(() => {
        setTokens([
          {
            id: 'nyro',
            name: 'NYRO',
            symbol: 'NYRO',
            description: 'NYRO, a crypto god that has existed since the dawn of time, has been resurrected and has come to save traders of all sizes to show them their...',
            marketCap: 20520,
            image: '/images/nyro.png',
          },
          {
            id: 'webicasso',
            name: 'Webicasso AI',
            symbol: 'WEBICASSO',
            description: 'AI-powered creative platform revolutionizing digital art with advanced algorithms and unique style transfer capabilities',
            marketCap: 35800,
            image: '/images/webicasso.png',
          },
          {
            id: 'solion',
            name: 'Solana Lion',
            symbol: 'SOLION',
            description: 'The king of the Solana jungle, bringing fierce trading power and community strength to DeFi',
            marketCap: 45200,
            image: '/images/solion.png',
          },
          {
            id: 'solanameme',
            name: 'Solana Meme',
            symbol: 'SOMEME',
            description: 'The definitive meme token of the Solana ecosystem, focusing on community engagement and viral potential',
            marketCap: 128500,
            image: '/images/solanameme.png',
          },
          {
            id: 'cryptoape',
            name: 'Crypto Ape',
            symbol: 'CAPE',
            description: 'Join the ape revolution with this community-driven token focused on NFT integrations and metaverse development',
            marketCap: 95700,
            image: '/images/cryptoape.png',
          },
          {
            id: 'solcat',
            name: 'Solana Cat',
            symbol: 'SCAT',
            description: 'The first feline-themed token on Solana with unique tokenomics and community governance',
            marketCap: 67400,
            image: '/images/solcat.png',
          },
          {
            id: 'futurecity',
            name: 'Future City',
            symbol: 'FCITY',
            description: 'Building the decentralized metaverse cities of the future on Solana with integrated DAO governance',
            marketCap: 112300,
            image: '/images/futurecity.png',
          },
          {
            id: 'pixelworld',
            name: 'Pixel World',
            symbol: 'PIXL',
            description: 'Retro-style pixel art and gaming platform with play-to-earn mechanics on Solana',
            marketCap: 83600,
            image: '/images/pixelworld.png',
          },
          {
            id: 'solarmoon',
            name: 'Solar Moon',
            symbol: 'SMOON',
            description: 'Bringing celestial tokenomics to Solana with reflection rewards and automatic liquidity generation',
            marketCap: 47900,
            image: '/images/solarmoon.png',
          },
          {
            id: 'cosmicgem',
            name: 'Cosmic Gem',
            symbol: 'CSGEM',
            description: 'Rare and valuable token with limited supply and deflationary mechanisms to increase scarcity',
            marketCap: 58200,
            image: '/images/cosmicgem.png',
          },
          {
            id: 'shibasolana',
            name: 'Shiba Solana',
            symbol: 'SHIBSOL',
            description: 'The Shiba Inu of Solana bringing dog-themed meme power to the fastest blockchain',
            marketCap: 143500,
            image: '/images/shibasolana.png',
          },
          {
            id: 'samoyed',
            name: 'Samoyed',
            symbol: 'SAMO',
            description: 'The friendliest and fluffiest dog on Solana with a mission to welcome newcomers to the ecosystem',
            marketCap: 167200,
            image: '/images/samoyed.png',
          },
          {
            id: 'spacerocket',
            name: 'Space Rocket',
            symbol: 'ROCKET',
            description: 'Blasting off to the moon with innovative DeFi mechanisms and interstellar tokenomics',
            marketCap: 72400,
            image: '/images/spacerocket.png',
          },
          {
            id: 'metaverse',
            name: 'Meta Verse',
            symbol: 'MVERSE',
            description: 'Building the next generation of virtual reality experiences on Solana\'s high-performance blockchain',
            marketCap: 126800,
            image: '/images/metaverse.png',
          },
          {
            id: 'cryptowarrior',
            name: 'Crypto Warrior',
            symbol: 'WARR',
            description: 'Battle-tested token with gamified mechanics and tournament rewards for the crypto fighting community',
            marketCap: 42100,
            image: '/images/cryptowarrior.png',
          },
          {
            id: 'solgames',
            name: 'Solana Games',
            symbol: 'SGAME',
            description: 'The premier gaming platform on Solana with in-game assets and cross-game compatibility',
            marketCap: 89700,
            image: '/images/solgames.png',
          },
          {
            id: 'defipower',
            name: 'DeFi Power',
            symbol: 'DPOW',
            description: 'Empowering decentralized finance with advanced yield farming and liquidity solutions',
            marketCap: 105600,
            image: '/images/defipower.png',
          },
          {
            id: 'solsea',
            name: 'Solana Ocean',
            symbol: 'SOLOCEAN',
            description: 'Diving deep into DeFi liquidity with ocean-themed tokenomics and conservation initiatives',
            marketCap: 63800,
            image: '/images/solsea.png',
          },
          {
            id: 'aitoken',
            name: 'AI Token',
            symbol: 'AIT',
            description: 'Leveraging artificial intelligence for predictive analytics and optimized trading algorithms',
            marketCap: 118900,
            image: '/images/aitoken.png',
          },
          {
            id: 'farmtoken',
            name: 'Farm Token',
            symbol: 'FARM',
            description: 'Sustainable yield farming with real-world agricultural connections and community-owned farms',
            marketCap: 51300,
            image: '/images/farmtoken.png',
          },
          {
            id: 'solmars',
            name: 'Solana Mars',
            symbol: 'SMARS',
            description: 'The first Mars colony token on Solana with plans for interplanetary blockchain expansion',
            marketCap: 87500,
            image: '/images/solmars.png',
          },
          {
            id: 'cybercity',
            name: 'Cyber City',
            symbol: 'CYBER',
            description: 'Futuristic cyberpunk-themed token with integrated NFT marketplace and virtual reality districts',
            marketCap: 79200,
            image: '/images/cybercity.png',
          },
          {
            id: 'dragonfire',
            name: 'Dragon Fire',
            symbol: 'DFIRE',
            description: 'Mythical token with burn mechanics that increase scarcity with every transaction',
            marketCap: 56700,
            image: '/images/dragonfire.png',
          },
          {
            id: 'solarwind',
            name: 'Solar Wind',
            symbol: 'SWIND',
            description: 'Renewable energy-focused token with carbon offset initiatives and green mining incentives',
            marketCap: 69300,
            image: '/images/solarwind.png',
          },
          {
            id: 'cryptogold',
            name: 'Crypto Gold',
            symbol: 'CGOLD',
            description: 'Digital gold standard with fixed supply and stability mechanisms to preserve value',
            marketCap: 132400,
            image: '/images/cryptogold.png',
          },
          {
            id: 'solanagems',
            name: 'Solana Gems',
            symbol: 'SGEMS',
            description: 'Collection of rare digital gems with unique properties and collectible value on the blockchain',
            marketCap: 48600,
            image: '/images/solanagems.png',
          },
          {
            id: 'ninjawarrior',
            name: 'Ninja Warrior',
            symbol: 'NINJA',
            description: 'Stealthy token with rapid transactions and privacy features for the security-conscious trader',
            marketCap: 71800,
            image: '/images/ninjawarrior.png',
          },
          {
            id: 'musicnft',
            name: 'Music NFT',
            symbol: 'MNFT',
            description: 'Revolutionizing the music industry with artist-owned streaming, royalties and exclusive content',
            marketCap: 94500,
            image: '/images/musicnft.png',
          },
          {
            id: 'cryptosport',
            name: 'Crypto Sport',
            symbol: 'CSPORT',
            description: 'Bringing sports betting and fantasy leagues to the blockchain with transparent odds and instant payouts',
            marketCap: 82100,
            image: '/images/cryptosport.png',
          },
          {
            id: 'magicspell',
            name: 'Magic Spell',
            symbol: 'SPELL',
            description: 'Enchanted token with magical properties and community governance for feature development',
            marketCap: 59800,
            image: '/images/magicspell.png',
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      setLoading(false);
    }
  };

  const handleCreateCoin = (token: Token) => {
    // Create URL with parameters to pre-fill the form
    router.push(`/?tokenName=${encodeURIComponent(token.name)}&tokenSymbol=${encodeURIComponent(token.symbol)}&tokenDescription=${encodeURIComponent(token.description)}`);
  };

  // Calculate pagination
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokens.slice(indexOfFirstToken, indexOfLastToken);
  const totalPages = Math.ceil(tokens.length / tokensPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PageContainer>
      <Head>
        <title>Trending Tokens | CoinFast</title>
        <meta name="description" content="Explore and copy trending tokens from pump.fun and launch them instantly on Solana." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Navbar />

      <MainContent>
        <PageTitle>Copy Trending Tokens FAST</PageTitle>
        <Subtitle>
          Copy trending Pump.fun tokens and launch them on Raydium <strong>instantly!</strong> If you 
          create a token it will have <strong>all 3 revoke options turned ON automatically.</strong>
        </Subtitle>

        <RefreshButton onClick={fetchTrendingTokens}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </RefreshButton>

        <TokenGrid>
          {loading ? (
            <LoadingContainer>Loading trending tokens...</LoadingContainer>
          ) : (
            currentTokens.map((token) => (
              <TokenCard key={token.id}>
                <TokenInfo>
                  <TokenIcon>
                    {token.image ? (
                      <img src={token.image} alt={token.name} />
                    ) : (
                      token.symbol.substring(0, 2)
                    )}
                  </TokenIcon>
                  <TokenDetails>
                    <TokenName>
                      <h3>{token.name}</h3>
                      <span>{token.symbol}</span>
                    </TokenName>
                    <TokenDescription>{token.description}</TokenDescription>
                  </TokenDetails>
                </TokenInfo>
                <ActionArea>
                  <MarketCap>
                    <p>Market Cap</p>
                    <span>${token.marketCap.toLocaleString()}</span>
                  </MarketCap>
                  <CreateButton onClick={() => handleCreateCoin(token)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Coin
                  </CreateButton>
                </ActionArea>
              </TokenCard>
            ))
          )}
        </TokenGrid>

        {!loading && (
          <PaginationContainer>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationButton
                key={index}
                onClick={() => paginate(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </PaginationContainer>
        )}
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default TrendingPage;
