import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const token = auth?.auth?.token ?? null;

  // call api
  const request = async (url, options) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        ...options,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });
      const data = await res.json();
      let err = null;
      if (!res.ok) {
        err = new Error(data?.message);
        setLoadError(err);
      }
      setData(data);
      return { data: data, loading: false, loadError: err };
    } catch (error) {
      setLoadError(error);
      return { data, loading: false, loadError: error };
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
