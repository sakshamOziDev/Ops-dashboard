import { useState, useEffect } from "react";
import api from "../apis/apis";

export const useFetchData = (endpoint, params, intervalMs = 300000) => { // default 5 min
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      setLoading(true);
      api.get(endpoint, { params })
        .then((res) => {
          if (isMounted) setData(res);
        })
        .catch((err) => {
          if (isMounted) setError(err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    };

    fetchData();    // initial fetch

    const interval = setInterval(fetchData, intervalMs); // auto-refresh

    return () => {
      isMounted = false;
      clearInterval(interval); // cleanup interval
    };
  }, [endpoint, JSON.stringify(params), intervalMs]);

  return { data, loading, error };
};
