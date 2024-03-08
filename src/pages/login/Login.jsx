import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

function Login() {
    /*****data for you backend***/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setErrMsg(null);
            if (!email || !password) {
                setLoading(false);
                setErrMsg("please enter required fields");
                return;
            }
            let userDetails = {
                email,
                password,
            };
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(userDetails),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors[0].msg);
            } else if (response.ok === false) {
                throw new Error(data.message);
            } else if (response.ok === true) {
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (err) {
            setErrMsg(err.message);
        } finally {
            setLoading(false);
        }
    };
    /**
     * email, password -> verified
     * protected Routes : profile , orders , -> need your verification -> JWT
     *
     * **/
    const signInLabel = loading ? "Signing in..." : "Sign In";
    return (
        <div className="sign-in-screen">
            <div className="container">
                <div className="innerContainer">
                    <div className="sign-in-header">
                        <div>
                            <i className="fas fa-arrow-circle-left fa-2x"></i>
                        </div>
                        <p>Sign In</p>
                    </div>

                    <label htmlFor="email">Email<span required>*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password<span required>*</span></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to="/signup" className="link">
                        <span>Create a new account ?</span>
                    </Link>
                    <br />
                    <input type="submit" value={signInLabel} onClick={handleSubmit} />
                    <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
