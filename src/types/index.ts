export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'user'
  subscription_tier: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  name: string
  description?: string
  owner_id: string
  api_key: string
  webhook_url?: string
  status: 'active' | 'suspended' | 'deleted'
  created_at: string
  updated_at: string
}

export interface License {
  id: string
  key: string
  application_id: string
  user_id?: string
  expires_at?: string
  max_uses?: number
  current_uses: number
  status: 'active' | 'expired' | 'suspended' | 'revoked'
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  license_id: string
  user_identifier: string
  ip_address: string
  user_agent?: string
  started_at: string
  ended_at?: string
  status: 'active' | 'ended'
}

export interface Analytics {
  total_users: number
  active_licenses: number
  total_sessions: number
  revenue: number
  growth_rate: number
}
