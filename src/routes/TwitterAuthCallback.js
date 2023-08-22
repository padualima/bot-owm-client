import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import ApiCall from '../services/ApiCall';

const TwitterAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const queryParams = queryString.parse(search);
  const { code, state } = queryParams;

  useEffect(() => {
    async function fetchData() {
      try {
        await ApiCall.getApiCallback({ code, state });

        // Aqui, armazenar o token em algum lugar, como em uma variavel global

        navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching API callback:', error);
      }
    }

    if (code && state) {
      fetchData();
    }
  }, [code, state, navigate]);

  return null;
}

export default TwitterAuthCallback;
