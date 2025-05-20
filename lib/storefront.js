/*
 * Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios'

export const createCheckout = async (shopify, email, cart) => {
  const post = {
    query: `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          code
          field
          message
        }
      }
    }`,
    variables: {
      input: {
        buyerIdentity: {
          email: email
        },
        lines: cart.map(c => ({
          merchandiseId: btoa(c.id),
          quantity: c.n
        })),
      },
    },
    operationName: null
  }
  const { data } = await axios({
    method: 'post',
    url: `https://${shopify.domain}/api/2025-04/graphql.json`,
    data: post,
    headers: {
      "X-Shopify-Storefront-Access-Token": shopify.token,
    },
  })
  
  // Transform cart response to match the original checkout structure
  const cartResponse = data.data.cartCreate;
  return {
    checkout: {
      id: cartResponse.cart.id,
      webUrl: cartResponse.cart.checkoutUrl
    },
    checkoutUserErrors: cartResponse.userErrors
  };
}

export const setShippingAddress = async (shopify, checkout, address) => {
  const post = {
    query: `mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
      cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
        cart {
          id
          checkoutUrl
          buyerIdentity {
            deliveryAddressPreferences {
              ... on MailingAddress {
                address1
                address2
                city
                province
                country
                zip
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    variables: {
      buyerIdentity: {
        email: address.email?.value,
        deliveryAddressPreferences: [{
          deliveryAddress: {
            address1: address.address1.value,
            address2: address.address2.value,
            city: address.city.value,
            company: address.company.value,
            country: address.country.value,
            firstName: address.firstname.value,
            lastName: address.lastname.value,
            phone: address.phone.value,
            province: address.province.value,
            zip: address.zip.value,
          }
        }]
      },
      cartId: checkout.id,
    },
    operationName: null
  }
  const { data } = await axios({
    method: 'post',
    url: `https://${shopify.domain}/api/2025-04/graphql.json`,
    data: post,
    headers: {
      "X-Shopify-Storefront-Access-Token": shopify.token,
    },
  })
  // Transform cart response to match the original checkout structure
  const cartResponse = data.data.cartBuyerIdentityUpdate;
  return {
    userErrors: cartResponse.userErrors,
    checkout: {
      id: cartResponse.cart.id,
      webUrl: cartResponse.cart.checkoutUrl,
      shippingAddress: cartResponse.cart.buyerIdentity?.deliveryAddressPreferences?.[0]
    }
  };
}

export const applyCoupon = async (shopify, checkout, promocode) => {
  const post = {
    query: `mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart {
          id
          checkoutUrl
          discountCodes {
            code
            applicable
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    variables: {
      discountCodes: [promocode],
      cartId: checkout.id,
    },
    operationName: null
  }
  const { data } = await axios({
    method: 'post',
    url: `https://${shopify.domain}/api/2025-04/graphql.json`,
    data: post,
    headers: {
      "X-Shopify-Storefront-Access-Token": shopify.token,
    },
  })
  
  // Transform cart response to match the original checkout structure
  const cartResponse = data.data.cartDiscountCodesUpdate;
  return {
    userErrors: cartResponse.userErrors,
    checkout: {
      id: cartResponse.cart.id,
      webUrl: cartResponse.cart.checkoutUrl
    }
  };
}

export const applyShipping = async (shopify, checkout) => {
  console.log("Note: Shipping selection is now handled by Shopify's checkout flow");
  
  // Simply return the checkout without modifying it
  return {
    checkout: {
      id: checkout.id
    },
    checkoutUserErrors: []
  };
}
