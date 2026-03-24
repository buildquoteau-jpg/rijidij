'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

// 📋 TEMPLATE — Private page gate
// Wrap any private page with this component
// If not logged in, shows a login prompt instead of the page content

interface PrivateGateProps {
  children: React.ReactNode
  pageName?: string
}

export default function PrivateGate({ children, pageName }: PrivateGateProps) {
  const { isOwner, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const success = await signIn(email, password)
    setLoading(false)
    if (!success) setError('Incorrect email or password')
  }

  if (isOwner) return <>{children}</>

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">

        {/* Icon and title */}
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-dark">Private Page</h1>
          <p className="text-sm text-dark opacity-50 mt-2">
            {pageName ? `${pageName} is private.` : 'This page is private.'}
            {' '}Owner login required.
          </p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-8 space-y-4">
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full border border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center text-xs text-dark opacity-30">
          Southwest Story · Private Property Website
        </p>

      </div>
    </div>
  )
}
