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
      const accessToken = await ApiCall.getApiCallback({ code, state });

      if (accessToken) {
        localStorage.setItem('accessTokenStorage', accessToken);
      } else {
        // TODO: MAPEAR RESPOSTA NA API PARA EXCESSO DE SOLICITACOES 429
        // throw new Error(`Error fetching API callback: ${accessToken}`);
        localStorage.setItem('accessTokenError', `Too many requests, please try again later!`);
      }

      window.close();
    }

    if (code && state) {
      fetchData();
    }
  }, [code, state]);

  return null;
}

export default TwitterAuthCallback;
