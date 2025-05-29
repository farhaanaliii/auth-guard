import { supabase } from '../lib/supabase'
import { Application, License, User } from '../types'

// Applications Service
export const applicationsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(application: Omit<Application, 'id' | 'created_at' | 'updated_at' | 'api_key'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('applications')
      .insert({
        ...application,
        owner_id: user.id
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Application>) {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Licenses Service
export const licensesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('licenses')
      .select(`
        *,
        applications (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(license: Omit<License, 'id' | 'created_at' | 'updated_at' | 'key' | 'current_uses'>) {
    const { data, error } = await supabase
      .from('licenses')
      .insert(license)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<License>) {
    const { data, error } = await supabase
      .from('licenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('licenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async revoke(id: string) {
    return this.update(id, { status: 'revoked' })
  }
}

// Users Service (for admin)
export const usersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateProfile(updates: Partial<User>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error) throw error
    return data
  }
}

// Analytics Service
export const analyticsService = {
  async getStats() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Get applications count
    const { count: appsCount } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id)

    // Get licenses count
    const { count: licensesCount } = await supabase
      .from('licenses')
      .select('*', { count: 'exact', head: true })
      .in('application_id', 
        supabase
          .from('applications')
          .select('id')
          .eq('owner_id', user.id)
      )

    // Get active sessions count
    const { count: sessionsCount } = await supabase
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    return {
      totalApplications: appsCount || 0,
      activeLicenses: licensesCount || 0,
      totalSessions: sessionsCount || 0,
      monthlyRevenue: 0 // Calculate based on subscription
    }
  },

  async trackEvent(applicationId: string, eventType: string, eventData: any = {}) {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        application_id: applicationId,
        event_type: eventType,
        event_data: eventData
      })
    
    if (error) throw error
  }
}

// Payments Service
export const paymentsService = {
  async getPaymentHistory() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createPayment(paymentData: any) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...paymentData,
        user_id: user.id
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Webhooks Service
export const webhooksService = {
  async getAll(applicationId: string) {
    const { data, error } = await supabase
      .from('webhooks')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(webhook: any) {
    const { data, error } = await supabase
      .from('webhooks')
      .insert(webhook)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('webhooks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('webhooks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
