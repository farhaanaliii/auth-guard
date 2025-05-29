import React, { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Sidebar } from '../components/layout/Sidebar'

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    activeLicenses: 0,
    totalUsers: 0,
    monthlyRevenue: 0
  })

  const [recentActivity] = useState([
    { id: 1, type: 'license_created', message: 'New license key generated for MyApp', time: '2 minutes ago' },
    { id: 2, type: 'user_login', message: 'User john@example.com logged in', time: '5 minutes ago' },
    { id: 3, type: 'app_created', message: 'New application "GameLauncher" created', time: '1 hour ago' },
    { id: 4, type: 'license_expired', message: 'License key expired for WebApp', time: '2 hours ago' },
  ])

  useEffect(() => {
    // Simulate loading stats
    const timer = window.setTimeout(() => {
      setStats({
        totalApplications: 12,
        activeLicenses: 1247,
        totalUsers: 8934,
        monthlyRevenue: 15420
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'license_created': return 'bi-key text-green-600'
      case 'user_login': return 'bi-person-check text-blue-600'
      case 'app_created': return 'bi-plus-circle text-purple-600'
      case 'license_expired': return 'bi-exclamation-triangle text-orange-600'
      default: return 'bi-info-circle text-gray-600'
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Dashboard</h1>
            <p className="text-secondary-600">Welcome back! Here's what's happening with your applications.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-grid text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">{stats.totalApplications}</h3>
              <p className="text-secondary-600">Total Applications</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-key text-green-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">{stats.activeLicenses.toLocaleString()}</h3>
              <p className="text-secondary-600">Active Licenses</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-people text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">{stats.totalUsers.toLocaleString()}</h3>
              <p className="text-secondary-600">Total Users</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-currency-dollar text-orange-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">${stats.monthlyRevenue.toLocaleString()}</h3>
              <p className="text-secondary-600">Monthly Revenue</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Button className="w-full justify-start">
                  <i className="bi bi-plus-circle mr-3"></i>
                  Create New Application
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="bi bi-key mr-3"></i>
                  Generate License Key
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="bi bi-person-plus mr-3"></i>
                  Invite Team Member
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="bi bi-bar-chart mr-3"></i>
                  View Analytics
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`${getActivityIcon(activity.type)} text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-secondary-900">{activity.message}</p>
                      <p className="text-xs text-secondary-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                  <i className="bi bi-arrow-right ml-2"></i>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
