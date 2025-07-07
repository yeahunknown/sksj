
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Omnipad, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Service Description</h2>
                <p>
                  Omnipad is a platform that facilitates the creation of SPL tokens on the Solana blockchain. 
                  We provide tools and interfaces to help users deploy tokens, but we do not control the blockchain itself.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Token Creation Disclaimers</h2>
                <p>
                  Users are solely responsible for tokens they create. Omnipad does not guarantee the success, 
                  legality, or compliance of any token created through our platform. Users must ensure their 
                  tokens comply with all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitations of Liability</h2>
                <p>
                  Omnipad shall not be liable for any direct, indirect, incidental, special, consequential, 
                  or exemplary damages resulting from the use or inability to use our service, including but 
                  not limited to financial losses, token failures, or blockchain network issues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. User Responsibilities</h2>
                <p>
                  Users are responsible for maintaining the security of their wallets, private keys, and any 
                  tokens created. Omnipad does not store or have access to user private keys or funds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Modifications</h2>
                <p>
                  Omnipad reserves the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting to the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us through our official channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
