import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const VerifyForgotPasswordOtp = (props) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location?.state;

  const handleSubmit = async () => {
    navigate("/reset-password");
  };

  return (
    <div className="sign-in-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="sign-in-header">
            <p>Verification required</p>
            <label>
              To continue, complete this verification step. We've sent an OTP to
              the email {email ?? "no email provided"}. Please enter it below to
              complete verification.
            </label>
          </div>
          <label htmlFor="otp">
            Enter OTP<span required>*</span>
          </label>
          <input
            type="number"
            name="otp"
            placeholder="OTP"
            value={otp}
            minLength={6}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="sign-in-actions-container">
            <input type="submit" value="Continue" onClick={handleSubmit} />
          </div>
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPasswordOtp;
