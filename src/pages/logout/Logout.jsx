import { useEffect, useState } from "react";
import "./logout.scss";

const Logout = () => {
  const [successMessage, setSuccessMsg] = useState(null);
  const [errMessage, setErrMsg] = useState(null);

  useEffect(() => {
    const logout = async () => {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
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
