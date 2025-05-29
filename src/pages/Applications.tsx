import React, { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Sidebar } from '../components/layout/Sidebar'
import { Application } from '../types'
import { applicationsService, analyticsService } from '../services/supabaseService'
import toast from 'react-hot-toast'

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newApp, setNewApp] = useState({ name: '', description: '' })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await applicationsService.getAll()
      setApplications(data || [])
    } catch (error: any) {
      toast.error('Failed to load applications: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateApp = async () => {
    if (!newApp.name.trim()) {
      toast.error('Application name is required')
      return
    }

    try {
      setCreating(true)
      const app = await applicationsService.create({
        name: newApp.name,
        description: newApp.description,
        owner_id: '', // Will be set by the service
        status: 'active'
      })
      
      setApplications([app, ...applications])
      setNewApp({ name: '', description: '' })
      setIsCreateModalOpen(false)
      toast.success('Application created successfully!')
      
      // Track analytics event
      await analyticsService.trackEvent(app.id, 'application_created', {
        name: app.name
      })
    } catch (error: any) {
      toast.error('Failed to create application: ' + error.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteApp = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return
    }

    try {
      await applicationsService.delete(id)
      setApplications(applications.filter(app => app.id !== id))
      toast.success('Application deleted successfully!')
    } catch (error: any) {
      toast.error('Failed to delete application: ' + error.message)
    }
  }

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey)
    toast.success('API key copied to clipboard!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'deleted': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-red-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-red-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-secondary-900 mb-2">Applications</h1>
              <p className="text-secondary-600">Manage your applications and API keys</p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <i className="bi bi-plus mr-2"></i>
              New Application
            </Button>
          </div>

          {applications.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="bi bi-grid text-red-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No applications yet</h3>
              <p className="text-secondary-600 mb-6">Create your first application to get started with AuthGuard.</p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-700"
              >
                <i className="bi bi-plus mr-2"></i>
                Create Application
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border-red-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <i className="bi bi-grid text-white text-xl"></i>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{app.name}</h3>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">{app.description || 'No description provided'}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">API Key</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 text-xs bg-red-50 px-3 py-2 rounded-lg font-mono border border-red-200">
                          {app.api_key?.substring(0, 20)}...
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => copyApiKey(app.api_key)}
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <i className="bi bi-clipboard"></i>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <i className="bi bi-gear mr-1"></i>
                        Settings
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <i className="bi bi-bar-chart mr-1"></i>
                        Analytics
                      </Button>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="danger" 
                      className="w-full"
                      onClick={() => handleDeleteApp(app.id)}
                    >
                      <i className="bi bi-trash mr-1"></i>
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

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
                required
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                <textarea
                  value={newApp.description}
                  onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                  placeholder="Enter application description (optional)"
                  rows={3}
                  className="w-full rounded-lg border border-secondary-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleCreateApp} 
                  loading={creating}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700"
                >
                  Create Application
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="flex-1 border-red-300 text-red-700"
                >
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
