import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UrlConfig from "../../utils/UrlConfig";

const Logout = (props) => {
  const navigate = useNavigate();
  const { handleSetLogin } = props;
  const [successMessage, setSuccessMsg] = useState(null);
  const [errMessage, setErrMsg] = useState(null);

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(UrlConfig.LOGOUT_URL, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSuccessMsg(data.message);
          setErrMsg(null);
        }
      } finally {
        // clear token from localStorage
        localStorage.removeItem("token");
        handleSetLogin(false);
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
