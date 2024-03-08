import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log(name, email, password, confirmPassword);
            if (password !== confirmPassword) {
                setLoading(false);
                setErrMsg("Password and confirm Password are not the same");
                return;
            }
            const userDetails = {
                email: email,
                password: password,
            };
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(userDetails),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors[0].msg);
            }
            setErrMsg(null);
            navigate("/login");
        } catch (error) {
            setErrMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="sign-up-screen">
            <div className="container">
                <div className="innerContainer">
                    <div className="sign-up-header">
                        <div>
                            <i class="fas fa-arrow-circle-left fa-2x"></i>
                        </div>
                        <p>Signup</p>
                    </div>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email.."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your Password.."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="password">Confirm Password</label>
                    <input
                        type="password"
                        id="password"
                        name="confirmPassword"
                        placeholder="Your ConfirmPassword.."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Link to="/login" className="link">
                        <span>Already have an account ?</span>
                    </Link>
                    <br />
                    <input type="submit" value="Sign up" onClick={handleSubmit} />
                    <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
