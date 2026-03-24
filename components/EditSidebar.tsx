'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

// 📋 TEMPLATE — Edit sidebar
// Lock icon sits in bottom right corner of every page
// Owner clicks it, logs in, sidebar slides out with edit fields for that page

interface EditSidebarProps {
  children: React.ReactNode
  pageName: string
}

export default function EditSidebar({ children, pageName }: EditSidebarProps) {
  const { isOwner, signIn, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLockClick = () => {
    if (isOwner) {
      setOpen(!open)
    } else {
      setShowLogin(true)
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const success = await signIn(email, password)
    setLoading(false)
    if (success) {
      setShowLogin(false)
      setOpen(true)
    } else {
      setError('Incorrect email or password')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setOpen(false)
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setPasswordMessage('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    if (error) {
      setPasswordMessage('Error updating password. Try again.')
    } else {
      setPasswordMessage('✅ Password updated!')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setShowChangePassword(false)
        setPasswordMessage('')
      }, 2000)
    }
  }

  return (
    <>
      {/* Lock icon — bottom right corner */}
      <button
        onClick={handleLockClick}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition z-50"
        aria-label="Edit this page"
      >
        {isOwner ? '✏️' : '🔒'}
      </button>

      {/* Login popup */}
      {showLogin && !isOwner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-dark mb-6">Owner Login</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-dark opacity-60 block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-light rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-dark opacity-60 block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-light rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex-1 bg-primary text-white rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="flex-1 border border-light rounded-lg py-2 text-sm text-dark opacity-60 hover:opacity-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit sidebar */}
      {isOwner && open && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 flex flex-col">

          {/* Header */}
          <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60 uppercase tracking-wide">Editing</p>
              <p className="font-semibold">{pageName}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white opacity-60 hover:opacity-100 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Edit fields */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {children}
          </div>

          {/* Footer — account options */}
          <div className="border-t border-light p-4 space-y-2">

            {/* Change password */}
            {!showChangePassword ? (
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full text-sm text-dark opacity-40 hover:opacity-70 transition text-left px-2 py-1"
              >
                🔑 Change password
              </button>
            ) : (
              <div className="space-y-2 pb-2">
                <p className="text-xs font-semibold text-dark opacity-60">Change Password</p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full border border-light rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-light rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
                {passwordMessage && (
                  <p className="text-xs text-primary">{passwordMessage}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="flex-1 bg-primary text-white rounded-lg py-1.5 text-xs font-medium disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Update'}
                  </button>
                  <button
                    onClick={() => {
                      setShowChangePassword(false)
                      setPasswordMessage('')
                    }}
                    className="flex-1 border border-light rounded-lg py-1.5 text-xs text-dark opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="w-full text-sm text-dark opacity-40 hover:opacity-70 transition text-left px-2 py-1"
            >
              → Sign out
            </button>
          </div>
        </div>
      )}
    </>
  )
}
