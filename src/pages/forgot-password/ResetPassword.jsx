import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import UrlConfig from "utils/UrlConfig";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  useEffect(() => {
    if (isLoggedIn) {
      // navigate to home page if user already logged in
      navigate("/");
    } else if (!userId) {
      // navigate to forgot password page
      navigate("/forgot-password");
    }
  }, []);

  const { userId } = location?.state ?? { userId: null };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrMsg(null);
      if (!password || !confirmPassword) {
        setLoading(false);
        setErrMsg("Please provide required fields");
        return;
      }
      if (password !== confirmPassword) {
        setLoading(false);
        setErrMsg("Password and confirm Password are not the same");
        return;
      }

      const newPasswordDetails = {
        password: password,
      };
      const response = await fetch(
        UrlConfig.RESET_PASSWORD_URL.replace(":userId", userId),
        {
          method: "PATCH",
          body: JSON.stringify(newPasswordDetails),
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
          navigate("/login");
        }, 2000);
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordBtnLabel = loading
    ? "Resetting password..."
    : "Reset Password";

  return (
    <div className="form-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="form-header">
            <p>Create new password</p>
            <label>We'll ask for this password whenever you sign in.</label>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">
              New Password<span required>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={password}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="form-actions-container">
              <input type="submit" value={resetPasswordBtnLabel} />
              <span>
                <label>Back to </label>
                <Link to="/login" className="link">
                  <span>Sign in</span>
                </Link>
              </span>
            </div>
          </form>
          <div className={errMsg ? "error-container" : ""}>{errMsg}</div>
          {successMsg && (
            <div className="success-container">
              Password reset successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
