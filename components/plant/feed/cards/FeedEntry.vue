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
      <img :id="$style.headerimage" :src="headerIcon(feedEntry.type)">
      {{feedEntryHeading(feedEntry.type)}}
    </div>
    <div :id="$style.content">
      <component :is="feedComponent(feedEntry.type)" :feedEntry="feedEntry" :lib='lib'></component>
    </div>
    <div :id="$style.footer">
      <div :id="$style.footericons">
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_like.png')" />
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_comment.png')" />
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.clickable]: true}" :src="require('~/assets/img/plant/feed/button_share.png')" />
        <img v-on:click="dialogTriggered" :class="{[$style.footericon]: true, [$style.flexend]: true, clickable: true}" :src="require('~/assets/img/plant/feed/button_bookmark.png')" />
      </div>
      <div :id="$style.flexstart">{{formattedDate(feedEntry.date)}}</div>
    </div>
  </div>
</template>

<script>

const entries = {
  FE_LIGHT: {
    component: require('~/components/plant/feed/cards/FeedEntryLight').default,
    name: 'Stretch control',
    icon: require('~/assets/img/plant/feed/icon_light.svg'),
  },
  FE_WATER: {
    component: require('/components/plant/feed/cards/FeedEntryWater').default,
    name: 'Watering',
    icon: require('~/assets/img/plant/feed/icon_watering.svg'),
  },
  FE_MEDIA: {
    component: require('/components/plant/feed/cards/FeedEntryMedia').default,
    name: 'Grow log',
    icon: require('~/assets/img/plant/feed/icon_media.svg'),
  },
  FE_TIMELAPSE: {
    component: require('/components/plant/feed/cards/FeedEntryMedia').default,
    name: 'Timelapse',
    icon: require('~/assets/img/plant/feed/icon_towelie.png'),
  },
  FE_MEASURE: {
    component: require('/components/plant/feed/cards/FeedEntryMeasure').default,
    name: 'Measure',
    icon: require('~/assets/img/plant/feed/icon_measure.svg'),
  },
  FE_LIFE_EVENT: {
    component: require('/components/plant/feed/cards/FeedEntryLifeEvent').default,
    name: 'Life event',
    icon: require('~/assets/img/plant/feed/icon_life_events.svg'),
  },
  FE_VENTILATION: {
    component: require('/components/plant/feed/cards/FeedEntryVentilation').default,
    name: 'Ventilation change',
    icon: require('~/assets/img/plant/feed/icon_blower.svg'),
  },
  FE_SCHEDULE: {
    component: require('/components/plant/feed/cards/FeedEntrySchedule').default,
    name: 'Schedule change',
    icon: require('~/assets/img/plant/feed/icon_schedule.svg'),
  },
  FE_NUTRIENT_MIX: {
    component: require('/components/plant/feed/cards/FeedEntryNutrientMix').default,
    name: 'Nutrient mix',
    icon: require('~/assets/img/plant/feed/icon_nutrient_mix.svg'),
  },
  FE_BENDING: {
    component: require('/components/plant/feed/cards/FeedEntryTraining').default,
    name: 'Bending',
    icon: require('~/assets/img/plant/feed/icon_bending.svg'),
  },
  FE_DEFOLIATION: {
    component: require('/components/plant/feed/cards/FeedEntryTraining').default,
    name: 'Defoliation',
    icon: require('~/assets/img/plant/feed/icon_defoliation.svg'),
  },
  FE_TOPPING: {
    component: require('/components/plant/feed/cards/FeedEntryTraining').default,
    name: 'Topping',
    icon: require('~/assets/img/plant/feed/icon_topping.svg'),
  },
  FE_FIMMING: {
    component: require('/components/plant/feed/cards/FeedEntryTraining').default,
    name: 'Fimming',
    icon: require('~/assets/img/plant/feed/icon_fimming.svg'),
  },
  FE_TRANSPLANT: {
    component: require('/components/plant/feed/cards/FeedEntryTraining').default,
    name: 'Transplant',
    icon: require('~/assets/img/plant/feed/icon_transplant.svg'),
  },
}

export default {
  name: "feed-entry",
  props: ['lib', 'feedEntry'],
  mounted() {
  },
  computed: {
    feedComponent: () => (type) => {
      return (entries[type] || {}).component || require('/components/plant/feed/cards/UnknownCard').default
    },
    feedEntryHeading: () => (type) =>  {
      return (entries[type] || {}).name || 'Unknown card'
    },
    headerIcon: () => (type) =>  {
      return (entries[type] || {}).icon || '~/assets/img/plant/feed/icon_unknown.svg'
    },
    formattedDate: () => (date) =>  {
      date = new Date(date);
      return date.toLocaleDateString();
    },
  },
  methods: {
    dialogTriggered() {
      this.$emit('dialogTriggered');
    },
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
  align-items: center
  padding: 0 10px

#headerimage
  margin-right: 10px

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
