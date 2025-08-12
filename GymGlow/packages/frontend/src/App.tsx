import { useEffect, useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('loading...')
  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setStatus(d.status))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Frontend</h1>
      <p>Backend health: {status}</p>
    </div>
  )
}