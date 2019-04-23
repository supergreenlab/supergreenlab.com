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
    <div :id='$style.image' :style='{transform: `scale(${!expanded ? 0.6 : 1})`}'>
      <img :src='require(`~/assets/img/${image}`)' />
    </div>
    <div ref='body' :id='$style.body' :style='{height}'>
      <h4>{{ title }}</h4>
      <slot></slot>
      <a :id='$style.expand' href='javascript:void(0)' v-on:click='expand'>{{ expanded ? "See less" : "See more" }}</a>
    </div>
  </section>
</template>

<script>
export default {
  props: ['image', 'title',],
  data() {
    return {
      expanded: false,
      height: '90px',
    }
  },
  methods: {
    expand() {
      this.$data.expanded = !this.$data.expanded
      if (this.$data.expanded)
        this.$data.height = this.$refs.body.scrollHeight + 40 + 'px'
      else
        this.$data.height = '90px'
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  margin: 20pt 0
  @media only screen and (max-width: 600px)
    margin: 0 0
    flex-direction: column

#image
  display: flex
  align-items: center
  justify-content: center
  transition: transform 0.3s

#image > img
  margin-right: 20pt
  max-width: 100pt
  @media only screen and (max-width: 600px)
    margin-right: 0
    margin-bottom: 20pt

#body
  overflow: hidden
  position: relative
  transition: height 0.3s

#body > h4
  margin-bottom: 10pt
  font-weight: 400
  font-size: 1.1em

#expand
  position: absolute
  cursor: pointer
  left: 0
  bottom: 0
  width: 100%
  height: 35px
  background-color: white

</style>
