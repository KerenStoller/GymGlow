import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {API} from "../utils/emdpoints.ts";
import cuteKoalaPic from '../assets/cute-koala.jpg';

const LandingPage = () =>
{
    const navigate = useNavigate();
    const [mode, setMode] = useState<"" | "Login" | "Signup">("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clearStates()
    {
        setErrMsg('');
        setName('');
        setEmail('');
        setPassword('');
    }

    async function callBackend(url: string, fetchBody: RequestInit)
    {
        try
        {
            const response = await fetch(url, fetchBody);
            clearStates();

            if (!response.ok)
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

            // save token
            const resData = await response.json();
            localStorage.setItem('token', resData.access_token);

            setLoading(false);
            navigate('/home');
        }
        catch (error: any) //TODO: Narrow down error type
        {
            setLoading(false);
            setErrMsg(error.detail || `${mode} failed`);
        }
    }

    async function handleSubmit(event: React.FormEvent)
    {
        event.preventDefault();
        setLoading(true);

        let url = API.AUTH.LOGIN;
        let fetchBody: RequestInit = {
            method: "POST",
            headers: {},
            credentials: "include",
            body: "",
        };

        if (mode === "Login")
        {
            fetchBody.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            fetchBody.body = new URLSearchParams({username: email, password: password}).toString();
        }
        else if (mode === "Signup")
        {
            url = API.AUTH.SIGNUP;
            fetchBody.headers = { 'Content-Type': 'application/JSON' };
            fetchBody.body = JSON.stringify({ name: name, email: email, password: password });
        }

        await callBackend(url, fetchBody);
    }

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-90">
                {/* Left Side: Form */}
                 <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
                     {mode === "" && (
                        <>
                            <h1 className="m-0 text-primary">Welcome!</h1>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button className="btn btn-primary" onClick={() => setMode("Login")}>
                                    Login
                                </button>
                                <button className="btn btn-primary" onClick={() => setMode("Signup")}>
                                    Signup
                                </button>
                            </div>
                        </>
                    )}
                    {mode !== "" && (
                        <>
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => {setMode(""); clearStates();}}
                                style={{ marginBottom: 12 }}>
                                Back
                            </button>

                            <h2>{mode}</h2>
                            <form onSubmit={(e) => handleSubmit(e)}
                                className="auth-form"
                                style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                maxWidth: '300px'
                                }}>
                                {mode === "Signup" && (
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        required={true}
                                    />
                                )}
                                <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="form-control"
                                required={true}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="form-control"
                                    required={true}
                                />
                                {loading && <p className="text-primary">Loading...</p>}
                                {!loading && errMsg !== '' && <p className="text-danger">{errMsg}</p>}
                                <div>
                                    <button className="btn btn-primary" type="submit">{mode}</button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Right Side: Image */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <img src={cuteKoalaPic}
                         alt="Landing visual"
                         className="img-fluid h-90 w-90 object-fit-cover"
                         style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );

};

export default LandingPage;
