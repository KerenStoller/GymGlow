import { useState } from 'react';

export default function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signin() {
        clearStates();
        callBackend();
        console.log("Logging in with", email, password);
    }

    async function callBackend() {
        try{
            const res = await fetch('http://localhost:4000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials: 'include',
                body: new URLSearchParams({
                    'username': email,
                    'password': password
                }).toString(),
            });
        }
        catch(err){
            console.error("Error during signin:", err);
        }
    }

    async function clearStates() {
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <h2>Sign in</h2>
            <form onSubmit={e => { e.preventDefault(); signin(); }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Sign in</button>
            </form>
        </>
    );
}