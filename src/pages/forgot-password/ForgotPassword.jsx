import { useState } from "react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/verify-forgot-password-otp", { state: { email } });
  };

  return (
    <div className="sign-in-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="sign-in-header">
            <p>Password assistance</p>
            <label>Enter the email address associated with your account.</label>
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
          <div className="sign-in-actions-container">
            <input type="submit" value="Receive OTP" onClick={handleSubmit} />
          </div>
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
