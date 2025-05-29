import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  // Check if user is admin (you can implement your own logic)
  const isAdmin = user?.email === 'admin@authguard.com' // Example admin check

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <i className="bi bi-shield-lock text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                AuthGuard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className={`text-sm font-medium transition-colors hover:text-red-600 ${
                    isActive(isAdmin ? '/admin' : '/dashboard') 
                      ? 'text-red-600' 
                      : 'text-secondary-600'
                  }`}
                >
                  {isAdmin ? 'Admin Panel' : 'Dashboard'}
                </Link>
                {!isAdmin && (
                  <>
                    <Link
                      to="/applications"
                      className={`text-sm font-medium transition-colors hover:text-red-600 ${
                        isActive('/applications') 
                          ? 'text-red-600' 
                          : 'text-secondary-600'
                      }`}
                    >
                      Applications
                    </Link>
                    <Link
                      to="/licenses"
                      className={`text-sm font-medium transition-colors hover:text-red-600 ${
                        isActive('/licenses') 
                          ? 'text-red-600' 
                          : 'text-secondary-600'
                      }`}
                    >
                      Licenses
                    </Link>
                    <Link
                      to="/analytics"
                      className={`text-sm font-medium transition-colors hover:text-red-600 ${
                        isActive('/analytics') 
                          ? 'text-red-600' 
                          : 'text-secondary-600'
                      }`}
                    >
                      Analytics
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <i className="bi bi-person text-white text-sm"></i>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={signOut}
                    className="text-secondary-600 hover:text-red-600"
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-red-600 transition-colors p-2"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-200 bg-white/95 backdrop-blur-sm">
            {user ? (
              <div className="space-y-3">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="block text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAdmin ? 'Admin Panel' : 'Dashboard'}
                </Link>
                {!isAdmin && (
                  <>
                    <Link
                      to="/applications"
                      className="block text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Applications
                    </Link>
                    <Link
                      to="/licenses"
                      className="block text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Licenses
                    </Link>
                    <Link
                      to="/analytics"
                      className="block text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                  </>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut} 
                  className="w-full justify-start text-secondary-600 hover:text-red-600"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-secondary-600 hover:text-red-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-red-600 to-red-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
