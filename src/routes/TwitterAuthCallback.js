import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ApiCall from '../services/ApiCall';

const TwitterAuthCallback = () => {
  const location = useLocation();
  const { search } = location;
  const queryParams = queryString.parse(search);
  const { code, state } = queryParams;

  const [callbackData, setCallbackData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await ApiCall.getApiCallback({ code, state });
        setCallbackData(JSON.stringify(token));
      } catch (error) {
        console.error('Error fetching API callback:', error);
        setCallbackData('Erro ao buscar dados da API.');
      }
    }

    if (code && state) {
      fetchData();
    } else {
      setCallbackData('Parâmetros ausentes na URL.');
    }
  }, [code, state]);

  return(
    <div>
      <h3 className="Content">{callbackData}</h3>
    </div>
  );
}

export default TwitterAuthCallback;
