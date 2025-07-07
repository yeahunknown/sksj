
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-300 select-text">
              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">CRITICAL DISCLAIMER</h2>
                <p className="text-red-300 font-semibold mb-4">
                  OMNIPAD PROVIDES NO GUARANTEE OF SERVICE. USERS ARE RESPONSIBLE FOR THEIR OWN ACTIONS. 
                  OMNIPAD AND ITS OPERATORS ASSUME NO LIABILITY FOR MISUSE, LOSSES, OR DAMAGES OF ANY KIND.
                </p>
                <p className="text-red-300">
                  By using this platform, you acknowledge that you are participating in experimental blockchain technology 
                  that carries significant financial risk, including total loss of funds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using Omnipad ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  <strong className="text-red-400">WARNING:</strong> Omnipad is a decentralized application that facilitates token creation and liquidity provision. 
                  Use at your own risk. Digital assets and cryptocurrency transactions involve substantial risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. Platform Description and Disclaimers</h2>
                <p className="mb-4">
                  Omnipad is purely a tool and interface that allows users to interact with blockchain protocols. We are NOT:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>A financial services provider</li>
                  <li>An investment advisor</li>
                  <li>A registered broker-dealer</li>
                  <li>A custodian of your funds or assets</li>
                  <li>Responsible for any tokens created using our platform</li>
                </ul>
                <p className="text-red-400 font-semibold">
                  ALL TOKEN CREATION, TRADING, AND LIQUIDITY PROVISION IS DONE AT YOUR OWN RISK. 
                  WE PROVIDE NO GUARANTEES, WARRANTIES, OR ASSURANCES REGARDING ANY OUTCOMES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. No Financial Advice</h2>
                <p className="mb-4">
                  Nothing on this platform constitutes financial, investment, legal, or tax advice. All content is for informational purposes only. 
                  You should consult with appropriate professionals before making any financial decisions.
                </p>
                <p className="text-yellow-400 font-semibold">
                  Token creation and cryptocurrency trading can result in total loss of funds. Only risk what you can afford to lose completely.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">4. User Responsibilities and Risks</h2>
                <p className="mb-4">By using Omnipad, you acknowledge and accept that:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>You are solely responsible for all transactions and their consequences</li>
                  <li>You understand the risks associated with blockchain technology and cryptocurrency</li>
                  <li>You will not use the platform for any illegal activities</li>
                  <li>You will not create tokens that violate applicable laws or infringe on intellectual property</li>
                  <li>You are responsible for any taxes or legal obligations arising from your use</li>
                  <li>Token values can become worthless at any time</li>
                  <li>Liquidity can be withdrawn by providers at any time, potentially causing price collapse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">5. Limitation of Liability</h2>
                <p className="mb-4 text-red-400 font-semibold">
                  OMNIPAD AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
                </p>
                <p className="mb-4">This includes but is not limited to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Loss of funds or digital assets</li>
                  <li>Failed transactions or technical issues</li>
                  <li>Token price volatility or collapse</li>
                  <li>Liquidity withdrawal or "rug pulls"</li>
                  <li>Smart contract bugs or exploits</li>
                  <li>Network congestion or failures</li>
                  <li>Regulatory changes affecting token viability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">6. No Refunds Policy</h2>
                <p className="text-red-400 font-semibold mb-4">
                  ALL TRANSACTIONS ARE FINAL. NO REFUNDS WILL BE PROVIDED UNDER ANY CIRCUMSTANCES.
                </p>
                <p>
                  This includes but is not limited to failed token creation, liquidity provision errors, 
                  user mistakes, or any technical issues. Once a transaction is submitted to the blockchain, 
                  it cannot be reversed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">7. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Omnipad, its operators, developers, and affiliates from any claims, 
                  damages, losses, or expenses (including legal fees) arising from your use of the platform or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">8. No Warranties</h2>
                <p className="mb-4">
                  The platform is provided "AS IS" without warranties of any kind. We do not guarantee:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Continuous availability or uptime</li>
                  <li>Freedom from bugs or errors</li>
                  <li>Compatibility with all devices or browsers</li>
                  <li>Success of any token creation or transaction</li>
                  <li>Market performance of created tokens</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">9. Regulatory Compliance</h2>
                <p>
                  You are responsible for ensuring your use of Omnipad complies with all applicable laws and regulations in your jurisdiction. 
                  Token creation and trading may be subject to securities laws, tax obligations, and other regulatory requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">10. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">11. Governing Law and Jurisdiction</h2>
                <p>
                  These terms are governed by the laws of the jurisdiction where Omnipad operates. Any disputes shall be resolved through binding arbitration.
                </p>
              </section>

              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">FINAL WARNING</h2>
                <p className="text-red-300 font-semibold">
                  CRYPTOCURRENCY AND TOKEN TRADING IS EXTREMELY RISKY. MOST TOKENS BECOME WORTHLESS. 
                  NEVER INVEST MORE THAN YOU CAN AFFORD TO LOSE COMPLETELY. OMNIPAD TAKES NO RESPONSIBILITY 
                  FOR YOUR FINANCIAL DECISIONS OR OUTCOMES. THIS SITE PROVIDES NO GUARANTEE OF SERVICE.
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
