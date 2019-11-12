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
    <div :id='$style.title'>
      <SectionTitle title='Follow us'
                    green='on social medias'
                    title2="let's stay in touch"
                    separator='true'/>
    </div>
    <div :id='$style.socialicons'>
      <a href='https://www.reddit.com/r/supergreenlab' target='_blank'>
        <div :class='$style.socialicon' :id='$style.reddit'></div>
      </a>
      <a href='https://www.youtube.com/c/supergreenlab' target='_blank'>
        <div :class='$style.socialicon' :id='$style.youtube'></div>
      </a>
      <a href='https://www.instagram.com/sgreenlab/' target='_blank'>
        <div :class='$style.socialicon' :id='$style.instagram'></div>
      </a>
    </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/sectiontitle.vue'

export default {
  components: {SectionTitle,},
  computed: {
    posts() {
      return instagram.posts
    }
  },
  methods: {
    open(url) {
      window.open(url, '_blank')
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%
  margin: 0pt 0 50pt 0

#socialicons
  display: flex
  align-items: center
  justify-content: center
  margin: 0 50pt
  @media only screen and (max-width: 600px)
    margin: 0

.socialicon
  width: 100pt
  height: 50pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  cursor: pointer

#youtube
  background-image: url('~assets/img/youtube.svg')

#reddit
  background-image: url('~assets/img/reddit.svg')

#instagram
  background-image: url('~assets/img/instagram.svg')

</style>
