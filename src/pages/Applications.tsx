import React, { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Sidebar } from '../components/layout/Sidebar'
import { Application } from '../types'

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      name: 'MyGameLauncher',
      description: 'Game launcher with authentication',
      owner_id: 'user1',
      api_key: 'sk_live_abc123...',
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'WebApp Pro',
      description: 'Professional web application',
      owner_id: 'user1',
      api_key: 'sk_live_def456...',
      status: 'active',
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newApp, setNewApp] = useState({ name: '', description: '' })

  const handleCreateApp = () => {
    const app: Application = {
      id: Date.now().toString(),
      name: newApp.name,
      description: newApp.description,
      owner_id: 'user1',
      api_key: `sk_live_${Math.random().toString(36).substring(2)}`,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setApplications([...applications, app])
    setNewApp({ name: '', description: '' })
    setIsCreateModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'deleted': return 'bg-red-100 text-red-800'
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
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">Applications</h1>
              <p className="text-secondary-600">Manage your applications and API keys</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <i className="bi bi-plus mr-2"></i>
              New Application
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <i className="bi bi-grid text-primary-600 text-xl"></i>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{app.name}</h3>
                <p className="text-secondary-600 text-sm mb-4">{app.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">API Key</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 text-xs bg-secondary-100 px-2 py-1 rounded font-mono">
                        {app.api_key}
                      </code>
                      <Button size="sm" variant="ghost">
                        <i className="bi bi-clipboard"></i>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <i className="bi bi-gear mr-1"></i>
                      Settings
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <i className="bi bi-bar-chart mr-1"></i>
                      Analytics
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            title="Create New Application"
          >
            <div className="space-y-4">
              <Input
                label="Application Name"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                placeholder="Enter application name"
              />
              <Input
                label="Description"
                value={newApp.description}
                onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                placeholder="Enter application description"
              />
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleCreateApp} className="flex-1">
                  Create Application
                </Button>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
