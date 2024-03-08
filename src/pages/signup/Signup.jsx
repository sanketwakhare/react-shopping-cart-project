import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UrlConfig from "../../utils/UrlConfig";
import "./signup.scss";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrMsg(null);
      if (!email || !password || !confirmPassword) {
        setLoading(false);
        setErrMsg("please enter required fields");
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
            User <b>{email}</b> registered successfully. You can{" "}
            <Link to="/login" className="link">
              <b>Login</b>
            </Link>{" "}
            now.{" "}
          </>
        );
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpLabel = loading ? "Signing up..." : "Sign Up";
  return (
    <div className="sign-up-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="sign-up-header">
            <div>
              <i className="fas fa-arrow-circle-left fa-2x"></i>
            </div>
            <p>Signup</p>
          </div>
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
            placeholder="enter same password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Link to="/login" className="link">
            <span>Already have an account ?</span>
          </Link>
          <br />
          <input type="submit" value={signUpLabel} onClick={handleSubmit} />
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
          <div className={successMsg ? "successContainer" : ""}>
            {successMsg}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
