import {useState} from 'react';
import {useNavigate, useLoaderData} from "react-router-dom";

const HomePage = () =>
{
    const navigate = useNavigate();
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const token = useLoaderData();

    function logout()
    {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    async function health()
    {
        setLoading(true);
        const url = 'http://localhost:8000/health';

        try
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}})

            if(!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 404)
                {
                    throw new Error('endpoint not found');
                }
                else
                {
                    throw err;
                }
            }

            const responseJson = await response.json();
            setResult(JSON.stringify(responseJson));
            setLoading(false);
        }
        catch (error)
        {
            setLoading(false);
            setErrorMsg('Action failed');
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
            <button
                    className="btn btn-success"
                    onClick={() => health()}
                    style={{ marginBottom: 12 }}
                >
                    Health
            </button>
            {<p>{result}</p>}
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </>
    );
};

export default HomePage;