import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
//TODO: Use environment variable for AUTH_BASE
const AUTH_BASE = 'http://localhost:8000/auth';

export default function SignupPage() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function signup()
    {
        setLoading(true);
        const url = `${AUTH_BASE}/signup`;
        const tempName = name;
        const tempEmail = email;
        const tempPassword = password;

        try
        {
            const response = await fetch(url,
                {
                method: 'POST',
                headers: { 'Content-Type': 'application/JSON' },
                credentials: 'include',
                body: JSON.stringify({ name: tempName, email: tempEmail, password: tempPassword })
                });

            if (!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 404) throw new Error('Signup endpoint not found');
                throw new Error(err.detail || 'Signup failed');
            }

            setLoading(false);
            navigate('/home');
        }
        catch(err : any)
        {
            setLoading(false);
            setErrMsg(err.message || 'Signup failed')
        }
    }

    return (
        <>
            <h2>Signup</h2>
            <form
                onSubmit={e => { e.preventDefault(); signup();}}
                className="auth-form"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxWidth: '300px'
                }}
            >
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
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
                {!loading && errMsg !== '' && <p className="text-danger">{errMsg}</p>}
                <div>
                    <button className="btn btn-primary" type="submit">Signup</button>
                </div>
            </form>
        </>
    );
}