<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <div :id='$style.container'>
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>
      <h1>Returns</h1>
      Our return policy lasts 30 days. If 30 days have gone by since your order has been shipped, unfortunately we can’t offer you a refund or exchange. 
      To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging and include all accessories.
      Shipping and handling charges are not refundable. We are not responsible for any shipping charges of merchandise being returned to us.
      Before returning any packages contact us at towelie@supergreenlab.com.

      <h1>Refunds</h1>
      Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. 
      If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5 business days. 

      <h1>Late or missing refunds</h1>
      If you haven’t received a refund yet, first check your bank account and then contact your credit card company or bank, it may take some time before your refund is officially posted. If you still have not received your refund yet, please contact us at towelie@supergreenlab.com

      <h1>Exchanges</h1>
      We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at towelie@supergreenlab.com

    </div>
  </div>
</template>

<script>
import Header from '~/components/header.vue'

export default {
  components: {Header,},
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  color: #5d5d5d

#body
  padding: 50pt 30pt 70pt 30pt

</style>
