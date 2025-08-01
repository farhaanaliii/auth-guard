/*
  # AuthGuard Complete Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with subscription info
    - `applications` - User applications with API keys
    - `licenses` - License keys for applications
    - `sessions` - Active user sessions
    - `webhooks` - Webhook configurations
    - `analytics_events` - Event tracking for analytics
    - `payments` - Payment history and billing
    - `api_usage` - API usage tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Secure API key generation
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  company text,
  timezone text DEFAULT 'UTC',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  api_key text UNIQUE NOT NULL DEFAULT ('sk_' || encode(gen_random_bytes(32), 'hex')),
  webhook_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL DEFAULT ('LIC-' || upper(encode(gen_random_bytes(4), 'hex')) || '-' || upper(encode(gen_random_bytes(4), 'hex')) || '-' || upper(encode(gen_random_bytes(4), 'hex')) || '-' || upper(encode(gen_random_bytes(4), 'hex'))),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  expires_at timestamptz,
  max_uses integer,
  current_uses integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended', 'revoked')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id uuid REFERENCES licenses(id) ON DELETE CASCADE,
  user_identifier text NOT NULL,
  ip_address inet,
  user_agent text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  metadata jsonb DEFAULT '{}'
);

-- Create webhooks table
CREATE TABLE IF NOT EXISTS webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  url text NOT NULL,
  events text[] NOT NULL,
  secret text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  stripe_payment_id text,
  subscription_tier text,
  billing_period_start timestamptz,
  billing_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create api_usage table
CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  method text NOT NULL,
  status_code integer,
  response_time_ms integer,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Applications policies
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can create applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update own applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can delete own applications"
  ON applications
  FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

-- Licenses policies
CREATE POLICY "Users can read licenses for own applications"
  ON licenses
  FOR SELECT
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create licenses for own applications"
  ON licenses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update licenses for own applications"
  ON licenses
  FOR UPDATE
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete licenses for own applications"
  ON licenses
  FOR DELETE
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

-- Sessions policies
CREATE POLICY "Users can read sessions for own licenses"
  ON sessions
  FOR SELECT
  TO authenticated
  USING (
    license_id IN (
      SELECT l.id FROM licenses l
      JOIN applications a ON l.application_id = a.id
      WHERE a.owner_id = auth.uid()
    )
  );

-- Webhooks policies
CREATE POLICY "Users can manage webhooks for own applications"
  ON webhooks
  FOR ALL
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

-- Analytics policies
CREATE POLICY "Users can read analytics for own applications"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

-- Payments policies
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- API Usage policies
CREATE POLICY "Users can read api usage for own applications"
  ON api_usage
  FOR SELECT
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM applications WHERE owner_id = auth.uid()
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at
  BEFORE UPDATE ON licenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at
  BEFORE UPDATE ON webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_owner_id ON applications(owner_id);
CREATE INDEX IF NOT EXISTS idx_licenses_application_id ON licenses(application_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_sessions_license_id ON sessions(license_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_application_id ON analytics_events(application_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_api_usage_application_id ON api_usage(application_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at);