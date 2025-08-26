import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//TODO: Use environment variable for AUTH_BASE
const AUTH_BASE = 'http://localhost:8000/auth';

export default function LoginPage()  {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function login()
    {
        setLoading(true);
        const url = `${AUTH_BASE}/login`;
        const tempEmail = email;
        const tempPassword = password;

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

            setLoading(false);
            navigate('/Home');
        }
        catch(err : any)
        {
            setLoading(false);
            setErrMsg(err.message || 'Login failed');
        }
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
                {loading && <p className="text-primary">Loading...</p>}
                {errMsg !== '' && <p className="text-danger">{errMsg}</p>}
                <div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </>
    );
}