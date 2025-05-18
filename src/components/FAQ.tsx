import { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  border: 1px solid var(--border-color);
  text-align: left;
  margin-bottom: 40px;
`;

const FAQTitle = styled.h2`
  font-size: 28px;
  color: var(--primary-blue);
  margin-bottom: 20px;
  font-weight: 600;
`;

const FAQItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(40, 50, 70, 0.3);
    padding-left: 10px;
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlusIcon = styled.div`
  color: var(--primary-blue);
  font-size: 24px;
  transition: transform 0.3s ease;
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  padding: 15px 0 0 0;
  color: var(--text-light);
  line-height: 1.5;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What is Solana, and why should I launch my token on it?',
      answer: 'Solana is a high-performance blockchain platform known for its fast transactions, low fees, and scalability. It\'s an excellent choice for launching tokens due to its growing ecosystem, strong developer community, and widespread adoption in the crypto space.'
    },
    {
      question: 'How can I create a token on the Solana blockchain?',
      answer: 'Creating a token on Solana is straightforward with our platform. Simply connect your wallet, fill in your token details (name, symbol, supply, etc.), customize settings if needed, and submit. Our tool handles all the technical aspects of token creation for you.'
    },
    {
      question: 'What are the steps to deploy my own token on Solana?',
      answer: 'The process involves: 1) Connecting your Solana wallet, 2) Providing token details like name and symbol, 3) Setting the supply and decimals, 4) Uploading token image and metadata, 5) Configuring optional settings like freeze authority, and 6) Confirming the transaction. Our platform guides you through each step.'
    },
    {
      question: 'How can I manage token authorities on Solana?',
      answer: 'Token authorities on Solana can be managed through our platform. You can set and revoke different authorities like freeze, mint, and update authority during token creation. These settings determine who can perform certain actions with your token after deployment.'
    },
    {
      question: 'What platforms can assist with launching a token on Solana?',
      answer: 'There are several platforms available, including CoinFast (our platform), which provides a user-friendly interface for token creation. Other options include Solana\'s CLI tools and various development frameworks, but our platform offers the most straightforward solution for non-technical users.'
    }
  ];

  return (
    <FAQContainer>
      <FAQTitle>Frequently Asked Questions</FAQTitle>
      {faqItems.map((item, index) => (
        <FAQItem key={index} onClick={() => toggleFAQ(index)}>
          <FAQQuestion>
            <div>{item.question}</div>
            <PlusIcon>{openIndex === index ? '−' : '+'}</PlusIcon>
          </FAQQuestion>
          <FAQAnswer isOpen={openIndex === index}>{item.answer}</FAQAnswer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
