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
    query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`,
    variables:
    {
      input:
      {
				email: email,
        lineItems: cart.map(c => ({
          variantId: btoa(c.id),
          quantity: c.n
        })),
      },
    },operationName:null}
  const { data } = await axios({
      method: 'post',
      url: 'https://shop.supergreenlab.com/api/2019-07/graphql.json',
      data: post,
      headers: {
        "X-Shopify-Storefront-Access-Token": shopify.token,
      },
    })
  return data.data.checkoutCreate.checkout
}

export const setShippingAddress = async (shopify, checkout, address) => {
  const post = {
    query: `mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
			checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
				userErrors {
					field
					message
				}
				checkout {
					id
					webUrl
					shippingAddress {
						firstName
						lastName
						address1
						address2
						province
						country
						zip
					}
				}
			}
		}`,
    variables:
    {
			shippingAddress: {
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
			},
			checkoutId: checkout.id,
    },operationName:null}
	const { data } = await axios({
      method: 'post',
      url: 'https://shop.supergreenlab.com/api/2019-07/graphql.json',
      data: post,
      headers: {
        "X-Shopify-Storefront-Access-Token": shopify.token,
      },
    }) 
  return data.data.checkoutShippingAddressUpdateV2
}

export const applyCoupon = async (shopify, checkout, promocode) => {
  const post = {
    query: `mutation checkoutDiscountCodeApplyV2($discountCode: String!, $checkoutId: ID!) {
			checkoutDiscountCodeApplyV2(discountCode: $discountCode, checkoutId: $checkoutId) {
				userErrors {
					field
					message
				}
				checkout {
					id
					webUrl
				}
			}
		}`,
    variables:
    {
			discountCode: promocode,
			checkoutId: checkout.id,
    },operationName:null}
	const { data } = await axios({
      method: 'post',
      url: 'https://shop.supergreenlab.com/api/2019-07/graphql.json',
      data: post,
      headers: {
        "X-Shopify-Storefront-Access-Token": shopify.token,
      },
    }) 
}

export const applyShipping = async (shopify, checkout) => {
  const post = {
    query: `mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
			checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
				checkout {
					id
				}
				checkoutUserErrors {
					code
					field
					message
				}
			}
		}`,
    variables:
    {
			shippingRateHandle: 'shopify-Free%20Shipping-0.00',
			checkoutId: checkout.id,
    },operationName:null}
	const { data } = await axios({
      method: 'post',
      url: 'https://shop.supergreenlab.com/api/2019-07/graphql.json',
      data: post,
      headers: {
        "X-Shopify-Storefront-Access-Token": shopify.token,
      },
    }) 
}
