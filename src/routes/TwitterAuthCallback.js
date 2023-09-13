import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ApiCall from '../services/ApiCall';

const TwitterAuthCallback = () => {
  const location = useLocation();
  const { search } = location;
  const queryParams = queryString.parse(search);
  const { code, state } = queryParams;

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = await ApiCall.getApiCallback({ code, state });

        localStorage.setItem('accessTokenStorage', accessToken);

        window.close();
      } catch (error) {
        console.error('Error fetching API callback:', error);
      }
    }

    if (code && state) {
      fetchData();
    }
  }, [code, state]);

  return null;
}

export default TwitterAuthCallback;
