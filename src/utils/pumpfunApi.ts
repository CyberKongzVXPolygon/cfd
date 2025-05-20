// src/utils/pumpfunApi.ts

export interface PumpFunToken {
  id: string;
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  image?: string;
}

// Function to fetch trending tokens from pump.fun
export async function fetchTrendingTokens(): Promise<PumpFunToken[]> {
  // In a real implementation, you would call the pump.fun API using fetch
  // For example:
  // const response = await fetch('https://frontend-api.pump.fun/coins/featured/24h');
  // const data = await response.json();
  // return data.map(...) to format the data

  // For now, return mock data
  return [
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
  ];
}
