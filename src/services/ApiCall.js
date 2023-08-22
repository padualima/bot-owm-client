import axios from 'axios';

const owmBotApiUrl = 'http://localhost:3000'
const twitterRedirectUri = 'http://localhost:3001/callback'

const ApiCall = {
  getTwitterAuthorizeUrl: async () => {
    try {
      const url = `${owmBotApiUrl}/authorize?redirect_uri=${twitterRedirectUri}`
      const response = await axios.get(url);

      return response.data.data.message;
    } catch (error) {
      console.error('Error fetching Twitter Authorize URL:', error);
      return null;
    }
  },

  getApiCallback: async ({ code, state }) => {
    try {
      const url = `${owmBotApiUrl}/auths/twitter2/callback`
      const params = `code=${code}&state=${state}&redirect_uri=${twitterRedirectUri}`
      const response = await axios.get(`${url}?${params}`);

      return response.data.users.token;
    } catch (error) {
      console.error('Error fetching Twitter Access Token:', error);
      return null;
    }
  }
}


export default ApiCall;
