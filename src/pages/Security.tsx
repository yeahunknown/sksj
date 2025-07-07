
import Layout from '@/components/Layout';

const Security = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Security Policy</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. No Private Key Access</h2>
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
                  <p className="text-green-300 font-semibold">
                    OMNIPAD NEVER HAS ACCESS TO YOUR PRIVATE KEYS, SEED PHRASES, OR WALLET CREDENTIALS.
                  </p>
                </div>
                <p className="mb-4">
                  All wallet interactions are handled directly by your browser wallet extension (such as Phantom, Solflare, or other compatible wallets). 
                  We cannot and will never:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Access your private keys or seed phrases</li>
                  <li>Store wallet credentials on our servers</li>
                  <li>Sign transactions on your behalf without explicit approval</li>
                  <li>Move funds without your direct consent</li>
                  <li>Access your wallet when you're not actively using our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. User-Initiated Transactions</h2>
                <p className="mb-4">
                  Every blockchain transaction must be explicitly approved by you:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>All transactions require your wallet signature</li>
                  <li>You can review transaction details before signing</li>
                  <li>No hidden or background transactions</li>
                  <li>You control transaction fees and gas limits</li>
                  <li>Transactions can be rejected at any time before signing</li>
                </ul>
                <p className="text-yellow-400 font-semibold">
                  Always verify transaction details in your wallet before approving any signature request.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. No Backend Wallet Storage</h2>
                <p className="mb-4">
                  Omnipad operates without storing any sensitive financial data:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>No wallet addresses stored on our servers</li>
                  <li>No balance information cached or stored</li>
                  <li>No transaction history maintained by us</li>
                  <li>No recovery phrases or backup data</li>
                  <li>All financial data retrieved directly from the blockchain when needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Smart Contract Security</h2>
                <p className="mb-4">
                  Our token creation and liquidity operations use standard, well-tested protocols:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Solana Program Library (SPL) token standards</li>
                  <li>Audited smart contracts where possible</li>
                  <li>Standard DEX integration protocols</li>
                  <li>No experimental or unaudited code in critical paths</li>
                  <li>Regular security reviews and updates</li>
                </ul>
                <p className="text-red-400">
                  However, smart contracts can still contain bugs or vulnerabilities. Use at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Platform Security Measures</h2>
                <p className="mb-4">
                  We implement industry-standard security practices:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>HTTPS Encryption:</strong> All communications are encrypted</li>
                  <li><strong>Secure Hosting:</strong> Reputable infrastructure providers</li>
                  <li><strong>Code Security:</strong> Regular security audits and reviews</li>
                  <li><strong>Input Validation:</strong> Protection against common web attacks</li>
                  <li><strong>Dependencies:</strong> Regularly updated and monitored</li>
                  <li><strong>Access Controls:</strong> Limited access to platform systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. User Security Responsibilities</h2>
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <p className="text-yellow-300 font-semibold">
                    YOUR SECURITY IS PRIMARILY YOUR RESPONSIBILITY
                  </p>
                </div>
                <p className="mb-4">Users are responsible for:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Wallet Security:</strong> Keep private keys and seed phrases secure</li>
                  <li><strong>Transaction Verification:</strong> Always verify transaction details before signing</li>
                  <li><strong>Wallet Software:</strong> Use reputable, updated wallet software</li>
                  <li><strong>Phishing Protection:</strong> Be aware of fake websites and scams</li>
                  <li><strong>Device Security:</strong> Keep your devices secure and malware-free</li>
                  <li><strong>Network Security:</strong> Use secure internet connections</li>
                  <li><strong>Backup Management:</strong> Safely store wallet backups</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Common Security Risks</h2>
                <p className="mb-4 text-red-400">
                  Be aware of these common cryptocurrency security risks:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Phishing Sites:</strong> Always verify you're on the correct Omnipad URL</li>
                  <li><strong>Fake Tokens:</strong> Verify token addresses before trading</li>
                  <li><strong>Rug Pulls:</strong> Liquidity can be withdrawn by providers at any time</li>
                  <li><strong>Smart Contract Bugs:</strong> Code vulnerabilities can lead to fund loss</li>
                  <li><strong>Social Engineering:</strong> Never share private keys or seed phrases</li>
                  <li><strong>Malware:</strong> Malicious software can steal wallet credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Incident Response</h2>
                <p className="mb-4">
                  In case of security incidents:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>We will communicate through official channels immediately</li>
                  <li>Affected systems will be taken offline if necessary</li>
                  <li>Users will be notified of recommended actions</li>
                  <li>Post-incident analysis will be conducted and shared</li>
                  <li>Security measures will be updated as needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Limitations of Security</h2>
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-300 font-semibold">
                    NO SYSTEM IS 100% SECURE
                  </p>
                </div>
                <p className="mb-4">
                  Despite our security measures, risks remain:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Blockchain and smart contract vulnerabilities</li>
                  <li>Third-party service compromises</li>
                  <li>Zero-day exploits and unknown vulnerabilities</li>
                  <li>User error and social engineering attacks</li>
                  <li>Regulatory or legal changes affecting platform operation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Reporting Security Issues</h2>
                <p className="mb-4">
                  If you discover a security vulnerability:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Report it immediately through our official communication channels</li>
                  <li>Do not publicly disclose the vulnerability until we've addressed it</li>
                  <li>Provide detailed information about the issue</li>
                  <li>Allow reasonable time for us to investigate and respond</li>
                </ul>
                <p className="text-green-400">
                  We appreciate responsible disclosure and may offer recognition or rewards for valid security reports.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">11. Regular Security Updates</h2>
                <p>
                  We continuously work to improve security through:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Regular code audits and security reviews</li>
                  <li>Dependency updates and vulnerability patching</li>
                  <li>Security best practice implementation</li>
                  <li>Community feedback and bug reports</li>
                  <li>Industry security standard compliance</li>
                </ul>
              </section>

              <section className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Security Best Practices Summary</h2>
                <ul className="list-disc list-inside space-y-2 text-blue-300">
                  <li>Never share your private keys or seed phrases</li>
                  <li>Always verify transaction details before signing</li>
                  <li>Use official wallet software from trusted sources</li>
                  <li>Keep your devices and software updated</li>
                  <li>Be cautious of phishing attempts and fake websites</li>
                  <li>Only invest what you can afford to lose completely</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
