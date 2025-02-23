import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import UrlConfig from "utils/UrlConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
      if (!email) {
        setLoading(false);
        setErrMsg("Please provide required fields");
        return;
      }

      const emailDetails = {
        email: email,
      };
      const response = await fetch(UrlConfig.FORGOT_PASSWORD_URL, {
        method: "POST",
        body: JSON.stringify(emailDetails),
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
        const { userId } = data;
        navigate("/verify-forgot-password-otp", { state: { email, userId } });
      }
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtpBtnLabel = loading ? "Sending OTP..." : "Send OTP";

  return (
    <div className="form-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="form-header">
            <p>Password assistance</p>
            <label>Enter the email address associated with your account.</label>
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
            <div className="form-actions-container">
              <input type="submit" value={sendOtpBtnLabel} />
              <span>
                <label>Back to </label>
                <Link to="/login" className="link">
                  <span>Sign in</span>
                </Link>
              </span>
            </div>
          </form>
          <div className={errMsg ? "error-container" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
