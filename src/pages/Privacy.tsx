
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-8 text-gray-300">
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
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Third-Party Services</h2>
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
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Security</h2>
                <p className="mb-4">
                  Since we don't collect personal data, there's minimal privacy risk from our platform directly. However:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Our website uses HTTPS encryption for secure communication</li>
                  <li>We employ security best practices in our code</li>
                  <li>Regular security audits are performed on our smart contracts</li>
                  <li>We use secure hosting and infrastructure providers</li>
                </ul>
                <p className="text-red-400 font-semibold">
                  You are responsible for protecting your wallet private keys and transaction signatures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Sharing and Sales</h2>
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
                <h2 className="text-2xl font-semibold mb-4 text-white">7. User Rights and Control</h2>
                <p className="mb-4">
                  You have full control over your data:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Clear browser storage to remove local data</li>
                  <li>Use private/incognito browsing mode</li>
                  <li>Disconnect your wallet at any time</li>
                  <li>Request information about any data we may have (though it's minimal)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Cookies and Tracking</h2>
                <p className="mb-4">
                  Omnipad uses minimal tracking:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Essential cookies for basic functionality only</li>
                  <li>No advertising or marketing cookies</li>
                  <li>No cross-site tracking</li>
                  <li>No behavioral profiling</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Age Requirements</h2>
                <p>
                  You must be at least 18 years old (or the age of majority in your jurisdiction) to use Omnipad. 
                  We do not knowingly collect information from minors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. International Users</h2>
                <p>
                  Omnipad is accessible globally, but users are responsible for compliance with local laws. 
                  Data processing occurs in accordance with applicable privacy regulations including GDPR, CCPA, and others.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">11. Changes to Privacy Policy</h2>
                <p>
                  We may update this privacy policy periodically. Material changes will be communicated through our official channels. 
                  Continued use after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">12. Contact Information</h2>
                <p>
                  For privacy-related questions or concerns, contact us through our official Telegram channel or other verified communication methods.
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
