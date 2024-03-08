import { useEffect, useState } from "react";
import UrlConfig from "../../utils/UrlConfig";
import "./logout.scss";

const Logout = () => {
  const [successMessage, setSuccessMsg] = useState(null);
  const [errMessage, setErrMsg] = useState(null);

  useEffect(() => {
    const logout = async () => {
      const response = await fetch(UrlConfig.LOGOUT_URL, {
        method: "GET",
      });
      if (response.status) {
        const data = await response.json();
        setSuccessMsg(data.message);
        setErrMsg(null);
      } else {
        setErrMsg("Error logging out");
        setSuccessMsg(null);
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
