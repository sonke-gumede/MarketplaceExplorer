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
});
