// src/utils/client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  headers: {
    Authorization: `apikey ${process?.env.NEXT_APP_STEPZEN_API_KEY}`,
  },
  uri: process?.env.NEXT_APP_STEPZEN_ENDPOINT,
  cache: new InMemoryCache(),

});