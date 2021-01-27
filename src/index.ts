import SpotifyWebApi from 'spotify-web-api-node';
import Twitter from 'twitter';

require('dotenv').config()

const argv = require('minimist')(process.argv.slice(2));

const ttClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const spotifyClient = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

spotifyClient.getUserPlaylists().then(res => {
  console.log(res.body)
})

// ttClient.post('statuses/update', { status: argv.status }, (err, tweet, response) => {
//   if (err) throw err;
//   console.log(tweet);
// });