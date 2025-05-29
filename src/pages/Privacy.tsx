import React from 'react'
import { Card } from '../components/ui/Card'

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-secondary-600">
            Last updated: January 15, 2024
          </p>
        </div>

        <Card className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Information We Collect</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
                <li>Support requests and correspondence</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>API usage and performance metrics</li>
                <li>Feature usage and analytics</li>
                <li>Error logs and debugging information</li>
                <li>Device and browser information</li>
                <li>IP addresses and location data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Information Sharing</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers under strict confidentiality</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Data Security</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information, including:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Data Retention</h2>
              <p className="text-secondary-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services 
                and fulfill the purposes outlined in this policy. We may also retain information to 
                comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Your Rights</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Access and receive a copy of your data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p className="text-secondary-700 leading-relaxed mt-4">
                You can control cookies through your browser settings, but this may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. International Transfers</h2>
              <p className="text-secondary-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with this privacy policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Children's Privacy</h2>
              <p className="text-secondary-700 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If we become aware that we have 
                collected such information, we will take steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Contact Us</h2>
              <p className="text-secondary-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-secondary-700">
                  <strong>Email:</strong> privacy@authguard.com<br />
                  <strong>Address:</strong> 123 Security Street, Tech City, TC 12345<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
