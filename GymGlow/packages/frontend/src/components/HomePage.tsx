import { useNavigate } from 'react-router-dom';
//TODO: Use environment variable for AUTH_BASE
const AUTH_BASE = 'http://localhost:8000/auth';

const HomePage = () => {

    const navigate = useNavigate();

    async function logout()
    {
        const url = `${AUTH_BASE}/logout`;
        try
        {
            const response = await fetch(url,
                {
                    method: 'POST',
                    credentials: 'include'
                });

            if (!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 404) throw new Error('Signup endpoint not found');
                throw new Error(err.detail || 'Signup failed');
            }

            navigate('/');
        }
        catch (error ) {
            console.error("Logout failed", error);
        }
    }

    return (
        <>
            <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => logout()}
                    style={{ marginBottom: 12 }}
                >
                    Logout
                </button>
            <h1>Home Page - User is logged in</h1>
        </>
    );
};

export default HomePage;