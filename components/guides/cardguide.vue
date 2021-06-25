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
    <nuxt-link :id="$style.cardLink" :to='`/guide/${guide.slug}`'>
      <div :id="$style.guideimgcontainer" :style='{"background-position" : `center center`,"background-repeat" : `no-repeat`, "background-size" : `cover`,"background-image":  `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 100%), url(${require(`~/assets/img/${ guide.thumbnail.fileLarge }`) })`}'>
        <div :id="$style.guidelogo" >
          <img src="~assets/img/logo_white.svg" alt="logo-supergreenlab">
        </div>
      </div>
      <div :id="$style.titlecontainer">
        <div :id="$style.title">
          <h2> {{ guide.title }} - <span :class="$style.green">{{ guide.subtitle }}</span></h2>
        </div>
        <div :id="$style.stepdone" v-if="nSteps(guide)" :class='nChecked(guide) == nSteps(guide) ? $style.green : ""'>
          <span :class="$style.green">{{ nChecked(guide) }}</span>/{{ nSteps(guide) }}<div :id="$style.stepdonestring">Steps Done</div>
        </div>
      </div>
      <div v-html="$md.render(guide.text)" :id="$style.introduction"></div>
      <div :id="$style.readmorecontainer">
        <button :id="$style.readmorebtn">Read More</button>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import { guides } from '~/config/guides.json'

export default {
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
  }
}

</script>

<style module lang=stylus>
#container
 border: 3px solid #EFEFEF
 color: #5D5D5D
 @media only screen and (max-width: 1000pt)
  font-size: 0.8rem

#cardLink
  text-decoration: none
  color: #5e5e5e

#guideimgcontainer
  position: relative
  display: flex
  justify-content: flex-end
  margin-top: 20px
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

#titlecontainer
  display: flex
  justify-content: space-between
  align-items: center
  margin: 10px
  height: 38px
  @media only screen and (max-width: 1000pt)
    height: 24px
  @media only screen and (max-width: 600pt)
    height: 24px

#title
  font-weight: bold
  text-transform: capitalize
  font-size: 0.7em

.green
  color: #3BB30B

#stepdone
  display: flex
  align-items: center

#stepdonecontainer
  font-size: 2.7em

#stepdonestring
  font-size: 0.5rem
  width 20px
  margin: 3px

#introduction
  height: 50px
  overflow: hidden
  margin: 10px
  @media only screen and (max-width: 1000pt)
    margin-bottom: 0px
    height: 25px
    font-size: 0.8rem
  @media only screen and (max-width: 600pt)
    margin-bottom: 0px
    height: 25px
    font-size: 0.8rem

#readmorecontainer
  display: flex
  justify-content: flex-end
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
  width: 150px

#readmorebtn:hover
  background-color: #2F880B

</style>
