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
    <div :id="$style.title" v-html='$md.render(config.title)'></div>
    <div :id="$style.description" v-html='$md.render(config.description)'></div>
    <div @click='open(config.link)' v-if="now < dateInMilliseconds" :class="$style.countdownpic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'>
      <div :id="$style.countdown">
        <div :class="$style.countdown">
          <div :class="$style.block">
            <div :class="$style.digit">{{ days | zero }}</div>
            <div :class="$style.unit">Days</div>
          </div>
          <div :class="$style.block">
            <div :class="$style.digit">{{ hours | zero }}</div>
            <div :class="$style.unit">Hours</div>
          </div>
          <div :class="$style.block">
            <div :class="$style.digit">{{ minutes | zero }}</div>
            <div :class="$style.unit">Minutes</div>
          </div>
          <div :class="$style.block">
            <div :class="$style.digit">{{ seconds | zero }}</div>
            <div :class="$style.unit">Seconds</div>
          </div>
        </div>
      </div>
      <div :id="$style.enddate">Before {{ endDate | formatDate }}</div>
    </div>
    <div v-else :class="$style.countdownpic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[1].fileFull}`)})`}'>
      <div :class="$style.digit">Times's up</div>
      <div :id="$style.enddate">Enjoy {{ endDate | formatDate }}</div>
    </div>
     <!-- <div v-if="now < dateInMilliseconds" :class="$style.countdownpic" :style='{"background-image": `url(${require(`~/assets/img/${config.picture[0].fileFull}`)})`}'></div> -->
  </section>
</template>

<script>

export default {
  props : ['config'],
  mounted() {
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
    },1000)
  },
  data(){
    return{
      now :  Math.trunc((new Date()).getTime() / 1000),
    }
  },
  computed : {
    endDate() {
      const { config } = this.$props
      const endDate = config.date
      return endDate
    },
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.endDate) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    },
    link() {
      const { config } = this.$props
      const link = config.link
      // console.log(config)
      return link
    }
  },
  methods: {
    open(link) {
      if (!link) {
        return
      }
      open(link, '_blank')
    }
  },
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat("us-EN").format(new Date(dateStr)),
    tostring: (authorStr) =>
      authorStr = String(authorStr),
    zero: (value) => {
      if (value <0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return '0'+ value
      }
      else {
        return value
      }
    }
  }
}


</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  flex-direction: column

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  margin-bottom: 10pt
  color: #5e5e5e
  @media only screen and (max-width: 900px)
    margin-left: 5pt

#description
  margin: 5pt
  text-align: center
  color: #5e5e5e

#countdown
  display: flex
  justify-content: center
  align-items: center

.countdown
  display: flex

.countdownpic
  cursor: pointer

.block
  width: 100pt
  margin: 10pt
  @media only screen and (min-width: 600px) and (max-width: 900px)
    width: 80pt
  @media only screen and (max-width: 600px)
    margin: 3pt
    width: 60pt

.digit
  text-align: center
  margin: 10px
  font-size: 70pt
  font-weight: bold
  font-family: 'PlumeAd'
  text-transform: uppercase
  white-space: nowrap
  -webkit-text-fill-color: white
  -webkit-text-stroke-width: 3px
  -webkit-text-stroke-color: black
  @media only screen and (min-width: 600px) and (max-width: 900px)
    -webkit-text-stroke-width: 1px
    font-size: 50pt
  @media only screen and (max-width: 600px)
    -webkit-text-stroke-width: 1px
    font-size: 23pt

.unit
  font-family: 'PlumeAd'
  -webkit-text-fill-color: #3BB30B
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: black
  text-align: center
  font-weight: bold
  font-size: 20pt
  @media only screen and (max-width: 600px)
    font-size: 14pt

#enddate
  text-align: center
  margin-bottom: 5pt
  font-size: 20pt
  font-weight: bold
  font-family: 'PlumeAd'
  text-transform: uppercase
  white-space: nowrap
  -webkit-text-fill-color: white
  -webkit-text-stroke-width: 1px
  -webkit-text-stroke-color: black

.countdownpic
  width: 100%
  max-height: 200pt
  background-position: center
  background-size: cover
  background-repeat: no-repeat

</style>
