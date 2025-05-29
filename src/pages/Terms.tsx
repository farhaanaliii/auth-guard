import React from 'react'
import { Card } from '../components/ui/Card'

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-secondary-600">
            Last updated: January 15, 2024
          </p>
        </div>

        <Card className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-secondary-700 leading-relaxed">
                By accessing and using AuthGuard ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Description of Service</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                AuthGuard provides authentication and licensing services for software applications. Our 
                services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>User authentication and authorization</li>
                <li>License key generation and management</li>
                <li>Analytics and reporting tools</li>
                <li>API access and integration tools</li>
                <li>Customer support and documentation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. User Accounts</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                To access certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Acceptable Use</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for illegal or unauthorized purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Payment and Billing</h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                For paid services:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Fees are charged in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>You authorize us to charge your payment method</li>
                <li>Price changes will be communicated 30 days in advance</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Data and Privacy</h2>
              <p className="text-secondary-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and 
                protect your information when you use our Service. By using our Service, you agree to 
                the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Intellectual Property</h2>
              <p className="text-secondary-700 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of AuthGuard and its licensors. The Service is protected by 
                copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-secondary-700 leading-relaxed">
                In no event shall AuthGuard, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Termination</h2>
              <p className="text-secondary-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, 
                without prior notice or liability, under our sole discretion, for any reason whatsoever 
                and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Contact Information</h2>
              <p className="text-secondary-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-secondary-700">
                  <strong>Email:</strong> legal@authguard.com<br />
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
