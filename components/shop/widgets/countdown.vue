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
    <div @click='open()' v-if="now < dateInMilliseconds" :id="$style.countdowncontainer">
      <img v-for='(p, i) in config.picture' :class='`${$style.countdownpic} ${$style[`media${i}-${config.picture.length}`]}`' :src='`/img/${p.fileRaw}`' />
      <div :id='$style.display'>
        <div :id="$style.countdown">
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
        <div :id="$style.enddate">Before {{ endDate | formatDate }}</div>
      </div>
    </div>
    <div v-else :id="$style.countdowncontainer">
      <img v-for='(p, i) in config.picture' :class="`${$style.countdownpic} ${$style[`media${i}-${config.picture.length}`]}`" :src='`/img/${p.fileRaw}`' />
      <div :id='$style.display'>
        <div :class="$style.digit">Times's up</div>
        <div :id="$style.enddate">Enjoy {{ endDate | formatDate }}</div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props : ['config', 'container',],
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
    async open() {
      const { config: { link, slug } } = this.$props
      const { container: { slug: containerSlug } } = this.$props
      if (!link) {
        return
      }
      if (link.indexOf('https://') == 0) {
        open(link, '_blank')
      } else {
        if (link.indexOf('?') !== -1) {
          const urlParams = new URLSearchParams(link.split('?')[1])
          await this.$store.dispatch('checkout/fetchPromocode', {promocode: urlParams.get('promo'), sellerid: process.env.sglSellerID})
          this.$router.push(link.split('?')[0])
        } else {
          this.$router.push(link)
        }
      }
      this.$analytics.trackEvent('countdown', 'click', `${containerSlug}_${slug}`)
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
  position: relative
  z-index: 10
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  margin-bottom: 10pt
  color: #5e5e5e
  text-align: center
  @media only screen and (max-width: 900px)
    margin-left: 5pt

#description
  position: relative
  z-index: 10
  margin: 5pt 5pt 10pt 5pt
  text-align: center
  color: #5e5e5e

#description strong
  color: #3BB30B
  font-weight: 600

#description ul
  padding: 0
  list-style-type: none

#description ul li
  margin-bottom:7pt

#description ul li::before
  content: '- '
  color: #3bb30b
  font-weight: bold

#countdowncontainer
  position: relative
  cursor: pointer
  width: 100%

#display
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

#countdown
  display: flex
  justify-content: center
  align-items: center

.countdownpic
  display: flex
  max-width: 100%

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
    font-size: 35pt

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
  position: relative
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

.media0-2
  @media only screen and (max-width: 1000px)
    display: none
  
.media1-2
  @media only screen and (min-width: 1000px)
    display: none

.media0-3
  @media only screen and (max-width: 1000px)
    display: none
  
.media1-3
  display: none
  @media only screen and (min-width: 600px) and (max-width: 1000px)
    display: block

.media2-3
  display: none
  @media only screen and (max-width: 600px)
    display: block

</style>
