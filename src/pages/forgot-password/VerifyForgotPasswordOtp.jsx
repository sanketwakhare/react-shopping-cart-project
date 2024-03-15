import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import UrlConfig from "../../utils/UrlConfig";

const VerifyForgotPasswordOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location?.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrMsg(null);
      if (!otp) {
        setLoading(false);
        setErrMsg("Please provide required fields");
        return;
      }

      const otpDetails = {
        otp: otp,
      };
      const response = await fetch(
        UrlConfig.VALIDATE_OTP_URL.replace(":userId", userId),
        {
          method: "POST",
          body: JSON.stringify(otpDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else if (response.ok === false) {
        throw new Error(data.message);
      } else if (response.ok === true) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate("/reset-password", { state: { userId } });
        }, 2000);
        setOtp("");
      }
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpBtnLabel = loading ? "Verifying OTP..." : "Verify OTP";

  return (
    <div className="sign-in-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="sign-in-header">
            <p>Verification required</p>
            <label>
              To continue, complete this verification step. We've sent an OTP to
              the email <span className="strong">{email}</span>. Please enter it
              below to complete verification.
            </label>
          </div>
          <form onSubmit={handleSubmit}>
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
              <input type="submit" value={verifyOtpBtnLabel} />
              <span>
                <label>Back to </label>
                <Link to="/login" className="link">
                  <span>Sign in</span>
                </Link>
              </span>
            </div>
          </form>
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
          {successMsg && <div className="successContainer">OTP verified</div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPasswordOtp;
