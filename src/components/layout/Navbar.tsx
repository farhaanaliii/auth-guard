import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-shield-lock text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-secondary-900">AuthGuard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-primary-600' 
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/applications"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/applications') 
                      ? 'text-primary-600' 
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  Applications
                </Link>
                <Link
                  to="/licenses"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/licenses') 
                      ? 'text-primary-600' 
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  Licenses
                </Link>
                <Link
                  to="/analytics"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/analytics') 
                      ? 'text-primary-600' 
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  Analytics
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <i className="bi bi-person text-primary-600"></i>
                  </div>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            {user ? (
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="block text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/applications"
                  className="block text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Applications
                </Link>
                <Link
                  to="/licenses"
                  className="block text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Licenses
                </Link>
                <Link
                  to="/analytics"
                  className="block text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
