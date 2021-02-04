import fs from 'fs';
import path from 'path';

const envValues = `
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=

SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_AUTHORIZATION_CODE=
`;

fs.writeFileSync(path.join(__dirname, '../.env.dev'), envValues);
