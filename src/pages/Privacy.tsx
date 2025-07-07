
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-8 text-gray-300 select-text">
              <section className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">IMPORTANT NOTICE</h2>
                <p className="text-yellow-300 font-semibold">
                  OMNIPAD PROVIDES NO GUARANTEE OF SERVICE OR DATA PROTECTION. USERS ARE RESPONSIBLE FOR THEIR OWN PRIVACY 
                  AND SECURITY. USE THIS PLATFORM AT YOUR OWN RISK.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Information Collection</h2>
                <p className="mb-4">
                  Omnipad operates as a client-side decentralized application. We prioritize user privacy and minimize data collection:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Personal Information:</strong> We do not collect, store, or process personal information on our servers</li>
                  <li><strong>Wallet Data:</strong> We never access your private keys, seed phrases, or wallet credentials</li>
                  <li><strong>Transaction Data:</strong> All transactions occur directly on the Solana blockchain, not through our servers</li>
                  <li><strong>Token Creation:</strong> Token metadata and creation parameters are processed locally in your browser</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Local Storage</h2>
                <p className="mb-4">
                  Limited data may be stored locally in your browser for functionality purposes:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Recently created token information (current session only)</li>
                  <li>User interface preferences (theme, language settings)</li>
                  <li>Temporary form data to improve user experience</li>
                </ul>
                <p className="text-green-400">
                  This data remains on your device and is never transmitted to our servers or third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Blockchain Interactions</h2>
                <p className="mb-4">
                  When you use Omnipad to interact with the Solana blockchain:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>All transactions are recorded on the public Solana blockchain</li>
                  <li>Blockchain data is immutable and publicly accessible</li>
                  <li>We do not control or own this data once it's on the blockchain</li>
                  <li>Anyone can view transaction history using your wallet address</li>
                </ul>
                <p className="text-yellow-400">
                  Remember: Blockchain transactions are permanent and public by design.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. No Guarantee of Privacy</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  WE PROVIDE NO GUARANTEES REGARDING DATA PRIVACY OR SECURITY. Users assume all risks related to privacy breaches, 
                  data exposure, or unauthorized access to their information.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Third-party services may collect additional data</li>
                  <li>Browser vulnerabilities could expose local data</li>
                  <li>Network attacks could compromise communications</li>
                  <li>Regulatory authorities may access blockchain data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
                <p className="mb-4">
                  We may integrate with third-party services for enhanced functionality:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Wallet Providers:</strong> Phantom, Solflare, etc. (governed by their privacy policies)</li>
                  <li><strong>Blockchain RPC Providers:</strong> For reading blockchain data</li>
                  <li><strong>Image Hosting:</strong> For token logos and metadata</li>
                  <li><strong>Analytics:</strong> Basic usage statistics (anonymized)</li>
                </ul>
                <p>
                  We encourage you to review the privacy policies of any third-party services you choose to use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Security Limitations</h2>
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-300 font-semibold">
                    NO SYSTEM IS 100% SECURE. WE ASSUME NO LIABILITY FOR DATA BREACHES OR SECURITY INCIDENTS.
                  </p>
                </div>
                <p className="mb-4">
                  Despite security measures, risks remain:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Blockchain and smart contract vulnerabilities</li>
                  <li>Third-party service compromises</li>
                  <li>Zero-day exploits and unknown vulnerabilities</li>
                  <li>User error and social engineering attacks</li>
                  <li>Regulatory or legal changes affecting privacy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Data Sharing and Sales</h2>
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
                  <p className="text-green-300 font-semibold">
                    WE DO NOT SELL, RENT, OR SHARE YOUR DATA WITH THIRD PARTIES FOR COMMERCIAL PURPOSES.
                  </p>
                </div>
                <p>
                  The only data sharing that occurs is:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Public blockchain transactions (inherent to blockchain technology)</li>
                  <li>Anonymized usage statistics for platform improvement</li>
                  <li>Data required by law enforcement or legal processes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. User Responsibilities</h2>
                <p className="mb-4 text-yellow-400 font-semibold">
                  YOU ARE SOLELY RESPONSIBLE FOR YOUR OWN PRIVACY AND SECURITY.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Protect your private keys and wallet credentials</li>
                  <li>Use secure devices and internet connections</li>
                  <li>Regularly clear browser storage if desired</li>
                  <li>Understand the public nature of blockchain transactions</li>
                  <li>Research third-party services before using them</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Changes to Privacy Policy</h2>
                <p>
                  We may update this privacy policy periodically. Material changes will be communicated through our official channels. 
                  Continued use after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Contact Information</h2>
                <p>
                  For privacy-related questions or concerns, contact us through our official communication channels. 
                  However, we provide no guarantee of response or resolution.
                </p>
              </section>

              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">FINAL DISCLAIMER</h2>
                <p className="text-red-300 font-semibold">
                  THIS PRIVACY POLICY PROVIDES NO GUARANTEES. OMNIPAD ASSUMES NO LIABILITY FOR PRIVACY BREACHES, 
                  DATA LOSS, OR UNAUTHORIZED ACCESS TO YOUR INFORMATION. USE AT YOUR OWN RISK.
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
