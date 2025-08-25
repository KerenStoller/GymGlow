import {useState} from "react";
import LoginPage from "./LoginPage.tsx";
import SignupPage from "./SignupPage.tsx";


export default function WelcomePage() {

    const [mode, setMode] = useState<"" | "login" | "signup">("");

    return (
        <>
            {mode !== "" && (
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setMode("")}
                    style={{ marginBottom: 12 }}
                >
                    Back
                </button>
            )}
            {mode === "" && (
                <>
                    <h1>Welcome to the Application!</h1>

                    <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-primary" onClick={() => setMode("login")}>
                            Login
                        </button>
                        <button className="btn btn-primary" onClick={() => setMode("signup")}>
                            Signup
                        </button>
                    </div>
                </>
            )}
            {mode === "login" && <LoginPage/>}
            {mode === "signup" && <SignupPage/>}
        </>
    );
}