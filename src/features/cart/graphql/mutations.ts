import { gql, TypedDocumentNode } from "@apollo/client";
import {
  CartCreateData,
  CartCreateVariables,
  CartLinesAddData,
  CartLinesAddVariables,
  CartLinesUpdateData,
  CartLinesUpdateVariables,
  CartLinesRemoveData,
  CartLinesRemoveVariables,
} from "./types";
import { CART_FIELDS } from "./queries";

export const CART_CREATE: TypedDocumentNode<CartCreateData, CartCreateVariables> = gql`
  ${CART_FIELDS}
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD: TypedDocumentNode<CartLinesAddData, CartLinesAddVariables> = gql`
  ${CART_FIELDS}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE: TypedDocumentNode<CartLinesUpdateData, CartLinesUpdateVariables> = gql`
  ${CART_FIELDS}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE: TypedDocumentNode<CartLinesRemoveData, CartLinesRemoveVariables> = gql`
  ${CART_FIELDS}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
