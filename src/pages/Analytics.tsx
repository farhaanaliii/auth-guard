import React from 'react'
import { Card } from '../components/ui/Card'
import { Sidebar } from '../components/layout/Sidebar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export const Analytics: React.FC = () => {
  const usageData = [
    { name: 'Jan', users: 400, licenses: 240 },
    { name: 'Feb', users: 300, licenses: 139 },
    { name: 'Mar', users: 200, licenses: 980 },
    { name: 'Apr', users: 278, licenses: 390 },
    { name: 'May', users: 189, licenses: 480 },
    { name: 'Jun', users: 239, licenses: 380 },
  ]

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
  ]

  const statusData = [
    { name: 'Active', value: 400, color: '#10B981' },
    { name: 'Expired', value: 300, color: '#EF4444' },
    { name: 'Suspended', value: 200, color: '#F59E0B' },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Analytics</h1>
            <p className="text-secondary-600">Monitor your application performance and usage metrics</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-eye text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">24,567</h3>
              <p className="text-secondary-600">Total Views</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-people text-green-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">8,934</h3>
              <p className="text-secondary-600">Active Users</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-key text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">1,247</h3>
              <p className="text-secondary-600">License Activations</p>
              <p className="text-sm text-green-600 mt-1">+15% from last month</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-currency-dollar text-orange-600 text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-1">$15,420</h3>
              <p className="text-secondary-600">Monthly Revenue</p>
              <p className="text-sm text-green-600 mt-1">+22% from last month</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Usage Trends */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Usage Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="licenses" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* License Status Distribution */}
            <Card>
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">License Status Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}
