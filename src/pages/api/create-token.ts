import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, Transaction } from '@solana/web3.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { signedTransaction, network } = req.body;
    
    // Use server-side environment variable (not exposed to client)
    const rpcEndpoint = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
    
    // Create connection
    const connection = new Connection(rpcEndpoint);
    
    // Send the transaction
    const signature = await connection.sendRawTransaction(
      Buffer.from(signedTransaction, 'base64')
    );
    
    return res.status(200).json({ signature });
  } catch (error: any) {
    console.error('Error processing transaction:', error);
    return res.status(500).json({ error: error.message });
  }
}
