import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  // call api
  const request = async (url, options) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        ...options,
        headers: {
          Authorization: "Bearer " + token,
          ...options?.headers,
        },
      });
      const data = await res.json();
      setData(data);
      return { data: data, loading: false, loadError };
    } catch (error) {
      setLoadError(err);
      return { data, loading: false, loadError: err };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setLoadError(null);
  }, []);

  return { data, loading, loadError, request };
};

export default useApi;
