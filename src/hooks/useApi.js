import { useEffect, useState } from 'react';

const useApi = (props) => {
  const { url } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setLoadError(null);

    fetch(url)
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
