import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  SHOPIFY_GRAPHQL_URL,
  SHOPIFY_STOREFRONT_TOKEN,
} from "../config/shopify";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: SHOPIFY_GRAPHQL_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // Return cache first, then update from network
      fetchPolicy: "cache-and-network",
    },
    query: {
      // Use cache if available, otherwise fetch
      fetchPolicy: "cache-first",
    },
  },
});
