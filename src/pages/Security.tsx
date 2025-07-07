
import Layout from '@/components/Layout';

const Security = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Security Policy</h1>
            
            <div className="space-y-8 text-gray-300 select-text">
              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">CRITICAL SECURITY DISCLAIMER</h2>
                <p className="text-red-300 font-semibold mb-4">
                  OMNIPAD PROVIDES NO GUARANTEE OF SECURITY. NO SYSTEM IS 100% SECURE. 
                  USERS ASSUME ALL SECURITY RISKS AND ARE SOLELY RESPONSIBLE FOR PROTECTING THEIR ASSETS.
                </p>
                <p className="text-red-300">
                  USE THIS PLATFORM AT YOUR OWN RISK. OMNIPAD AND ITS OPERATORS ASSUME NO LIABILITY 
                  FOR SECURITY BREACHES, FUND LOSS, OR ANY DAMAGES RESULTING FROM PLATFORM USE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. No Private Key Access</h2>
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
                  <p className="text-green-300 font-semibold">
                    OMNIPAD NEVER HAS ACCESS TO YOUR PRIVATE KEYS, SEED PHRASES, OR WALLET CREDENTIALS.
                  </p>
                </div>
                <p className="mb-4">
                  All wallet interactions are handled directly by your browser wallet extension. However:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li className="text-red-400">We cannot guarantee the security of third-party wallets</li>
                  <li className="text-red-400">Browser vulnerabilities could expose your credentials</li>
                  <li className="text-red-400">Malware on your device could steal your private keys</li>
                  <li className="text-red-400">Phishing attacks could trick you into revealing sensitive information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. User-Initiated Transactions</h2>
                <p className="mb-4">
                  Every blockchain transaction must be explicitly approved by you, but:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li className="text-yellow-400">Transaction details could be manipulated by attackers</li>
                  <li className="text-yellow-400">Smart contracts may contain hidden functionality</li>
                  <li className="text-yellow-400">Network attacks could redirect transactions</li>
                  <li className="text-yellow-400">UI bugs could display incorrect information</li>
                </ul>
                <p className="text-red-400 font-semibold mt-4">
                  ALWAYS VERIFY TRANSACTION DETAILS CAREFULLY. WE ASSUME NO RESPONSIBILITY FOR ERRONEOUS TRANSACTIONS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Smart Contract Security Risks</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  SMART CONTRACTS CAN CONTAIN BUGS, VULNERABILITIES, OR MALICIOUS CODE THAT COULD RESULT IN TOTAL LOSS OF FUNDS.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Reentrancy attacks and other exploit vectors</li>
                  <li>Unaudited or poorly audited contract code</li>
                  <li>Admin keys that could be used maliciously</li>
                  <li>Logic errors that could lock or steal funds</li>
                  <li>Upgradeable contracts that could change behavior</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Platform Security Limitations</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  OUR SECURITY MEASURES ARE NOT PERFECT AND PROVIDE NO GUARANTEES.
                </p>
                <p className="mb-4">Potential security risks include:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Website compromise or defacement</li>
                  <li>DNS hijacking redirecting to malicious sites</li>
                  <li>SSL certificate compromise</li>
                  <li>Code injection or cross-site scripting attacks</li>
                  <li>Server vulnerabilities and data breaches</li>
                  <li>Supply chain attacks on dependencies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. User Security Responsibilities</h2>
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <p className="text-yellow-300 font-semibold">
                    YOUR SECURITY IS ENTIRELY YOUR RESPONSIBILITY. WE PROVIDE NO SECURITY GUARANTEES.
                  </p>
                </div>
                <p className="mb-4">You must:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Secure your private keys and seed phrases</li>
                  <li>Use reputable, updated wallet software</li>
                  <li>Keep your devices free from malware</li>
                  <li>Verify website URLs to avoid phishing</li>
                  <li>Use secure internet connections</li>
                  <li>Never share sensitive information</li>
                  <li>Understand the risks of each transaction</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Common Security Threats</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  BE AWARE OF THESE COMMON ATTACK VECTORS THAT COULD RESULT IN FUND LOSS:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Phishing Sites:</strong> Fake websites designed to steal credentials</li>
                  <li><strong>Fake Tokens:</strong> Malicious tokens that can drain wallets</li>
                  <li><strong>Rug Pulls:</strong> Developers abandoning projects with user funds</li>
                  <li><strong>Smart Contract Exploits:</strong> Code vulnerabilities leading to fund loss</li>
                  <li><strong>Social Engineering:</strong> Manipulation tactics to steal information</li>
                  <li><strong>SIM Swapping:</strong> Phone number hijacking for 2FA bypass</li>
                  <li><strong>Clipboard Malware:</strong> Software that modifies copied addresses</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. No Security Guarantees</h2>
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-300 font-semibold">
                    WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE SECURITY OF OUR PLATFORM OR SERVICES.
                  </p>
                </div>
                <p className="mb-4">
                  Security risks that we cannot prevent or protect against include:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Zero-day exploits and unknown vulnerabilities</li>
                  <li>State-sponsored or advanced persistent threats</li>
                  <li>Insider threats from third-party providers</li>
                  <li>Natural disasters affecting infrastructure</li>
                  <li>Regulatory seizure of assets or services</li>
                  <li>Quantum computing threats to cryptography</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Incident Response Limitations</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  IN CASE OF SECURITY INCIDENTS, WE PROVIDE NO GUARANTEE OF RESPONSE, RECOVERY, OR COMPENSATION.
                </p>
                <p className="mb-4">Our incident response may include:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Taking affected systems offline (if we determine it necessary)</li>
                  <li>Attempting to communicate through available channels (no guarantee)</li>
                  <li>Investigating incidents (at our discretion)</li>
                  <li>Implementing fixes (if possible and if we choose to)</li>
                </ul>
                <p className="text-red-400 font-semibold">
                  However, we assume no obligation to respond to incidents or provide user support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Third-Party Security Risks</h2>
                <p className="mb-4">
                  We integrate with various third-party services that introduce additional security risks:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Wallet provider vulnerabilities</li>
                  <li>RPC provider attacks or manipulation</li>
                  <li>CDN compromise affecting assets</li>
                  <li>DNS provider hijacking</li>
                  <li>Certificate authority compromise</li>
                </ul>
                <p className="text-red-400 font-semibold">
                  WE ARE NOT RESPONSIBLE FOR THIRD-PARTY SECURITY FAILURES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Regulatory and Legal Risks</h2>
                <p className="mb-4">
                  Security may be affected by regulatory changes:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Government seizure of assets or infrastructure</li>
                  <li>Mandatory backdoors or surveillance requirements</li>
                  <li>Sanctions affecting service availability</li>
                  <li>Legal orders requiring data disclosure</li>
                </ul>
              </section>

              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">FINAL SECURITY WARNING</h2>
                <div className="space-y-4 text-red-300">
                  <p className="font-semibold">
                    OMNIPAD PROVIDES NO SECURITY GUARANTEES WHATSOEVER. USE AT YOUR OWN RISK.
                  </p>
                  <p>
                    • We assume no liability for security breaches, fund loss, or any damages
                  </p>
                  <p>
                    • You are solely responsible for your own security and asset protection
                  </p>
                  <p>
                    • Never invest more than you can afford to lose completely
                  </p>
                  <p>
                    • All transactions and interactions are at your own risk
                  </p>
                  <p className="font-semibold">
                    BY USING THIS PLATFORM, YOU ACKNOWLEDGE THESE RISKS AND WAIVE ALL CLAIMS AGAINST OMNIPAD.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
