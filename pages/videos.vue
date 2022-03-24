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
   <div :id='$style.header'>
     <Header :nohidemenu=true :nosearch=true location='VIDEO_PAGE'/>
   </div>
   <div :id='$style.fullcontent'>
     <div :id='$style.content'>
       <Shop name='video-page' location='VIDEO_PAGE' nomargin='true' />
     </div>
   </div>
   <Footer />
 </section>
</template>

<script>

import Header from '~/components/shop/layout/header.vue'
import Footer from '~/components/layout/footer.vue'

import Shop from '~/components/shop/shop.vue'

export default {
  props: ['location',],
  components: {Header, Shop, Footer},
  head() {
    return {
      title: `SuperGreenLab Videos!`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'SuperGreenLab videos, checkout our building and growing guides!'
        },
      ],
    }
  },
  data() {
    return {
      searchResults: [],
      showSearchResults: false,
    }
  },
  methods: {
    onShowResults(input, results) {
      this.$data.showSearchResults = input.length
      this.$data.searchResults = results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100vw
  flex-direction: column
  align-items: center

#header
  position: fixed
  width: 100vw
  top: 0
  left: 0
  z-index: 1000

#fullcontent
  display: flex
  justify-content: space-between
  width: 100%
  margin-top: 62.25pt
  @media only screen and (max-width: 1500px)
    justify-content: center
    margin-top: 75pt

#content
  display: flex
  flex-direction: column
  justify-content: center
  min-width: 0
  margin: 2pt 200pt
  width: 100%
  overflow: visible
  @media only screen and (max-width: 1500px)
    margin: 10pt 0

</style>
