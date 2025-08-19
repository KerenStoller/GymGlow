import { useEffect, useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('loading...')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [me, setMe] = useState<null | { email: string; name?: string }>(null)
  const [msg, setMsg] = useState<string>('')
  const [name, setName] = useState('')
  const AUTH_BASE = '/auth'

  useEffect(() => {
    fetch('/health')
      .then(r => r.json())
      .then(d => setStatus(d.status))
      .catch(() => setStatus('error'))
  }, [])

  async function refreshHealth() {
    setStatus('checking...')
    setMsg('')
    try {
      const res = await fetch('/health')
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      setStatus(data.status ?? 'ok')
      setMsg('Health OK')
    } catch {
      setStatus('error')
      setMsg('Health check failed')
    }
  }

  async function signin(emailArg?: string, passwordArg?: string) {
    setMsg('')
    const e = emailArg ?? email
    const p = passwordArg ?? password
    // Clear inputs immediately after click
    setEmail('')
    setPassword('')
    setName('') // clear name on signin as well
    try {
      const form = new URLSearchParams()
      form.set('username', e)
      form.set('password', p)
      const res = await fetch(`${AUTH_BASE}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: form.toString(),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        if (res.status === 404) throw new Error('Signin endpoint not found')
        throw new Error(err.detail || 'Invalid credentials')
      }
      setMsg('Signed in')
    } catch (e: any) {
      setMsg(e.message || 'Signin failed')
    }
  }

  async function signup() {
    setMsg('')
    // Snapshot values, then clear inputs immediately after click
    const e = email
    const p = password
    const n = name
    setEmail('')
    setPassword('')
    setName('')
    try {
      const res = await fetch(`${AUTH_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e, name: n, password: p }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        if (res.status === 404) throw new Error('Signup endpoint not found')
        throw new Error(err.detail || 'Signup failed')
      }
      setMsg('Account created, signing in...')
      // Reuse captured credentials to sign in
      await signin(e, p)
    } catch (e: any) {
      setMsg(e.message || 'Signup failed')
    }
  }

  async function getMe() {
    setMsg('')
    setMe(null)
    try {
      const res = await fetch(`${AUTH_BASE}/me`, { credentials: 'include' })
      if (!res.ok) throw new Error(res.status === 404 ? 'Me endpoint not found' : 'Not authenticated')
      const data = await res.json()
      setMe(data)
    } catch (e: any) {
      setMsg(e.message || 'Failed to load profile')
    }
  }

  async function logout() {
    setMsg('')
    setMe(null)
    try {
      const res = await fetch(`${AUTH_BASE}/logout`, { method: 'POST', credentials: 'include' })
      if (!res.ok && res.status === 404) throw new Error('Logout endpoint not found')
      setMsg('Logged out')
    } catch (e: any) {
      setMsg(e.message || 'Logout failed')
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Frontend</h1>
      <p>
        Backend health: {status}{' '}
        <button onClick={refreshHealth}>Check health</button>
      </p>

      <div style={{ marginTop: 24, display: 'grid', gap: 8, maxWidth: 360 }}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={signup}>Sign up</button>
          {/* Use arrow function to avoid passing click event as an argument */}
          <button onClick={() => signin()}>Sign in</button>
          <button onClick={getMe}>Me</button>
          <button onClick={logout}>Logout</button>
        </div>
        {msg && <div>{msg}</div>}
        {me && (
          <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(me, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}