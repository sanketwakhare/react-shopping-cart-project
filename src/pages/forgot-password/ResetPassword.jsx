import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async () => {
    setSuccessMsg("Success");
  };

  return (
    <div className="sign-in-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="sign-in-header">
            <p>Create new password</p>
            <label>We'll ask for this password whenever you sign in.</label>
          </div>
          <label htmlFor="password">
            New Password<span required>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            value={password}
            minLength={6}
            maxLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm-password">
            Confirm Password<span required>*</span>
          </label>
          <input
            type="password"
            name="confirm-password"
            placeholder="enter password again"
            value={confirmPassword}
            minLength={6}
            maxLength={6}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="sign-in-actions-container">
            <input
              type="submit"
              value="Reset Password"
              onClick={handleSubmit}
            />
          </div>
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
          {successMsg && (
            <div className="successContainer">
              Password reset successfully. You can{" "}
              <Link to="/login">Log in</Link> now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
