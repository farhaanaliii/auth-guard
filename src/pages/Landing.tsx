import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export const Landing: React.FC = () => {
  const features = [
    {
      icon: 'bi-shield-check',
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with OAuth integration and multi-factor authentication.'
    },
    {
      icon: 'bi-key',
      title: 'License Management',
      description: 'Create, manage, and track software licenses with advanced analytics and reporting.'
    },
    {
      icon: 'bi-graph-up',
      title: 'Real-time Analytics',
      description: 'Monitor usage patterns, track performance, and gain insights into your applications.'
    },
    {
      icon: 'bi-code-slash',
      title: 'Developer API',
      description: 'Comprehensive REST API with SDKs for seamless integration into your applications.'
    },
    {
      icon: 'bi-people',
      title: 'User Management',
      description: 'Advanced user management with role-based access control and permissions.'
    },
    {
      icon: 'bi-lightning',
      title: 'High Performance',
      description: 'Built for scale with 99.9% uptime and lightning-fast response times.'
    }
  ]

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '1 Application',
        '100 License Keys',
        'Basic Analytics',
        'Email Support'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      features: [
        '10 Applications',
        '10,000 License Keys',
        'Advanced Analytics',
        'Priority Support',
        'Custom Webhooks',
        'API Access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: [
        'Unlimited Applications',
        'Unlimited License Keys',
        'Real-time Analytics',
        '24/7 Support',
        'Custom Integration',
        'SLA Guarantee'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 animate-fade-in">
              Secure Your Software with
              <span className="text-primary-600 block">AuthGuard</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto animate-fade-in">
              The most advanced authentication and licensing platform for modern applications. 
              Protect your software, manage users, and scale with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <i className="bi bi-arrow-right ml-2"></i>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <i className="bi bi-play-circle mr-2"></i>
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Everything you need to secure your software
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              From authentication to analytics, AuthGuard provides all the tools you need 
              to protect and manage your applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-primary-600 text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features 
              with no hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`text-center relative ${
                  plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary-900">{plan.price}</span>
                  <span className="text-secondary-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <i className="bi bi-check-circle text-primary-600 mr-2"></i>
                      <span className="text-secondary-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to secure your software?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of developers who trust AuthGuard to protect their applications.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Start Free Trial
              <i className="bi bi-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
