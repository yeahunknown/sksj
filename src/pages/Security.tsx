
import Layout from '@/components/Layout';

const Security = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Security</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. No Private Key Access</h2>
                <p>
                  Omnipad does not have access to your private keys, seed phrases, or wallet credentials. 
                  All wallet interactions are handled directly by your browser wallet extension (such as Phantom or Solflare).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. User-Initiated Transactions</h2>
                <p>
                  All blockchain transactions must be explicitly approved by you through your wallet interface. 
                  Omnipad cannot initiate transactions on your behalf without your direct consent and signature.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. No Backend Wallet Storage</h2>
                <p>
                  We do not store any wallet information, balances, or transaction history on our servers. 
                  All financial data is retrieved directly from the Solana blockchain when needed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Smart Contract Interactions</h2>
                <p>
                  Token creation and liquidity operations use standard Solana Program Library (SPL) protocols. 
                  These are well-audited and widely used across the Solana ecosystem.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. User Responsibility</h2>
                <p>
                  Users are responsible for:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Keeping their private keys and seed phrases secure</li>
                  <li>Verifying transaction details before signing</li>
                  <li>Using reputable wallet software</li>
                  <li>Being aware of phishing attempts and scams</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Platform Security</h2>
                <p>
                  Our platform uses industry-standard security practices including HTTPS encryption, 
                  secure coding practices, and regular security reviews.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Reporting Security Issues</h2>
                <p>
                  If you discover a security vulnerability, please report it to us immediately through 
                  our official communication channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
