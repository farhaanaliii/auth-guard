import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { icon: 'bi-speedometer2', label: 'Dashboard', path: '/dashboard' },
  { icon: 'bi-grid', label: 'Applications', path: '/applications' },
  { icon: 'bi-key', label: 'Licenses', path: '/licenses' },
  { icon: 'bi-people', label: 'Users', path: '/users' },
  { icon: 'bi-bar-chart', label: 'Analytics', path: '/analytics' },
  { icon: 'bi-gear', label: 'Settings', path: '/settings' },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border-r border-secondary-200 h-screen sticky top-16">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }
                `}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
