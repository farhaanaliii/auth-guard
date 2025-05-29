import React, { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Sidebar } from '../components/layout/Sidebar'
import { License } from '../types'
import { format } from 'date-fns'

export const Licenses: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([
    {
      id: '1',
      key: 'LIC-ABCD-1234-EFGH-5678',
      application_id: '1',
      expires_at: '2024-12-31T23:59:59Z',
      max_uses: 100,
      current_uses: 45,
      status: 'active',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      key: 'LIC-WXYZ-9876-MNOP-5432',
      application_id: '2',
      max_uses: 50,
      current_uses: 12,
      status: 'active',
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newLicense, setNewLicense] = useState({
    application_id: '',
    expires_at: '',
    max_uses: ''
  })

  const handleCreateLicense = () => {
    const license: License = {
      id: Date.now().toString(),
      key: `LIC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      application_id: newLicense.application_id,
      expires_at: newLicense.expires_at || undefined,
      max_uses: newLicense.max_uses ? parseInt(newLicense.max_uses) : undefined,
      current_uses: 0,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setLicenses([...licenses, license])
    setNewLicense({ application_id: '', expires_at: '', max_uses: '' })
    setIsCreateModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'revoked': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUsagePercentage = (current: number, max?: number) => {
    if (!max) return 0
    return (current / max) * 100
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">License Keys</h1>
              <p className="text-secondary-600">Manage and monitor your license keys</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <i className="bi bi-plus mr-2"></i>
              Generate License
            </Button>
          </div>

          <div className="space-y-4">
            {licenses.map((license) => (
              <Card key={license.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <i className="bi bi-key text-primary-600"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-900">{license.key}</h3>
                        <p className="text-sm text-secondary-600">Application ID: {license.application_id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.status)}`}>
                        {license.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Expires</label>
                        <p className="text-sm text-secondary-900">
                          {license.expires_at ? format(new Date(license.expires_at), 'MMM dd, yyyy') : 'Never'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Usage</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-secondary-900">
                            {license.current_uses}{license.max_uses ? `/${license.max_uses}` : ''}
                          </p>
                          {license.max_uses && (
                            <div className="flex-1 bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getUsagePercentage(license.current_uses, license.max_uses)}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Created</label>
                        <p className="text-sm text-secondary-900">
                          {format(new Date(license.created_at), 'MMM dd, yyyy')}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <i className="bi bi-clipboard mr-1"></i>
                          Copy
                        </Button>
                        <Button size="sm" variant="outline">
                          <i className="bi bi-gear mr-1"></i>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger">
                          <i className="bi bi-trash mr-1"></i>
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            title="Generate New License"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Application</label>
                <select 
                  className="w-full rounded-lg border border-secondary-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={newLicense.application_id}
                  onChange={(e) => setNewLicense({ ...newLicense, application_id: e.target.value })}
                >
                  <option value="">Select Application</option>
                  <option value="1">MyGameLauncher</option>
                  <option value="2">WebApp Pro</option>
                </select>
              </div>
              
              <Input
                label="Expiration Date (Optional)"
                type="date"
                value={newLicense.expires_at}
                onChange={(e) => setNewLicense({ ...newLicense, expires_at: e.target.value })}
              />
              
              <Input
                label="Max Uses (Optional)"
                type="number"
                value={newLicense.max_uses}
                onChange={(e) => setNewLicense({ ...newLicense, max_uses: e.target.value })}
                placeholder="Leave empty for unlimited"
              />
              
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleCreateLicense} className="flex-1">
                  Generate License
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
