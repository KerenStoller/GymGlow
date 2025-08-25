import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//TODO: Use environment variable for AUTH_BASE
const AUTH_BASE = 'http://localhost:8000/auth';

export default function LoginPage()  {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    async function login()
    {
        const url = `${AUTH_BASE}/login`;
        const tempEmail = email;
        const tempPassword = password;

        clearStates();

        try
        {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials: 'include',
                body: new URLSearchParams({username: tempEmail, password: tempPassword}).toString()
                });

            if (!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 404) throw new Error('Login endpoint not found');
                throw new Error(err.detail || 'Invalid credentials');
            }

            navigate('/Home');
        }
        catch(err : any)
        {
            setMsg(err.message || 'Login failed');
        }
    }

    function clearStates()
    {
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <h2>Login</h2>
            <form
                onSubmit={e => { e.preventDefault(); login(); }}
                className="auth-form"
                style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '300px'
                }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                />
                {msg !== '' && <p className="text-danger">{msg}</p>}
                <div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </>
    );
}