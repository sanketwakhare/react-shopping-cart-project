import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UrlConfig from "../../utils/UrlConfig";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  useEffect(() => {
    if (isLoggedIn) {
      // navigate to home page if user already logged in
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrMsg(null);
      if (!email || !password || !confirmPassword) {
        setLoading(false);
        setErrMsg("Please provide required fields");
        return;
      }
      if (password !== confirmPassword) {
        setLoading(false);
        setErrMsg("Password and confirm Password are not the same");
        return;
      }
      const userDetails = {
        email: email,
        password: password,
      };
      const response = await fetch(UrlConfig.SIGN_UP_URL, {
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
        setErrMsg(null);
        setSuccessMsg(
          <>
            User <b>{email}</b> registered successfully.
          </>
        );
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpLabel = loading ? "Signing up..." : "Sign up";
  return (
    <div className="form-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="form-header">
            <p>Create Account</p>
            <label className="centered-text">
              Join now and elevate your shopping experience.
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email<span required>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              Password<span required>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">
              Confirm Password<span required>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="form-actions-container">
              <input type="submit" value={signUpLabel} />
              <span>
                <label>Already have an account? </label>
                <Link to="/login" className="link">
                  <span>Sign in</span>
                </Link>
              </span>
            </div>
          </form>
          <div className={errMsg ? "error-container" : ""}>{errMsg}</div>
          <div className={successMsg ? "success-container" : ""}>
            {successMsg}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
