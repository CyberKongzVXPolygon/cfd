import { Connection, ConnectionConfig, Commitment } from '@solana/web3.js';

// Custom connection class that proxies requests through our API
export class ProxyConnection extends Connection {
  constructor(commitment?: Commitment | ConnectionConfig, endpoint = '/api/rpc-proxy') {
    super(endpoint, commitment);
    this.endpoint = endpoint;
  }

  private endpoint: string;

  // Override the RPC request method to use our proxy
  async _rpcRequest(method: string, args: any[]): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      id: 1,
      method,
      params: args,
    };

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || 'RPC Error');
    }

    return data;
  }
}
