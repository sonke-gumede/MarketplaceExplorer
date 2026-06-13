import { gql, TypedDocumentNode } from "@apollo/client";
import {
  GetProductsData,
  GetProductsVariables,
  GetProductData,
  GetProductVariables,
  GetRelatedProductsData,
  GetRelatedProductsVariables,
} from "./types";

export const GET_PRODUCT: TypedDocumentNode<
  GetProductData,
  GetProductVariables
> = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      handle
      productType
      vendor
      tags
      images(first: 10) {
        edges {
          node {
            url
          }
        }
      }
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
            }
            compareAtPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

export const GET_RELATED_PRODUCTS: TypedDocumentNode<
  GetRelatedProductsData,
  GetRelatedProductsVariables
> = gql`
  query GetRelatedProducts($first: Int, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS: TypedDocumentNode<
  GetProductsData,
  GetProductsVariables
> = gql`
  query GetProducts($first: Int, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
