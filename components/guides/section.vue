<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
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
    <div :class='$style.videosection'>
      <Media :media='guideSection.media' />
      <div :class='$style.text'>
        <h1 v-if='!guideSection.sections && guideSection.title'>{{ guideSection.title }}</h1>
        <p :class='$style.ps' v-if='guideSection.text' v-html='$md.render(guideSection.text)'></p>
      </div>
    </div>
    <h2 v-if='requires.length'>What you'll need</h2>
    <SmallProductList v-if='requires.length' :products='requires' />
  </section>
</template>

<script>
import Media from '~/components/guides/media.vue'
import SmallProductList from '~/components/products/smallproductlist.vue'

export default {
  props: [ 'guideSection', ],
  components: { Media, SmallProductList, },
  computed: {
    requires() {
      return (this.$props.guideSection.requires || []).map(r => this.$store.getters['eshop/product'](r))
    }
  }
}
</script>

<style module lang=stylus>

#container
  width: 100%
  font-size: 1.1em
  margin: 60pt 10pt
  @media only screen and (max-width: 600pt)
    margin: 15pt 0pt
    padding 0 5pt

#container h2
  margin: 20pt 0 0 5pt
  font-size: 1em
  color: #454545

.text > h1
  margin: 0 0 20pt 0
  color: #6D6D6D 

.ps
  margin: 10pt 0
  color: #454545

.ps p
  margin-bottom: 10pt

.ps strong
  color: #3BB30B
  font-weight: 600

.ps h3
  color: #717171

.videosection
  display: flex
  @media only screen and (max-width: 600pt)
    flex-direction: column

.videosection > *
  flex-basis: 50%

.videosection > p
  margin: 10pt

</style>
