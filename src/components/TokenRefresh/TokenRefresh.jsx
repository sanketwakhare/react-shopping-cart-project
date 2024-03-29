import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useApi from "hooks/useApi";
import { storeAuthAction } from "store/auth";
import UrlConfig from "utils/UrlConfig";

const TokenRefresh = () => {
  const { request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { auth, user, isLoggedIn } = authState;
  const token = auth?.token;
  const expiry = auth?.expiry;
  const email = user?.email;

  const [tokenRefreshInterval, setTokenRefreshInterval] = useState(null);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  // Function to refresh the JWT token
  const refreshToken = async () => {
    try {
      const payload = JSON.stringify({
        email: email,
      });
      const response = await request(UrlConfig.REFRESH_TOKEN_URL, {
        method: "POST",
        body: payload,
      });
      const { data, loadError } = response;
      if (!loadError) {
        // If the token refresh was successful, update the stored token with the new one
        const newAuthDetails = data?.auth;
        dispatch(
          storeAuthAction({
            isLoggedIn: true,
            auth: {
              token: newAuthDetails?.token,
              expiry: newAuthDetails?.expiry,
            },
          })
        );
      } else {
        // If token refresh failed, logout the user
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      clearInterval(tokenRefreshInterval);
      navigate("/logout");
    } finally {
      setTokenRefreshed(() => !tokenRefreshed);
    }
  };

  // Function to periodically check token expiration and refresh it if necessary
  const startTokenRefreshInterval = () => {
    // Interval time in milliseconds (e.g., check every 5 minutes)
    const intervalTime = 5 * 60 * 1000; // 5 minutes

    // Function to check token expiration and refresh it
    const checkTokenExpiration = () => {
      if (!isLoggedIn) {
        clearInterval(tokenRefreshInterval);
        return;
      }
      if (token) {
        const expirationTime = expiry * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        // Set a threshold (e.g., 5 minutes) before the token expires to refresh it
        const threshold = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (timeUntilExpiration < threshold) {
          // Token is about to expire, refresh it
          refreshToken(tokenRefreshInterval);
        }
      }
    };

    // Start the interval to check token expiration periodically
    setTokenRefreshInterval(setInterval(checkTokenExpiration, intervalTime));
  };

  useEffect(() => {
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
    }
    // Call the function to start the token refresh interval
    startTokenRefreshInterval();

    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, [tokenRefreshed]);
  return null;
};

export default TokenRefresh;
