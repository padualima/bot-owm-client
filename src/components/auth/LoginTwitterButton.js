import React from 'react';
import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import ApiCall from '../../services/ApiCall';

const LoginTwitterButton = () => {
  const handleTwitterLogin = async () => {
    try {
      const authorizeUrl = await ApiCall.getTwitterAuthorizeUrl();

      window.location.href = authorizeUrl;
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
