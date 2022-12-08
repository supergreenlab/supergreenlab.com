<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id="$style.container">
    <div :id="$style.header">
      <div>
        <img :id="$style.headerimage" :src="headerIcon(feedEntry.type)">
        {{feedEntryHeading(feedEntry.type)}}
      </div>
      <img v-if='feedEntry.meta.temperature' v-on:click="toggleShowChart" :class="{[$style.headericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/icon_graphs.svg')" />
    </div>
    <div :id="$style.content">
      <Chart v-if='showChart' :plant='plant' :feedEntry='feedEntry' />
      <component :is="feedComponent(feedEntry.type)" :feedEntry="feedEntry" :feedMedias='feedMedias' :lib='lib' :setShownMedias='setShownMedias'></component>
    </div>
    <div :id="$style.footer">
      <div :id="$style.footericons">
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_like.png')" />
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_comment.png')" />
        <img v-if='shownMedias && shownMedias.length && hasSharing(feedEntry.type)' v-on:click="shareDialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_share.png')" />
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.flexend]: true, clickable: true}" :src="require('~/assets/img/plant/feed/button_bookmark.png')" />
      </div>
      <div :id="$style.flexstart">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script>

import Chart from '~/components/plant/feed/cards/Chart.vue'

const entries = {
  FE_LIGHT: {
    component: require('./FeedEntryLight').default,
    name: 'Stretch control',
    icon: require('~/assets/img/plant/feed/icon_light.svg'),
  },
  FE_WATER: {
    component: require('./FeedEntryWater').default,
    name: 'Watering',
    icon: require('~/assets/img/plant/feed/icon_watering.svg'),
  },
  FE_MEDIA: {
    component: require('./FeedEntryMedia').default,
    name: 'Grow log',
    icon: require('~/assets/img/plant/feed/icon_media.svg'),
    sharing: true,
  },
  FE_TIMELAPSE: {
    component: require('./FeedEntryMedia').default,
    name: 'Timelapse',
    icon: require('~/assets/img/plant/feed/icon_towelie.png'),
  },
  FE_MEASURE: {
    component: require('./FeedEntryMeasure').default,
    name: 'Measure',
    icon: require('~/assets/img/plant/feed/icon_measure.svg'),
    sharing: true,
  },
  FE_LIFE_EVENT: {
    component: require('./FeedEntryLifeEvent').default,
    name: 'Life event',
    icon: require('~/assets/img/plant/feed/icon_life_events.svg'),
  },
  FE_VENTILATION: {
    component: require('./FeedEntryVentilation').default,
    name: 'Ventilation change',
    icon: require('~/assets/img/plant/feed/icon_blower.svg'),
  },
  FE_SCHEDULE: {
    component: require('./FeedEntrySchedule').default,
    name: 'Schedule change',
    icon: require('~/assets/img/plant/feed/icon_schedule.svg'),
  },
  FE_NUTRIENT_MIX: {
    component: require('./FeedEntryNutrientMix').default,
    name: 'Nutrient mix',
    icon: require('~/assets/img/plant/feed/icon_nutrient_mix.svg'),
  },
  FE_BENDING: {
    component: require('./FeedEntryTraining').default,
    name: 'Bending',
    icon: require('~/assets/img/plant/feed/icon_bending.svg'),
    sharing: true,
  },
  FE_DEFOLIATION: {
    component: require('./FeedEntryTraining').default,
    name: 'Defoliation',
    icon: require('~/assets/img/plant/feed/icon_defoliation.svg'),
    sharing: true,
  },
  FE_TOPPING: {
    component: require('./FeedEntryTraining').default,
    name: 'Topping',
    icon: require('~/assets/img/plant/feed/icon_topping.svg'),
    sharing: true,
  },
  FE_FIMMING: {
    component: require('./FeedEntryTraining').default,
    name: 'Fimming',
    icon: require('~/assets/img/plant/feed/icon_fimming.svg'),
    sharing: true,
  },
  FE_TRANSPLANT: {
    component: require('./FeedEntryTraining').default,
    name: 'Transplant',
    icon: require('~/assets/img/plant/feed/icon_transplant.svg'),
    sharing: true,
  },
}

export default {
  name: "feed-entry",
  props: ['lib', 'plant', 'feedEntry', 'feedMedias'],
  components: { Chart, },
  data() {
    return {
      shownMedias: null,
      showChart: false,
    }
  },
  mounted() {
  },
  computed: {
    feedComponent: () => (type) => {
      return (entries[type] || {}).component || require('./UnknownCard').default
    },
    feedEntryHeading: () => (type) =>  {
      return (entries[type] || {}).name || 'Unknown card'
    },
    hasSharing: () => (type) => {
      return (entries[type] || {}).sharing || false
    },
    headerIcon: () => (type) =>  {
      return (entries[type] || {}).icon || '~/assets/img/plant/feed/icon_unknown.svg'
    },
    formattedDate() {
      let entry = this.$props.feedEntry
      const plant = this.$props.plant
      if (plant.settings.curingStart && new Date(entry.date) > new Date(plant.settings.curingStart)) {
        const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.curingStart)) / (1000 * 60 * 60 * 24))
        if (durationDays == 0) {
          return `First day of curing`
        } else if(durationDays < 7) {
          return `Curing: day ${durationDays}`
        } else {
          return `Curing: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
        }
      } else if (plant.settings.dryingStart && new Date(entry.date) > new Date(plant.settings.dryingStart)) {
        const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.dryingStart)) / (1000 * 60 * 60 * 24))
        if (durationDays == 0) {
          return `First day of drying`
        } else if(durationDays < 7) {
          return `Drying: day ${durationDays}`
        } else {
          return `Drying: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
        }
      } else if (plant.settings.bloomingStart && new Date(entry.date) > new Date(plant.settings.bloomingStart)) {
        const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.bloomingStart)) / (1000 * 60 * 60 * 24))
        if (durationDays == 0) {
          return `First day of blooming`
        } else if(durationDays < 7) {
          return `Blooming: day ${durationDays}`
        } else {
          return `Blooming: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
        }
      } else if (plant.settings.veggingStart && new Date(entry.date) > new Date(plant.settings.veggingStart)) {
        const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.veggingStart)) / (1000 * 60 * 60 * 24))
        if (durationDays == 0) {
          return `First day of vegging`
        } else if(durationDays < 7) {
          return `Vegging: day ${durationDays}`
        } else {
          return `Vegging: week ${Math.floor(durationDays / 7) + 1} day ${durationDays % 7 + 1}`
        }
      } else if (plant.settings.germinationDate && new Date(entry.date) > new Date(plant.settings.germinationDate)) {
        const durationDays = Math.floor((new Date(entry.date) - new Date(plant.settings.germinationDate)) / (1000 * 60 * 60 * 24))
        if (durationDays == 0) {
          return `Germination!`
        } else {
          return `Germinated ${durationDays} days ago`
        }
      }

      const nd = new Date(entry.date)
      return nd.toLocaleDateString();
    },
  },
  methods: {
    dialogTriggered() {
      this.$emit('dialogTriggered');
    },
    shareDialogTriggered() {
      this.$emit('shareDialogTriggered', this.$data.shownMedias.filter(m => m.filePath.indexOf('/feedmedias/videos-') === -1));
    },
    setShownMedias(shownMedias) {
      this.$data.shownMedias = shownMedias
    },
    toggleShowChart() {
      this.$data.showChart = !this.$data.showChart
    }
  },
}
</script>

<style module lang=stylus>

#container
  padding: 12px 0
  background: #FFFFFF
  border: 1px solid #D9D9D9
  box-sizing: border-box
  border-radius: 5px
  margin: 5px
  width: 100%
  max-width: 450px

#header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 10px

#header > div
  display: flex
  align-items: center

#headerimage
  margin-right: 10px

.headericon
  width: 25px
  height: 25px

#content
  padding: 15px 0

#footer
  display: flex
  flex-direction: column
  padding: 0 10px

#footericons
  display: flex

.footericon
  width: 25px
  height: 25px
  margin-right: 6px

.flexend
  margin-right: 0
  margin-left: auto

#flexstart
  margin-left: 5px
  margin-right: auto
  margin-top: 10px

.clickable
  cursor: pointer

</style>
