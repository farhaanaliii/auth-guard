import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API Documentation', href: '/docs' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Security', href: '/security' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Community', href: '/community' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Status Page', href: '/status' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Compliance', href: '/compliance' },
      ]
    }
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <i className="bi bi-shield-lock text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold">AuthGuard</span>
            </Link>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              The most advanced authentication and licensing platform for modern applications. 
              Trusted by 50,000+ developers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="bi bi-twitter text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="bi bi-github text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="bi bi-linkedin text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <i className="bi bi-discord text-lg"></i>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay updated</h3>
              <p className="text-secondary-300">Get the latest news and updates from AuthGuard.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg focus:outline-none focus:border-red-500 text-white placeholder-secondary-400"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-r-lg hover:from-red-700 hover:to-orange-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} AuthGuard. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-secondary-400 text-sm">Made with ❤️ by WebSparks</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-secondary-400 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
