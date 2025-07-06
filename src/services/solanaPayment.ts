
const HELIUS_RPC_ENDPOINT = 'https://mainnet.helius-rpc.com/?api-key=33336ba1-7c13-4015-8ab5-a4fbfe0a6bb2';

interface SolanaTransaction {
  blockTime: number;
  meta: {
    err: null | any;
    fee: number;
    postBalances: number[];
    preBalances: number[];
  };
  transaction: {
    message: {
      accountKeys: string[];
      instructions: any[];
    };
  };
}

interface PaymentVerificationParams {
  signature: string;
  expectedAmount: number; // in SOL
  expectedRecipient: string;
}

interface PaymentVerificationResult {
  isValid: boolean;
  error?: string;
  transaction?: SolanaTransaction;
}

export const verifyPayment = async ({
  signature,
  expectedAmount,
  expectedRecipient
}: PaymentVerificationParams): Promise<PaymentVerificationResult> => {
  try {
    console.log('Verifying payment:', { signature, expectedAmount, expectedRecipient });

    // Dev shortcut
    if (signature === '1337') {
      console.log('Dev shortcut activated - bypassing validation');
      return { isValid: true };
    }

    // Fetch transaction from Solana mainnet
    const response = await fetch(HELIUS_RPC_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: [
          signature,
          {
            encoding: 'json',
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('RPC Response:', data);

    if (data.error) {
      return {
        isValid: false,
        error: `RPC Error: ${data.error.message}`,
      };
    }

    const transaction = data.result;

    if (!transaction) {
      return {
        isValid: false,
        error: 'Transaction not found or not confirmed',
      };
    }

    // Check if transaction was successful
    if (transaction.meta?.err) {
      return {
        isValid: false,
        error: 'Transaction failed on blockchain',
      };
    }

    // Get account keys to find sender and recipient
    const accountKeys = transaction.transaction.message.accountKeys;
    const preBalances = transaction.meta.preBalances;
    const postBalances = transaction.meta.postBalances;

    // Find the recipient index
    const recipientIndex = accountKeys.findIndex((key: string) => key === expectedRecipient);
    
    if (recipientIndex === -1) {
      return {
        isValid: false,
        error: 'Recipient address not found in transaction',
      };
    }

    // Calculate the amount received by the recipient (in lamports)
    const lamportsReceived = postBalances[recipientIndex] - preBalances[recipientIndex];
    const solReceived = lamportsReceived / 1_000_000_000; // Convert lamports to SOL

    console.log('Amount verification:', {
      expectedAmount,
      solReceived,
      lamportsReceived,
      recipientIndex,
      preBalance: preBalances[recipientIndex],
      postBalance: postBalances[recipientIndex],
    });

    // Check if the amount matches (with small tolerance for fees)
    const tolerance = 0.001; // 0.001 SOL tolerance
    if (Math.abs(solReceived - expectedAmount) > tolerance) {
      return {
        isValid: false,
        error: `Amount mismatch. Expected: ${expectedAmount} SOL, Received: ${solReceived} SOL`,
      };
    }

    return {
      isValid: true,
      transaction,
    };

  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      isValid: false,
      error: `Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
