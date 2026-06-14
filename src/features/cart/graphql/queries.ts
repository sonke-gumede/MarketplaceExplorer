import { gql, TypedDocumentNode } from "@apollo/client";
import { GetCartData, GetCartVariables } from "./types";

export const CART_FIELDS = gql`
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              image {
                url
              }
              product {
                id
                title
                featuredImage {
                  url
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
  }
`;

export const GET_CART: TypedDocumentNode<GetCartData, GetCartVariables> = gql`
  ${CART_FIELDS}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;
