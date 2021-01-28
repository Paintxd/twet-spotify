import SpotifyWebApi from 'spotify-web-api-node';

export class SpotifyClient {
  private client: SpotifyWebApi;

  constructor() {
    this.client = new SpotifyWebApi({
      redirectUri: 'https://redirecturl.com/callback',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    });
  }

  getPlaylist = async () => {
    await this.client
      .getPlaylist('2T9OrTaA9xpHVzstmjozBP')
      .then((res) => {
        console.log(res.body.tracks.items);
      })
      .catch((err) => this.handleError(err.body));
  }

  refreshToken = async () => {
    await this.client
      .refreshAccessToken()
      .then((res) => {
        console.log('The access token has been refreshed!');

        this.client.setAccessToken(res.body['access_token']);
      })
      .catch((err) => {
        console.log('Could not refresh access token', err);
      });
  }

  private async handleError(body) {
    if (body.error.message.includes('token expired')) this.refreshToken();

    console.log('Request error', body);
  }
}
