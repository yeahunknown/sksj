
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using Omnipad ("the Platform"), you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, you must not use this platform.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you and the operators of Omnipad. 
                  We reserve the right to modify these terms at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Platform Disclaimer</h2>
                <p className="mb-4">
                  <strong>IMPORTANT:</strong> Omnipad does NOT provide token launching services. This platform is a demonstration 
                  interface only. No actual tokens are created, deployed, or launched through this platform.
                </p>
                <p className="mb-4">
                  Any interactions with this platform are purely educational and demonstrative. No real blockchain transactions 
                  occur through the use of this platform.
                </p>
                <p>
                  Users must understand that this platform is for demonstration purposes only and does not constitute 
                  any form of financial service or token deployment mechanism.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. User Responsibility</h2>
                <p className="mb-4">
                  You are 100% responsible for all your actions while using this platform. This includes but is not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>All data you input into the platform</li>
                  <li>All interactions with the platform interface</li>
                  <li>All decisions made based on information displayed on the platform</li>
                  <li>All consequences of your use of the platform</li>
                  <li>Compliance with all applicable laws and regulations</li>
                </ul>
                <p>
                  You acknowledge that you use this platform entirely at your own risk and discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitation of Liability</h2>
                <p className="mb-4">
                  The operators, developers, and all parties associated with Omnipad shall NOT be liable for any damages, 
                  losses, or consequences arising from your use of this platform, including but not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Technical malfunctions or service interruptions</li>
                  <li>Security breaches or data loss</li>
                  <li>Any actions taken based on platform interactions</li>
                </ul>
                <p>
                  Our total liability to you for all claims shall not exceed zero dollars ($0).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. No Warranties</h2>
                <p className="mb-4">
                  This platform is provided "as is" without any warranties of any kind, express or implied. 
                  We disclaim all warranties including but not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy, completeness, or reliability of information</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security or freedom from viruses or harmful components</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Omnipad, its operators, developers, and affiliates 
                  from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising out of 
                  or relating to your use of the platform or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Prohibited Uses</h2>
                <p className="mb-4">You agree not to use the platform for any unlawful purposes or any purposes prohibited by these terms, including:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Attempting to create actual tokens or conduct real transactions</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Interfering with the platform's security features</li>
                  <li>Attempting to gain unauthorized access to systems</li>
                  <li>Using the platform for commercial purposes without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with applicable laws. 
                  Any disputes shall be resolved in the appropriate courts with exclusive jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Severability</h2>
                <p>
                  If any provision of these terms is deemed invalid or unenforceable, the remaining provisions 
                  shall continue in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us through our official channels. 
                  We reserve the right to not respond to inquiries at our sole discretion.
                </p>
              </section>

              <div className="mt-12 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ Final Warning</h3>
                <p className="text-red-300">
                  By using this platform, you acknowledge that you understand this is a demonstration platform only, 
                  that no real services are provided, and that you assume all risks and responsibilities for your usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
