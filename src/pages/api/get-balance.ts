import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey } from '@solana/web3.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.query;
  
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address' });
  }

  try {
    // Use your Helius RPC endpoint
    if (!process.env.RPC_URL) {
      return res.status(500).json({ error: 'Server configuration error: RPC URL not set' });
    }
    
    const connection = new Connection(process.env.RPC_URL);
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    
    return res.status(200).json({ balance });
  } catch (error: any) {
    console.error('Error fetching balance:', error);
    return res.status(500).json({ error: error.message });
  }
}
