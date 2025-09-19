import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {API} from "../utils/endpoints.ts";
import cuteKoalaPic from '../assets/cute-koala.jpg';
import axios from '../api/axios.ts';
import useTokens from "../hooks/useTokens.ts";

const LandingPage = () =>
{
    const navigate = useNavigate();
    const [mode, setMode] = useState<"" | "Login" | "Signup">("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const {setAccess, setGotRefresh} = useTokens();

    function clearStates() {
        setErrMsg('');
        if (name.current) name.current.value = '';
        if (email.current) email.current.value = '';
        if (password.current) password.current.value = '';
    }

    async function handleSubmit(event: React.FormEvent)
    {
        event.preventDefault();
        setLoading(true);

        // get admin id if not already in local storage.
        if(!localStorage.getItem('adminId'))
        {
            try
            {
                const responseAdminId = await axios.get(API.AUTH.ADMIN);
                localStorage.setItem('adminId', responseAdminId.data.admin_id);
            }
            catch (e: any)
            {
                setErrMsg(e.message);
                setLoading(false);
                return;
            }
        }

        try
        {
            let response;

            if (mode === "Login")
            {
                const params = new URLSearchParams({
                    username: email.current!.value,
                    password: password.current!.value,});
                response = await axios.post(
                    API.AUTH.LOGIN,
                    params,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        withCredentials: true
                    });
            }
            if (mode === "Signup")
            {
                response = await axios.post(
                    API.AUTH.SIGNUP,
                    { name: name.current!.value, email: email.current!.value, password: password.current!.value },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
            }

            clearStates();

            if (response) // adding this check to satisfy typescript
            {
                //console.log(document.cookie);
                setAccess(response.data.access_token);
                setGotRefresh(true);
                navigate('/home');
            }
        }
        catch (e: any)
        {
            if (e.response.data)
            {
                setErrMsg(e.response.data.detail);
            }
            else
            {
                setErrMsg(e.message);
            }
        }

        setLoading(false);
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
                                onClick={() => {clearStates(); setMode("");}}
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
                                        ref={name}
                                        className="form-control"
                                        required={true}
                                    />
                                )}
                                <input
                                type="email"
                                placeholder="Email"
                                ref={email}
                                className="form-control"
                                required={true}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    ref={password}
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
