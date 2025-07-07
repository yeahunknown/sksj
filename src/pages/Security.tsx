
import Layout from '@/components/Layout';

const Security = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Security</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Platform Security Overview</h2>
                <p className="mb-4">
                  Omnipad is a demonstration platform that does not handle real cryptocurrency transactions, 
                  store sensitive data, or interact with actual blockchain networks. This inherently reduces 
                  many security risks associated with real DeFi platforms.
                </p>
                <p className="mb-4">
                  <strong>CRITICAL:</strong> This platform provides no actual token launching services and 
                  performs no real blockchain operations. All interactions are simulated for demonstration purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibred mb-4 text-white">2. No Real Wallet Integration</h2>
                <p className="mb-4">
                  Unlike real DeFi platforms, Omnipad does NOT:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Access or store your private keys or seed phrases</li>
                  <li>Connect to real wallet software (Phantom, Solflare, etc.)</li>
                  <li>Initiate actual blockchain transactions</li>
                  <li>Handle real cryptocurrency or tokens</li>
                  <li>Store wallet addresses or balances</li>
                  <li>Interact with any mainnet or testnet networks</li>
                </ul>
                <p>
                  All wallet addresses and transaction signatures displayed are randomly generated for demonstration only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Data Security Limitations</h2>
                <p className="mb-4">
                  While we implement basic security measures, users must understand our limitations:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>We cannot guarantee complete security of demonstration data</li>
                  <li>Local browser storage may be accessible to other applications</li>
                  <li>Network communications may be intercepted</li>
                  <li>The platform may contain undiscovered vulnerabilities</li>
                  <li>Third-party services may have their own security risks</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. User Security Responsibilities</h2>
                <p className="mb-4">
                  Users are 100% responsible for their own security when using this platform:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li><strong>NEVER</strong> input real private keys, seed phrases, or wallet credentials</li>
                  <li><strong>NEVER</strong> input real personal or financial information</li>
                  <li>Use secure, updated browsers and operating systems</li>
                  <li>Be aware this is a demonstration platform with no real value</li>
                  <li>Understand that no real security protections are guaranteed</li>
                  <li>Verify the authenticity of the platform URL before use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. No Smart Contract Security</h2>
                <p className="mb-4">
                  Since Omnipad does not deploy or interact with real smart contracts:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>No smart contract audits have been performed</li>
                  <li>No real contract security measures exist</li>
                  <li>All displayed contract interactions are simulated</li>
                  <li>No actual funds or tokens are at risk</li>
                </ul>
                <p>
                  Users should never assume any real smart contract security when using this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Platform Vulnerability Disclosure</h2>
                <p className="mb-4">
                  We acknowledge that this demonstration platform may contain security vulnerabilities:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Cross-site scripting (XSS) vulnerabilities</li>
                  <li>Client-side injection attacks</li>
                  <li>Data exposure through browser developer tools</li>
                  <li>Potential for malicious code injection</li>
                  <li>Insecure data transmission</li>
                </ul>
                <p>
                  We make no guarantees about fixing discovered vulnerabilities and are not liable for any consequences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Third-Party Security Risks</h2>
                <p className="mb-4">
                  Our platform may use third-party services that introduce additional security risks:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>CDN providers may serve malicious content</li>
                  <li>Analytics services may track user behavior</li>
                  <li>External APIs may be compromised</li>
                  <li>Third-party scripts may contain vulnerabilities</li>
                </ul>
                <p>
                  We are not responsible for the security practices of third-party services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. No Security Support</h2>
                <p className="mb-4">
                  We provide no security support or guarantees:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>No incident response procedures</li>
                  <li>No security monitoring or alerting</li>
                  <li>No breach notification processes</li>
                  <li>No recovery assistance for any issues</li>
                  <li>No security updates or patches guaranteed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Legal Protection</h2>
                <p>
                  Users acknowledge and agree that the operators of Omnipad are not liable for any security 
                  breaches, data loss, or consequences arising from platform usage. This includes but is not 
                  limited to unauthorized access, data theft, or malicious attacks.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Reporting Security Issues</h2>
                <p>
                  While we appreciate security vulnerability reports, we make no commitment to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Respond to vulnerability reports</li>
                  <li>Fix reported security issues</li>
                  <li>Provide acknowledgment or rewards</li>
                  <li>Maintain any coordinated disclosure process</li>
                </ul>
                <p>
                  Users report vulnerabilities entirely at their own discretion and without expectation of response.
                </p>
              </section>

              <div className="mt-12 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">🚨 Critical Security Warning</h3>
                <div className="space-y-2 text-red-300">
                  <p><strong>This is a demonstration platform with minimal security measures.</strong></p>
                  <p><strong>Never input real sensitive information of any kind.</strong></p>
                  <p><strong>Assume all data entered may be exposed or compromised.</strong></p>
                  <p><strong>We provide no security guarantees or support whatsoever.</strong></p>
                  <p><strong>Use entirely at your own risk.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
