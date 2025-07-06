
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
                <p>
                  Omnipad operates as a client-side application. We do not collect, store, or process personal 
                  information on our servers. All token creation and management happens locally in your browser 
                  and directly on the Solana blockchain.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Local Storage</h2>
                <p>
                  Some data may be stored locally in your browser for functionality purposes, such as recently 
                  created tokens for the current session. This data remains on your device and is not transmitted 
                  to our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Blockchain Interactions</h2>
                <p>
                  When you create tokens or add liquidity, these transactions are recorded on the Solana blockchain, 
                  which is public and immutable. We do not control this data once it's on the blockchain.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Third-Party Services</h2>
                <p>
                  We may use third-party services for analytics or functionality. These services may have their 
                  own privacy policies, and we encourage you to review them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Security</h2>
                <p>
                  Since we don't collect personal data, there's minimal risk to your privacy from our platform. 
                  However, you should always protect your wallet private keys and transaction signatures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Changes to Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify users of any significant 
                  changes by posting the new policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our official channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
