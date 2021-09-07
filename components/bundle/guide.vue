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
    <div :id='$style.icon' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
    <div :id='$style.content'>
      <h2>{{ title }}</h2>
      <h1>{{ subtitle }}</h1>
      <p v-if='text'>{{ text }}</p>
      <a @click='onClick' v-if='href' :id='$style.learnmore' :href='href'>{{ button }}</a>
      <nuxt-link @click.native='onClick' v-else-if='slug' :id='$style.learnmore' :to='`/guide/${slug}`'>{{ button }}</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ['icon', 'title', 'subtitle', 'text', 'slug', 'href', 'button', 'analytics',],
  methods: {
    onClick() {
      const { analytics } = this.$props
      this.$matomo && this.$matomo.trackEvent('guide', 'clicked', analytics)
    }
  },
}
</script>

<style module lang=stylus>

#container
  font-family: Roboto
  display: flex

#icon
  flex: 1
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  margin-right: 5pt

#content
  display: flex
  flex-direction: column
  flex: 2

#content > h2
  color: #5d5d5d
  @media only screen and (max-width: 600px)
    font-size: 1.2em

#content > h1
  color: #3bb30b
  margin: 0
  @media only screen and (max-width: 600px)
    font-size: 1.5em

#content > p
  color: #5d5d5d
  font-size: 1.4em
  padding: 5pt 0 0 0

#learnmore
  display: block
  background-color: #3BB30B
  padding: 8pt 5pt
  width: 100pt
  margin: 5pt 0 0 0
  border-radius: 3pt
  color: white
  text-decoration: none
  text-align: center
  font-weight: 500

</style>
