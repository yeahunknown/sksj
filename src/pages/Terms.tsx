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
                  By accessing or using Omnipad ("the Platform"), you agree to be bound by these Terms of Service 
                  ("Terms"). If you disagree with any part of these terms, then you may not access the Platform.
                </p>
                <p className="mb-4">
                  <strong>CRITICAL NOTICE:</strong> Omnipad is a demonstration platform only and does not provide 
                  actual token launching services. No real blockchain transactions occur through this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Platform Purpose and Limitations</h2>
                <p className="mb-4">
                  Omnipad serves as a demonstration interface to showcase potential token creation workflows. 
                  The Platform does NOT:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Deploy actual tokens to any blockchain network</li>
                  <li>Execute real cryptocurrency transactions</li>
                  <li>Store or manage real digital assets</li>
                  <li>Provide financial services of any kind</li>
                  <li>Guarantee the functionality of any demonstrated features</li>
                  <li>Offer investment advice or opportunities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. No Warranties or Guarantees</h2>
                <p className="mb-4">
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE EXPRESSLY DISCLAIM ALL WARRANTIES, 
                  WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
                  <li>NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
                  <li>ACCURACY, COMPLETENESS, OR RELIABILITY OF CONTENT</li>
                  <li>CONTINUOUS AVAILABILITY OR ERROR-FREE OPERATION</li>
                  <li>SECURITY OR PRIVACY PROTECTION</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitation of Liability</h2>
                <p className="mb-4">
                  IN NO EVENT SHALL OMNIPAD, ITS OPERATORS, DEVELOPERS, OR AFFILIATES BE LIABLE FOR ANY:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                  <li>LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES</li>
                  <li>DAMAGES RESULTING FROM YOUR USE OR INABILITY TO USE THE PLATFORM</li>
                  <li>UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA</li>
                  <li>STATEMENTS OR CONDUCT OF ANY THIRD PARTY</li>
                  <li>ANY OTHER MATTER RELATING TO THE PLATFORM</li>
                </ul>
                <p>
                  THIS LIMITATION APPLIES REGARDLESS OF THE LEGAL THEORY ON WHICH THE CLAIM IS BASED.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. User Responsibilities and Prohibited Uses</h2>
                <p className="mb-4">You agree NOT to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Use the Platform for any actual financial transactions</li>
                  <li>Input real private keys, seed phrases, or sensitive information</li>
                  <li>Attempt to reverse engineer or exploit the Platform</li>
                  <li>Use the Platform for illegal or unauthorized purposes</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the Platform's operation or security</li>
                  <li>Misrepresent the Platform's capabilities to others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. No Obligation to Provide Services</h2>
                <p className="mb-4">
                  We have NO OBLIGATION to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Maintain, update, or improve the Platform</li>
                  <li>Provide customer support or technical assistance</li>
                  <li>Preserve any data or content you input</li>
                  <li>Ensure continuous availability of the Platform</li>
                  <li>Implement any requested features or fixes</li>
                  <li>Respond to inquiries or complaints</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Value and Payment Disclaimer</h2>
                <p className="mb-4">
                  Any value, cryptocurrency, or payment sent to addresses displayed on this Platform is done entirely 
                  at your own free will and discretion. By sending any value, you acknowledge:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>You are making a voluntary gift with no expectation of return</li>
                  <li>No services, products, or benefits are guaranteed in exchange</li>
                  <li>All transactions are final and irreversible</li>
                  <li>We assume no responsibility for funds sent to any address</li>
                  <li>You understand this is a demonstration platform only</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of the Platform are owned by us or our licensors and are 
                  protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, 
                  distribute, or create derivative works without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Omnipad and its operators from any claims, damages, losses, 
                  or expenses arising from your use of the Platform or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Termination</h2>
                <p>
                  We may terminate or suspend your access immediately, without prior notice, for any reason, 
                  including breach of these Terms. Upon termination, your right to use the Platform ceases immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time without notice. Changes are effective 
                  immediately upon posting. Your continued use constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">12. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard 
                  to conflict of law principles. Any disputes shall be resolved in courts of competent jurisdiction.
                </p>
              </section>

              <div className="mt-12 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ Final Warning</h3>
                <div className="space-y-2 text-red-300">
                  <p><strong>This is a demonstration platform with no real services provided.</strong></p>
                  <p><strong>We accept zero responsibility for any consequences of your usage.</strong></p>
                  <p><strong>Any value sent to displayed addresses is sent entirely at your own risk and free will.</strong></p>
                  <p><strong>We provide no warranties, guarantees, or obligations whatsoever.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;