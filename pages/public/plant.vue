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
  <section :id="$style.container">
    <div id='header_wrapper'>
      <div :id='$style.header'>
        <Header responsiveHide='true' />
      </div>
    </div>
    <div :id='$style.body'>
      <div :class="$style.plant_header">
        <div v-if="plant">
          <h1>{{plant.name}}</h1>
          <span>Strain name: {{plant.settings.strain}} from {{plant.settings.seedbank}}</span>
          <span>Plant Type: {{plant.settings.plantType}}</span>
          <span>Medium: {{plant.settings.medium}}</span>
          <span>Lab dimensions: {{plant.boxSettings.width}}x{{plant.boxSettings.height}}x{{plant.boxSettings.depth}} {{plant.boxSettings.unit}}</span>

          <h2>Life event dates</h2>
          <span>Germination: {{plant.settings.germinationDate ? plant.settings.germinationDate : 'Not set'}}</span>
          <span>Vegging: {{plant.settings.veggingStart ? plant.settings.veggingStart : 'Not set'}}</span>
          <span>Blooming: {{plant.settings.bloomingStart ? plant.settings.bloomingStart :'Not set'}}</span>
          <span>Drying: {{plant.settings.dryingStart ? plant.settings.dryingStart : 'Not set'}}</span>
          <span>Curing: {{plant.settings.curingStart ? plant.settings.curingStart : 'Not set'}}</span>

          <h2>Toolbox</h2>
          <span>Seeds: {{plant.settings.strain}} from {{plant.settings.seedbank}}</span>
          <span>Furniture: {{plant.boxSettings.products[0].name}} by {{plant.boxSettings.products[0].specs.brand}}</span>

          <img src="https://via.placeholder.com/200x250"/>
        </div>
      </div>
      <feed-entry v-for="feedEntry in feedEntries" :feedEntry="feedEntry"></feed-entry>
      <!--
      <div>
        <div :class='$style.button'><a :href='url'>Open public plant in the app</a></div>
      </div>
      <div>
        Don't have the app installed yet?<br />
        <div :class='$style.button'><nuxt-link to='/app'><img src='~/assets/img/playstore.png' /><img src='~/assets/img/appstore.png' /><br />Install the app</nuxt-link></div>
      </div>
      -->
    </div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'
import FeedEntry from "~/components/plant-feed/feed-entry";
import {getPlantById, getFeedEntriesById} from "~/lib/plant";

export default {
  head() {
    return {
      title: 'SuperGreenLab - Automated LED Grow Lights for ninja growers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout this plant in the SuperGreenLab app - Grow diary and community for growers.',
        },
      ],
    }
  },
  components: {FeedEntry, Header,},
  data() {
    return {
      url: '',
      plant: null,
      feedEntries: [],
    }
  },
  mounted() {
    this.$data.url = this.plantURL;
    getPlantById('316ae47b-4a84-45eb-be31-dfa31dd04e66')
      .then(plant => {
        this.plant = plant;
        this.plant.settings = JSON.parse(this.plant.settings);
        this.plant.boxSettings = JSON.parse(this.plant.boxSettings);
        console.log(this.plant);
      })
      .catch(err => console.log(err.message));
    getFeedEntriesById('316ae47b-4a84-45eb-be31-dfa31dd04e66', 5, 0)
      .then(feedEntries => {
        this.feedEntries = this.feedEntries.concat(feedEntries.entries);
        console.log('entries:', this.feedEntries);
      })
      .catch(err => console.log(err.message));
  },
  computed: {
    plantURL() {
      if (this.$route.query.feid) {
        return `sglapp://supergreenlab.com/public/plant?id=${this.$route.query.id}&feid=${this.$route.query.feid}`
      } else {
        return `sglapp://supergreenlab.com/public/plant?id=${this.$route.query.id}`
      }
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  display: flex
  flex-direction: column
  flex: 1
  top: 0
  left: 0
  position: absolute
  width: 100vw
  height: 100vh
  align-items: center
  justify-content: flex-start
  text-align: center
  margin-top: 100px

.button:nth-of-type(1)
  margin-bottom: 30pt

.button
  background-color: #3bb30b
  padding: 10pt 15pt
  border-radius: 2pt

.button > a
  color: white
  text-decoration: none
  font-size: 1.1em

.plant_header
  background-color: blue
  color: white
  

</style>
