import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearPersistedState } from "store";
import { clearAuthAction } from "store/auth";
import { clearCartRedux } from "store/cart";
import UrlConfig from "utils/UrlConfig";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMsg] = useState(null);
  const [errMessage, setErrMsg] = useState(null);

  const auth = useSelector((state) => state.auth);
  const token = auth?.auth?.token ?? null;

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(UrlConfig.LOGOUT_URL, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSuccessMsg(data.message);
          setErrMsg(null);
        }
      } finally {
        // clear cart
        dispatch(clearCartRedux());
        // clear user info
        dispatch(clearAuthAction());
        // clear persisted states
        clearPersistedState();
        navigate("/", { replace: true, state: null });
        window.location.replace("/");
      }
    };
    logout();
  }, []);

  return (
    <div>
      {successMessage && (
        <div className="success-container">{successMessage}</div>
      )}
      {errMessage && <div className="error-container">{errMessage}</div>}
    </div>
  );
};

export default Logout;
