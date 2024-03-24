import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useApi = (props) => {
  const { url } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  useEffect(() => {
    setLoading(true);
    setLoadError(null);

    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, loadError };
};

export default useApi;
