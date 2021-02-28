import { createClient } from 'contentful';

// contentful の APIクライアント
const client = createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || '',
  space: process.env.CONTENTFUL_SPACE_ID || '',
});

export default client;
