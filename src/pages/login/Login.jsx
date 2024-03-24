import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { storeAuthAction } from "store/auth";
import UrlConfig from "utils/UrlConfig";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
      if (!email || !password) {
        setLoading(false);
        setErrMsg("Please provide required fields");
        return;
      }
      let userDetails = {
        email,
        password,
      };

      const response = await fetch(UrlConfig.LOGIN_URL, {
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
        const { token } = data;

        // user profile api call
        const response = await fetch(UrlConfig.USER_PROFILE, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const responseData = await response?.json();
        const { userId, email } = responseData?.data;

        // save user details in redux store
        dispatch(
          storeAuthAction({
            user: { userId, email },
            token: token,
            isLoggedIn: true,
          })
        );

        // if any redirect url present, redirect to that page
        const { redirectUrl } = location?.state ?? {};
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInLabel = loading ? "Signing in..." : "Sign in";

  return (
    <div className="form-screen">
      <div className="container">
        <div className="innerContainer">
          <div className="form-header">
            <p>Continue Shopping</p>
            <label className="centered-text">
              Enjoy a personalized shopping experience with every sign-in.
            </label>
          </div>
          <label htmlFor="email">
            Email<span required>*</span>
          </label>
          <form onSubmit={handleSubmit}>
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
            <div className="form-actions-container">
              <input type="submit" value={signInLabel} />
              <Link to="/forgot-password" className="link">
                <span>Forgot password?</span>
              </Link>
            </div>
          </form>
          <br />
          <span>
            <label>Don't have an account? </label>
            <Link to="/signup" className="link">
              <span>Sign up</span>
            </Link>
          </span>
          <div className={errMsg ? "error-container" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
