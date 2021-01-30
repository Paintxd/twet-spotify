import Twitter from 'twitter';

export class TwitterClient {
  private client: Twitter;

  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  postTwet = async (status: string) => {
    this.client.post('statuses/update', { status }, (err, tweet, response) => {
      if (err) console.log(err);
      console.log({ id: tweet.id, created_at: tweet.created_at, text: tweet.text });
    });
  };
}
