import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export const Landing: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: 'bi-shield-check',
      title: 'Military-Grade Security',
      description: 'Advanced encryption, OAuth integration, and multi-factor authentication to protect your applications.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: 'bi-key',
      title: 'Smart License Management',
      description: 'AI-powered license generation with real-time tracking, usage analytics, and automated renewals.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: 'bi-graph-up',
      title: 'Advanced Analytics',
      description: 'Deep insights with predictive analytics, user behavior tracking, and revenue optimization.',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: 'bi-code-slash',
      title: 'Developer-First API',
      description: 'RESTful API with GraphQL support, webhooks, and SDKs for 15+ programming languages.',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      icon: 'bi-people',
      title: 'Team Collaboration',
      description: 'Role-based permissions, team workspaces, and collaborative license management tools.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: 'bi-lightning',
      title: 'Global Infrastructure',
      description: 'Edge computing with 99.99% uptime, global CDN, and sub-100ms response times worldwide.',
      gradient: 'from-rose-500 to-red-500'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechFlow',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      content: 'AuthGuard transformed our licensing system. Revenue increased by 340% in just 6 months.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder at GameStudio',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      content: 'The analytics insights helped us optimize our pricing strategy and reduce churn by 60%.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Product Manager at SoftwareCorp',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      content: 'Implementation was seamless. Our team was up and running in under 30 minutes.',
      rating: 5
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Developers', icon: 'bi-people' },
    { number: '99.99%', label: 'Uptime SLA', icon: 'bi-shield-check' },
    { number: '2.5M+', label: 'API Calls Daily', icon: 'bi-graph-up' },
    { number: '150+', label: 'Countries Served', icon: 'bi-globe' }
  ]

  const pricing = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for indie developers and small projects',
      features: [
        '2 Applications',
        '1,000 License Keys',
        'Basic Analytics',
        'Email Support',
        'Standard API Access',
        'Community Forum'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: 'per month',
      description: 'Ideal for growing businesses and teams',
      features: [
        '25 Applications',
        '50,000 License Keys',
        'Advanced Analytics',
        'Priority Support',
        'Custom Webhooks',
        'Team Collaboration',
        'API Rate Limiting',
        'Custom Branding'
      ],
      cta: 'Start 14-day Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited Applications',
        'Unlimited License Keys',
        'Real-time Analytics',
        '24/7 Phone Support',
        'Custom Integration',
        'SLA Guarantee',
        'Dedicated Account Manager',
        'On-premise Deployment',
        'Advanced Security Features'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-6 animate-bounce-soft">
                <i className="bi bi-lightning-charge mr-2"></i>
                Trusted by 50,000+ developers worldwide
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
                Secure Your Software with
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent block mt-2">
                  AuthGuard Pro
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                The most advanced authentication and licensing platform for modern applications. 
                Protect your software, manage users, and scale with confidence using AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-glow-red">
                    Start Free Trial
                    <i className="bi bi-arrow-right ml-2"></i>
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-red-300 text-red-700 hover:bg-red-50">
                  <i className="bi bi-play-circle mr-2"></i>
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Video */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-soft-lg p-4 border border-red-100">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center" 
                    alt="AuthGuard Dashboard Preview"
                    className="w-full rounded-xl"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">{stat.number}</div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Everything you need to secure your software
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From authentication to analytics, AuthGuard provides all the tools you need 
              to protect and manage your applications with enterprise-grade security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 border-red-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Loved by developers worldwide
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              See what our customers are saying about AuthGuard
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-soft-lg transition-all duration-300 border-red-100">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-yellow-400 text-lg"></i>
                  ))}
                </div>
                <p className="text-secondary-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-red-200"
                    crossOrigin="anonymous"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features 
              with no hidden fees. Start free and scale as you grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative text-center transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-red-500 shadow-glow-red border-red-200' : 'border-red-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-secondary-900">{plan.price}</span>
                    <span className="text-secondary-600 ml-2">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <i className="bi bi-check-circle text-red-600 mr-3 flex-shrink-0"></i>
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button 
                      variant={plan.popular ? 'primary' : 'outline'} 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'border-red-300 text-red-700 hover:bg-red-50'}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to secure your software?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Join thousands of developers who trust AuthGuard to protect their applications.
            Start your free trial today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-lg">
                Start Free Trial
                <i className="bi bi-arrow-right ml-2"></i>
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <i className="bi bi-telephone mr-2"></i>
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
