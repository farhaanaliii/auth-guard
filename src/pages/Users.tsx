import React, { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Sidebar } from '../components/layout/Sidebar'
import { User } from '../types'
import { format } from 'date-fns'

export const Users: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'john@example.com',
      full_name: 'John Doe',
      role: 'user',
      subscription_tier: 'pro',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      email: 'jane@example.com',
      full_name: 'Jane Smith',
      role: 'admin',
      subscription_tier: 'enterprise',
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      email: 'bob@example.com',
      full_name: 'Bob Johnson',
      role: 'user',
      subscription_tier: 'free',
      created_at: '2024-01-05T10:00:00Z',
      updated_at: '2024-01-05T10:00:00Z'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'user': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-yellow-100 text-yellow-800'
      case 'pro': return 'bg-green-100 text-green-800'
      case 'free': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">Users</h1>
              <p className="text-secondary-600">Manage user accounts and permissions</p>
            </div>
            <Button>
              <i className="bi bi-person-plus mr-2"></i>
              Invite User
            </Button>
          </div>

          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search users by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon="bi bi-search"
                />
              </div>
              <div className="flex gap-2">
                <select className="rounded-lg border border-secondary-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
                <select className="rounded-lg border border-secondary-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>All Tiers</option>
                  <option>Enterprise</option>
                  <option>Pro</option>
                  <option>Free</option>
                </select>
              </div>
            </div>
          </Card>

          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50 border-b border-secondary-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-secondary-900">User</th>
                    <th className="text-left py-3 px-6 font-medium text-secondary-900">Role</th>
                    <th className="text-left py-3 px-6 font-medium text-secondary-900">Subscription</th>
                    <th className="text-left py-3 px-6 font-medium text-secondary-900">Joined</th>
                    <th className="text-left py-3 px-6 font-medium text-secondary-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <i className="bi bi-person text-primary-600"></i>
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">{user.full_name}</p>
                            <p className="text-sm text-secondary-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(user.subscription_tier)}`}>
                          {user.subscription_tier}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-secondary-600">
                        {format(new Date(user.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button size="sm" variant="outline">
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button size="sm" variant="danger">
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
      </div>
    </div>
  )
}
