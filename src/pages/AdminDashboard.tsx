import React, { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    systemHealth: 99.9
  })

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'Pro',
      status: 'Active',
      revenue: 49,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Enterprise',
      status: 'Active',
      revenue: 199,
      joinDate: '2024-01-10'
    }
  ])

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStats({
        totalUsers: 15847,
        totalApplications: 3421,
        totalRevenue: 284750,
        activeSubscriptions: 12456,
        systemHealth: 99.97
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  const handleUserAction = (user: any, action: string) => {
    console.log(`${action} user:`, user)
    // Implement user actions
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-secondary-900 mb-2">Admin Dashboard</h1>
                <p className="text-secondary-600">Manage users, monitor system health, and oversee platform operations</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-secondary-600">System Operational</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="text-center bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-people text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.totalUsers.toLocaleString()}</h3>
              <p className="text-red-100">Total Users</p>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-grid text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.totalApplications.toLocaleString()}</h3>
              <p className="text-orange-100">Applications</p>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-currency-dollar text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-green-100">Total Revenue</p>
            </Card>

            <Card className="text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-star text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.activeSubscriptions.toLocaleString()}</h3>
              <p className="text-blue-100">Active Subscriptions</p>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-shield-check text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.systemHealth}%</h3>
              <p className="text-purple-100">System Health</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Management */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-secondary-900">User Management</h2>
                  <Button onClick={() => setIsUserModalOpen(true)}>
                    <i className="bi bi-person-plus mr-2"></i>
                    Add User
                  </Button>
                </div>

                <div className="mb-4">
                  <Input
                    placeholder="Search users..."
                    icon="bi bi-search"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-red-50 border-b border-red-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-secondary-900">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-secondary-900">Plan</th>
                        <th className="text-left py-3 px-4 font-semibold text-secondary-900">Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold text-secondary-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-secondary-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-secondary-100 hover:bg-red-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-secondary-900">{user.name}</div>
                              <div className="text-sm text-secondary-600">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                              user.plan === 'Pro' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-secondary-900 font-medium">
                            ${user.revenue}/mo
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsUserModalOpen(true)
                                }}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUserAction(user, 'suspend')}
                              >
                                <i className="bi bi-pause"></i>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="danger"
                                onClick={() => handleUserAction(user, 'delete')}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Quick Actions & System Status */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-red-600 to-red-700">
                    <i className="bi bi-broadcast mr-3"></i>
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-300 text-red-700">
                    <i className="bi bi-download mr-3"></i>
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-300 text-red-700">
                    <i className="bi bi-gear mr-3"></i>
                    System Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-300 text-red-700">
                    <i className="bi bi-shield-exclamation mr-3"></i>
                    Security Audit
                  </Button>
                </div>
              </Card>

              {/* System Status */}
              <Card>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">API Response Time</span>
                    <span className="text-green-600 font-medium">45ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">Database Health</span>
                    <span className="text-green-600 font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">Active Sessions</span>
                    <span className="text-secondary-900 font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700">Error Rate</span>
                    <span className="text-green-600 font-medium">0.03%</span>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-secondary-900">New user registration</p>
                      <p className="text-xs text-secondary-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-secondary-900">Payment processed</p>
                      <p className="text-xs text-secondary-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-secondary-900">License key generated</p>
                      <p className="text-xs text-secondary-500">8 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false)
          setSelectedUser(null)
        }}
        title={selectedUser ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            defaultValue={selectedUser?.name || ''}
            placeholder="Enter full name"
          />
          <Input
            label="Email"
            type="email"
            defaultValue={selectedUser?.email || ''}
            placeholder="Enter email address"
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Plan</label>
            <select className="w-full rounded-lg border border-secondary-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
              <option value="free">Free</option>
              <option value="pro">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button className="flex-1 bg-gradient-to-r from-red-600 to-red-700">
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-red-300 text-red-700"
              onClick={() => {
                setIsUserModalOpen(false)
                setSelectedUser(null)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
