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
  <section :id='$style.container'>
    <h2>Contact information</h2>
    <div :class='$style.twoinrow'>
      <div :class='$style.input'>
        <TextInput label='First name' name='firstname' v-model='firstname' />
      </div>
      <div :class='$style.input'>
        <TextInput label='Last name' name='lastname' v-model='lastname' />
      </div>
    </div>
    <div :class='$style.twoinrow'>
      <div :class='$style.input'>
        <TextInput label='Phone' name='phone' v-model='phone' />
      </div>
      <div :class='$style.input'>
        <TextInput label='Email' name='email' v-model='email' />
      </div>
    </div>
    <h2>Shipping address</h2>
    <div :class='$style.oninrow'>
      <div :class='$style.input'>
        <TextInput label='Company' name='company' v-model='company' optional='true' />
      </div>
    </div>
    <div :class='$style.twoinrow'>
      <div :class='$style.input'>
        <SelectInput label='Country' :options='countries' name='country' v-model='country' />
      </div>
      <div :class='$style.input'>
        <TextInput label='City' name='city' v-model='city' />
      </div>
    </div>
    <div :class='$style.oninrow'>
      <div :class='$style.input'>
        <TextInput label='Address line 1' name='address1' v-model='address1' />
      </div>
    </div>
    <div :class='$style.oninrow'>
      <div :class='$style.input'>
        <TextInput label='Address line 2' name='address2' v-model='address2' optional='true' />
      </div>
    </div>
    <div :class='$style.twoinrow'>
      <div :class='$style.input'>
        <TextInput label='State/Province' name='province' v-model='province' />
        <!--<SelectInput label='State/Province' :options='states(country)' name='province' v-model='province' />-->
      </div>
      <div :class='$style.input'>
        <TextInput label='Zip' name='zip' v-model='zip' />
      </div>
    </div>
  </section>
</template>

<script>
import SelectInput from '~/components/shipping/select.vue'
import TextInput from '~/components/shipping/text.vue'

import countries from '~/config/countries.json'

const binding = (name) => ({
  get() {
    return this.$store.state.shipping[name].value
  },
  set(value) {
    this.$store.commit('shipping/updateShipping', {key: name, value: value || ''})
  },
})

export default {
  components: {TextInput, SelectInput, },
  computed: {
    firstname: binding('firstname'),
    lastname: binding('lastname'),
    phone: binding('phone'),
    email: binding('email'),
    country: binding('country'),
    city: binding('city'),
    company: binding('company'),
    address1: binding('address1'),
    address2: binding('address2'),
    province: binding('province'),
    zip: binding('zip'),

    countries: () => countries.map(c => c.name),
    states: () => (country) => country ? countries.find(c => c.name == country).stateProvinces.map(s => s.name) : '',
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  @media only screen and (max-width: 600px)
    padding: 0

#container > h2
  margin: 0 0 0 8pt
  color: #454545
  padding: 20pt 0

#nb
  margin: 20pt 0 0 5pt

#nb > b
  color: #3bb30b
  font-weight: 600;

.twoinrow
  width: 100%
  display: flex
  @media only screen and (max-width: 600px)
    flex-direction: column

.input
  padding: 10pt
  flex-basis: 50%

</style>
