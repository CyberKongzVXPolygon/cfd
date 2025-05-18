import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.RPC_URL) {
      return res.status(500).json({ error: 'Server configuration error: RPC URL not set' });
    }

    // Forward the request to your Helius RPC endpoint
    const response = await fetch(process.env.RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error proxying RPC request:', error);
    return res.status(500).json({ error: error.message });
  }
}
