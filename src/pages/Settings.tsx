import React, { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Sidebar } from '../components/layout/Sidebar'

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Corp',
    timezone: 'UTC'
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    licenseExpiry: true,
    securityAlerts: true,
    weeklyReports: false
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'bi-person' },
    { id: 'security', label: 'Security', icon: 'bi-shield-lock' },
    { id: 'notifications', label: 'Notifications', icon: 'bi-bell' },
    { id: 'billing', label: 'Billing', icon: 'bi-credit-card' },
    { id: 'api', label: 'API Keys', icon: 'bi-key' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <Input
                label="Company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Timezone</label>
                <select 
                  className="w-full rounded-lg border border-secondary-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-secondary-900">Change Password</h3>
              <Input
                label="Current Password"
                type="password"
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
              />
              <Input
                label="New Password"
                type="password"
                value={security.newPassword}
                onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={security.confirmPassword}
                onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
              />
              <Button>Update Password</Button>
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-900">Enable two-factor authentication</p>
                  <p className="text-sm text-secondary-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant={security.twoFactorEnabled ? 'danger' : 'primary'}>
                  {security.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                </Button>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-secondary-900">Notification Preferences</h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                      {key === 'licenseExpiry' && 'Get notified when licenses are about to expire'}
                      {key === 'securityAlerts' && 'Receive alerts for security-related events'}
                      {key === 'weeklyReports' && 'Get weekly usage and analytics reports'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
            <Button>Save Preferences</Button>
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center">
                <i className="bi bi-info-circle text-primary-600 mr-2"></i>
                <p className="text-primary-800">You are currently on the <strong>Pro Plan</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Free</h3>
                <p className="text-3xl font-bold text-secondary-900 mb-4">$0<span className="text-sm font-normal">/month</span></p>
                <ul className="text-sm text-secondary-600 space-y-2 mb-4">
                  <li>1 Application</li>
                  <li>100 License Keys</li>
                  <li>Basic Analytics</li>
                </ul>
                <Button variant="outline" className="w-full">Current Plan</Button>
              </Card>

              <Card className="text-center ring-2 ring-primary-500">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Pro</h3>
                <p className="text-3xl font-bold text-secondary-900 mb-4">$29<span className="text-sm font-normal">/month</span></p>
                <ul className="text-sm text-secondary-600 space-y-2 mb-4">
                  <li>10 Applications</li>
                  <li>10,000 License Keys</li>
                  <li>Advanced Analytics</li>
                </ul>
                <Button className="w-full">Current Plan</Button>
              </Card>

              <Card className="text-center">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-secondary-900 mb-4">$99<span className="text-sm font-normal">/month</span></p>
                <ul className="text-sm text-secondary-600 space-y-2 mb-4">
                  <li>Unlimited Applications</li>
                  <li>Unlimited License Keys</li>
                  <li>Real-time Analytics</li>
                </ul>
                <Button variant="outline" className="w-full">Upgrade</Button>
              </Card>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-secondary-900">API Keys</h3>
              <Button>
                <i className="bi bi-plus mr-2"></i>
                Generate New Key
              </Button>
            </div>

            <div className="space-y-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-secondary-900">Production API Key</h4>
                    <p className="text-sm text-secondary-600">Created on Jan 15, 2024</p>
                    <code className="text-xs bg-secondary-100 px-2 py-1 rounded mt-2 inline-block">
                      sk_live_abc123...
                    </code>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <i className="bi bi-clipboard"></i>
                    </Button>
                    <Button size="sm" variant="danger">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-secondary-900">Development API Key</h4>
                    <p className="text-sm text-secondary-600">Created on Jan 10, 2024</p>
                    <code className="text-xs bg-secondary-100 px-2 py-1 rounded mt-2 inline-block">
                      sk_test_def456...
                    </code>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <i className="bi bi-clipboard"></i>
                    </Button>
                    <Button size="sm" variant="danger">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-secondary-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Settings</h1>
            <p className="text-secondary-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                        }
                      `}
                    >
                      <i className={`${tab.icon} text-lg`}></i>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                {renderTabContent()}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
