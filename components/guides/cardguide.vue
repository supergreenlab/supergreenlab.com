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
    <nuxt-link :class="$style.cardLink" :to='`/guide/${guide.slug}`'>
      <div :id="$style.headerImg">
        <div :id="$style.headerLabel">
          <div :class="$style.headerLabel" :id="$style.headerDate">
            Date: {{ guide.createdat | formatDate }}
          </div>
          <div v-if='duration(guide)' :class="$style.headerLabel" :id="$style.headerDuration">
            Duration: {{ duration(guide) }}min
          </div>
          <div v-if='guide.difficulty' :class="$style.headerLabel" :id="$style.headerDifficulty">
            Difficulty: {{ guide.difficulty }}/5
          </div>
        </div>
      </div>
      <div :id="$style.guideimgcontainer" :style='{"background-position" : `center center`,"background-repeat" : `no-repeat`, "background-size" : `cover`,"background-image":  `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 100%), url(${require(`~/assets/img/${ guide.thumbnail.fileLarge }`) })`}'>
        <div :id="$style.guidelogo" >
          <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
        </div>
      </div>
      <div :id="$style.footerImg">
        <div v-if='guide.author'>Author: {{ guide.author }}</div>
        <div v-if='guide.credit'>Credit:  {{ guide.credit }}</div>
      </div>
       <div :id="$style.title">
          <h2> {{ guide.title }} - <span :class="$style.green">{{ guide.subtitle }}</span></h2>
      </div>
      <div v-html="$md.render(guide.text)" :id="$style.introduction"></div>
      <div :id="$style.readmorecontainer">
        <div :id="$style.stepdone" v-if="nSteps(guide)" :class='nChecked(guide) == nSteps(guide) ? $style.green : ""'>
          <span :id='$style.progress'><span :class="$style.green">{{ nChecked(guide) }}</span>/{{ nSteps(guide) }}</span><div :id="$style.stepdonestring">STEPS DONE</div>
        </div>
        <button :id="$style.readmorebtn">Read More</button>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import { guides } from '~/config/guides.json'

export default {
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat("us-EN").format(new Date(dateStr)),
    tostring: (authorStr) =>
      authorStr = String(authorStr),
  },
  props: ['guide', 'userStep'],
  computed: {
    nSteps() {
      return (guide) => {
        return this.sections(guide).filter(gs => gs.showdone).length
      }
    },
    nChecked() {
      return (guide) => {
        return this.sections(guide).filter(gs => gs.showdone && this.$store.state.guides[gs.slug].checked).length
      }
    },
    first() {
      return (guide) => {
        if (guide.first == null || guide.first.length == 0) return null
        let first = guides.find(g => g.id == guide.first[0])
        if (!first) return null
        first = require(`~/config/guide-${first.slug}.json`)
        return first
      }
    },
    sections() {
      return (guide) => {
        //guide = require(`~/config/guide-${guide.slug}.json`)
        let current = this.first(guide) == null ? guide : guides.find(g => g.slug == this.first(guide).nextslug[0])
        const sections = []
        const fn = (current) => {
          sections.push(...current.sections)
          if (!current.nextslug) return
          current = require(`~/config/guide-${current.nextslug}.json`)
          if (current) return fn(current)
        }
        fn(current)
        return sections
      }
    },
    duration() {
      return (guide) => {
        //guide = require(`~/config/guide-${guide.slug}.json`)
        let current = this.first(guide) == null ? guide : guides.find(g => g.slug == this.first(guide).nextslug[0])
        let duration = 0
        const fn = (current) => {
          duration += current.duration || 0
          if (!current.nextslug) return
          current = require(`~/config/guide-${current.nextslug}.json`)
          if (current) return fn(current)
        }
        fn(current)
        return duration
      }
    },
  }
}

</script>

<style module lang=stylus>
#container
 color: #5D5D5D
 @media only screen and (max-width: 1000pt)
  font-size: 0.8rem

.cardLink
  text-decoration: none
  color: #5e5e5e

#headerImg
  display: flex
  justify-content: space-between
  margin: 8px 3px 2px 0px

#headerLabel
  display: flex

.headerLabel
  font-weight: bold
  text-transform: uppercase
  align-self: center
  font-size: 0.7em
  color: white
  padding: 2px 3px
  border-radius: 3px
  margin-right: 2px

#headerDate
  background-color: #5f939a

#headerDuration
  background-color: #e4bad4

#headerDifficulty
  background-color: #ffb037

#guideimgcontainer
  position: relative
  display: flex
  justify-content: flex-end
  width: 100%
  height: 300px
  @media only screen and (max-width: 1000pt)
    height: 250px
  @media only screen and (max-width: 600pt)
    height: 200px

#guidelogo
  top: 10px
  right: 10px
  position: absolute

#footerImg
  font-weight: bold
  text-transform: uppercase
  align-self: center
  font-size: 0.7em
  display: flex
  justify-content: space-between
  background-color: #EFEFEF
  color: #adadad
  margin-bottom: 5px

#title
  font-family: Roboto
  display: flex
  align-items: center
  font-weight: bold
  text-transform: uppercase
  font-size: 0.9em
  height: 50px
  @media only screen and (max-width: 1000pt)
    height: 35px
    margin-bottom: 3px

.green
  color: #3BB30B

#progress
  font-size: 1.5em

#introduction
  height: 70px
  overflow: hidden
  margin: 5pt 5pt
  @media only screen and (max-width: 1000pt)
    margin-bottom: 0px
    height: 35px
    font-size: 0.8rem

#stepdone
  display: flex
  align-items: center

#stepdonestring
  font-size: 0.8em
  width 20px
  margin: 3px

#readmorecontainer
  display: flex
  justify-content: space-around
  margin: 10px
  @media only screen and (max-width: 1000pt)
    margint-bottom: 10px
  @media only screen and (max-width: 600pt)
    margint-bottom: 10px

#readmorebtn
  text-decoration: none
  cursor: pointer
  text-align: center
  padding: 5px
  border: none
  background-color: #3BB30B
  color: white
  text-transform: uppercase
  border-radius: 3px
  width: 120px

#readmorebtn:hover
  background-color: #2F880B

</style>
