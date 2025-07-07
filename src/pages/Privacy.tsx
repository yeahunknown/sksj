
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
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Overview</h2>
                <p className="mb-4">
                  This Privacy Policy describes how Omnipad ("we," "our," or "the Platform") handles information 
                  in relation to your use of our demonstration platform. By using our platform, you consent to 
                  the practices described in this policy.
                </p>
                <p className="mb-4">
                  <strong>IMPORTANT:</strong> Omnipad is a demonstration platform only and does not provide actual 
                  token launching services. No real blockchain transactions occur through this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Information Collection</h2>
                <p className="mb-4">
                  Since Omnipad operates as a client-side demonstration application, we generally do not collect, 
                  store, or process personal information on our servers. However, certain technical information 
                  may be collected:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Browser type and version</li>
                  <li>Device information and screen resolution</li>
                  <li>IP address and general location data</li>
                  <li>Usage patterns and interaction data</li>
                  <li>Technical logs for debugging and security purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Local Storage</h2>
                <p className="mb-4">
                  Our platform may store data locally in your browser for demonstration purposes, including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Simulated token data and configurations</li>
                  <li>User interface preferences and settings</li>
                  <li>Session data for demonstration continuity</li>
                  <li>Temporary files and cached resources</li>
                </ul>
                <p>
                  This data remains on your device and is not transmitted to our servers. You can clear this 
                  data at any time through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. No Real Blockchain Interactions</h2>
                <p className="mb-4">
                  It is crucial to understand that Omnipad does not interact with any real blockchain networks. 
                  All displayed addresses, transactions, and token data are simulated for demonstration purposes only.
                </p>
                <p>
                  We do not access, store, or transmit any real wallet information, private keys, or blockchain data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
                <p className="mb-4">
                  Our platform may utilize third-party services for analytics, performance monitoring, or functionality enhancement:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Web analytics services (Google Analytics, etc.)</li>
                  <li>Content delivery networks (CDNs)</li>
                  <li>Error tracking and monitoring services</li>
                  <li>Performance optimization tools</li>
                </ul>
                <p>
                  These services have their own privacy policies, and we encourage you to review them. 
                  We are not responsible for the privacy practices of third-party services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Security Disclaimer</h2>
                <p className="mb-4">
                  While we implement reasonable security measures, we cannot guarantee the security of any information. 
                  Since this is a demonstration platform with no real value or services, security risks are minimal.
                </p>
                <p className="mb-4">
                  Users should never input real private keys, sensitive financial information, or personal data 
                  into this demonstration platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. No Responsibility for User Actions</h2>
                <p className="mb-4">
                  We are not responsible for:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Any information you choose to input into the platform</li>
                  <li>How you use or interpret the demonstration features</li>
                  <li>Any decisions made based on platform interactions</li>
                  <li>Data loss or corruption on your device</li>
                  <li>Privacy breaches resulting from your own actions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Children's Privacy</h2>
                <p>
                  Our platform is not intended for children under 18 years of age. We do not knowingly collect 
                  information from children. If we become aware that a child has provided us with information, 
                  we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. International Users</h2>
                <p>
                  If you are accessing our platform from outside our primary jurisdiction, you acknowledge that 
                  your information may be transferred, stored, and processed in different countries with varying 
                  privacy laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this Privacy Policy at any time without prior notice. 
                  Changes will be posted on this page with an updated effective date. Your continued use 
                  constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">11. Contact Information</h2>
                <p>
                  For questions about this Privacy Policy, you may contact us through our official channels. 
                  We reserve the right to not respond to inquiries at our sole discretion.
                </p>
              </section>

              <div className="mt-12 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">⚠️ Demonstration Platform Notice</h3>
                <p className="text-yellow-300">
                  Remember: This is a demonstration platform only. Do not input real sensitive information, 
                  and understand that no actual services are provided. We are not liable for any consequences 
                  of your platform usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
