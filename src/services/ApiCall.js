import axios from 'axios';

// TODO: add dotenv for this
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
  },

  getTweets: async ({ api_key }) => {
    try {
      const url = `${owmBotApiUrl}/tweets`
      const headers = {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(url, { headers: headers });

      return response.data.data;
    } catch (error) {
      console.error('Error list Tweets:', error);
      return null;
    }
  },

  postCreateTweet: async ({ api_key, formData }) => {
    try {
      const url = `${owmBotApiUrl}/tweets`
      const headers = {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json',
      };
      const body = {
        location: {
          name: formData.location_name
        }
      }

      const response = await axios.post(url, JSON.stringify(body), { headers: headers });

      return response.data.tweets.text;
    } catch (error) {
      console.error('Error creating new Tweet:', error);
      return null;
    }
  }
}


export default ApiCall;
