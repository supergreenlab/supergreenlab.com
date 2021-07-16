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
    <!-- TODO: this header could maybe be moved to a separate component, to keep this file a little bit more clean -->
    <div :id='$style.body' v-if="plant">
      <div :class="$style.plant_header">
        <div :class="$style.plant_header_content">
          <h1>{{plant.name}}</h1>
          <div :class="$style.plant_header_data">
            <div>
              <label>Strain name</label>
              {{plant.settings.strain}}
              <span>from
                <span :class="$style.green">{{plant.settings.seedBank}}</span>
              </span>
            </div>
            <div>
              <label>Plant Type</label>
              {{plant.settings.plantType}}
            </div>
            <div>
              <label>Medium</label>
              {{plant.settings.medium}}
            </div>
            <div>
              <label>Lab dimensions</label>
              {{plant.boxSettings.width}}x{{plant.boxSettings.height}}x{{plant.boxSettings.depth}} {{plant.boxSettings.unit}}
            </div>
            <h3>Life event dates</h3>
            <div>
              <label>Germination</label>
              {{plant.settings.germinationDate ? getFormattedDate(plant.settings.germinationDate) : 'Not set'}}
            </div>
            <div>
              <label>Vegging</label>
              {{plant.settings.veggingStart ? getFormattedDate(plant.settings.veggingStart) : 'Not set'}}
            </div>
            <div>
              <label>Blooming</label>
              {{plant.settings.bloomingStart ? getFormattedDate(plant.settings.bloomingStart) :'Not set'}}
            </div>
            <div>
              <label>
                Drying
              </label>
              {{plant.settings.dryingStart ? getFormattedDate(plant.settings.dryingStart) : 'Not set'}}
            </div>
            <div>
              <label>
                Curing
              </label>
              {{plant.settings.curingStart ? getFormattedDate(plant.settings.curingStart) : 'Not set'}}
            </div>
            <h3>Toolbox</h3>
            <div>
              <label>Seeds</label>
              {{plant.settings.strain}} from {{plant.settings.seedbank}}
            </div>
            <div>
              <label>Furniture</label>
              {{plant.boxSettings.products[0].name}} by {{plant.boxSettings.products[0].specs.brand}}
            </div>
          </div>
          <img :src="`https://storage.supergreenlab.com${plant.thumbnailPath}`" />
        </div>

      </div>
      <feed-entry v-for="feedEntry in feedEntries" v-bind:key="feedEntry.id" :feedEntry="feedEntry"></feed-entry>
      <div :class="$style.spinner_container">
        <infinite-loading
                spinner="spiral"
                @infinite="loadNextFeedEntriesById">
          <div slot="no-more">
            <div :class="$style.app_cta">
              <div>
                <div :class='$style.button'><a :href='url'>Open public plant in the app</a></div>
              </div>
              <div>
                Don't have the app installed yet?<br />
                <div :class='$style.button'><nuxt-link to='/app'><img src='~/assets/img/playstore.png' /><img src='~/assets/img/appstore.png' /><br />Install the app</nuxt-link></div>
              </div>
            </div>
          </div>
        </infinite-loading>
      </div>
    </div>

    <!-- This div is hidden, unless the page is interacted with -->
    <div v-show="showDialog" :class="$style.ctaDialog">
      <p>Content goes here.</p>
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
  components: {
    FeedEntry,
    Header
  },
  data() {
    return {
      url: '',
      plant: null,
      feedEntries: [],
      page: 0,
      pageSize: 5,
      showDialog: true
    }
  },
  mounted() {
    this.$data.url = this.plantURL;
    getPlantById(this.$route.query.id)
      .then(plant => {
        this.plant = plant;
        this.plant.settings = JSON.parse(this.plant.settings);
        this.plant.boxSettings = JSON.parse(this.plant.boxSettings);
      })
      .catch(err => {
        console.log(err.message);
        // if no plant is available for the input id -> navigate to 404 page
        this.$router.push('/404')
      });
    getFeedEntriesById(this.$route.query.id, this.pageSize, this.page)
      .then(feedEntries => {
        this.feedEntries = this.feedEntries.concat(feedEntries.entries);
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
  methods: {
    loadNextFeedEntriesById($state) {
      this.page++;
      getFeedEntriesById(this.$route.query.id, this.pageSize, this.page * this.pageSize)
        .then(feedEntries => {
          $state.loaded();
          if (feedEntries.entries && feedEntries.entries.length > 1) {
            this.feedEntries = this.feedEntries.concat(feedEntries.entries);
          } else {
            $state.complete();
          }
        })
        .catch(err => console.log(err.message));
    },
    getFormattedDate(date) {
      date = new Date(date);
      return date.toLocaleDateString();
    }
  }
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
  height: auto
  align-items: center
  justify-content: flex-start
  text-align: center
  margin-top: 56px
  background-color: #E5E5E5

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
  background-color: #3F51B5
  color: white
  width: 100%
  margin-bottom: 10px

.plant_header h1
  width: 100%

.plant_header_content
  max-width: 970px
  display: inline-flex
  flex-flow: wrap
  padding-bottom: 15px

.plant_header_data
  width: 50%
  font-weight: 400

.plant_header_data div
  margin-left: 0
  margin-right: auto
  display: flex
  flex-direction: column
  text-align: left

.plant_header_data label
  text-decoration: none
  text-transform: none
  font-weight: unset
  margin-top: 5px
  margin-bottom: 0
  text-align: left
  margin-left: 0
  font-size: 12px
  padding-bottom: 0

.plant_header_data h3
  text-align: left
  margin-top: 15px
  margin-bottom: -5px

.plant_header img
  max-height: 480px
  padding: 10px
  align-self: center
  margin: 0 auto
  margin-right: 0

.spinner_container div
  width: 250px

.app_cta
  margin-top: 25px

.ctaDialog
  background-color: pink
  position: fixed


</style>
