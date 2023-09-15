import React from 'react';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import ApiCall from '../../services/ApiCall';

function LoginTwitterButton() {
  const handleTwitterLogin = async () => {
    try {
      const oauthUrl = await ApiCall.getTwitterAuthorizeUrl();

      // Abre uma nova aba com a URL de autorização do Twitter
      window.open(oauthUrl, '_blank', 'width=600, height=600');

      localStorage.removeItem('accessTokenStorage');

      const checkAuthenticationCompletion = setInterval(() => {
        const accessTokenStorage = localStorage.getItem('accessTokenStorage');

        if (accessTokenStorage) {
          clearInterval(checkAuthenticationCompletion);

          window.location.href = `/dashboard`;
        }
      }, 1000);
    } catch (error) {
      console.error('Error handling Twitter login:', error);
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      startIcon={<TwitterIcon />}
      sx={{ mt: 2 }}
      onClick={handleTwitterLogin}
    >
      Login with Twitter
    </Button>
  );
}

export default LoginTwitterButton;
