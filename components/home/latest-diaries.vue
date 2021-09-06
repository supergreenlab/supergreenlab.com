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
    <div :id='$style.title'>
      <SectionTitle title='Checkout the'
                    green="Latest diaries in the app"
                    title2='(install the app before clicking)' />
    </div>
    <div :id='$style.plants'>
      <nuxt-link :to='`/public/plant?id=${plant.id}`' :class='$style.plant' v-for='plant in plants' :key='plant.id' :style='{"background-image": `url(https://storage.supergreenlab.com${plant.thumbnailPath})`}' @click='open(plant)'>
        {{ plant.name }}
      </nuxt-link>
    </div>



    <nuxt-link  :id='$style.cta' @click.native='ctaClicked' to='/app'>
      <b class="hvr-grow">Install app</b>
    </nuxt-link>
  </section>
</template>

<script>
import axios from 'axios'

import SectionTitle from '~/components/widgets/sectiontitle.vue'

export default {
  components: { SectionTitle, },
  data() {
    return {
      plants: [],
    }
  },
  async mounted() {
    const { data: { plants } } = await axios.get(`https://api2.supergreenlab.com/public/plants?limit=10&offset=0`)
    this.$data.plants = plants
  },
  methods: {
    ctaClicked() {
      this.$matomo && this.$matomo.trackEvent('front-page', 'cta-continuous', 'buy-now')
    },
    open(plant) {
      document.location.href = '';
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%
  margin: 0pt 0 50pt 0

#video
  display: block
  margin: 20pt 0 40pt 0
  height: 100%
  max-width: 800px
  max-height: 600px
  @media only screen and (max-width: 600pt)
    width: 100%
  @media only screen and (min-width: 600pt)
    box-shadow: -1px 1px 5px #888

#text
  color: #515151
  text-align: center

#text > b
  color: #3bb30b

#plants
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center
  margin: 0 50pt
  @media only screen and (max-width: 600px)
    margin: 0

.plant
  height: 150px
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  text-decoration: none
  color: white
  font-weight: bold
  position: relative
  flex-basis: 20%
  cursor: pointer
  background-position: center
  background-repeat: no-repeat
  background-size: fit
  @media only screen and (max-width: 600px)
    flex-basis: 50%

#cta
  display: flex
  flex-direction: column
  text-transform: uppercase
  color: white
  background-color: #3BB30B
  padding: 10pt 35pt
  border-radius: 3pt
  text-decoration: none
  text-align: center
  z-index: 100
  margin-top: 20pt
  margin-bottom: 20pt
  font-size: 1.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em

#cta > small
  padding-top: 5pt
  font-weight: 300
  font-size: 1.1em

#cta > b
  font-weight: 600

</style>
