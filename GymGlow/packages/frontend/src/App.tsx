import WelcomePage from "./components/WelcomePage.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.tsx";

export default function App() {
    /*
  const [status, setStatus] = useState('loading...')
  const [me, setMe] = useState<null | { email: string; name?: string }>(null)
  const [msg, setMsg] = useState<string>('')
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


     */

    return (
    <div style={{ padding: 24 }}>
          <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    {/*extra stuff

    <p>
        Backend health: {status}{' '}
        <button onClick={refreshHealth}>Check health</button>
      </p>

      <div style={{ marginTop: 24, display: 'grid', gap: 8, maxWidth: 360 }}>
        <div style={{ display: 'flex', gap: 8 }}>
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

    */}

    </div>
  )
}