// src/utils/client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  headers: {
    Authorization: `apikey clovercreek::stepzen.net+1000::5383a814cde0b39dbcc0df9b396745e0a4c776b0d67bbb45e4b7e8bc5e010326`,
  },
  uri: "https://clovercreek.stepzen.net/api/reddit/__graphql",
  cache: new InMemoryCache(),

});