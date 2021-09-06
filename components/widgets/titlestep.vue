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
    <h2 :id='$style.title'>{{ title }}</h2>
    <div :id='$style.checkstep'>
      <CheckBox v-if='checkbox' :checked='checked' @click='click()' />
      <h1 :id='$style.green'>{{ green }}</h1>
    </div>
    <p :id='$style.introduction' v-html='$md.render(introduction || "")'></p>
  </section>
</template>

<script>
import CheckBox from '~/components/widgets/checkbox.vue'
export default {
  props: ['title','green', 'checkbox', 'checked', 'introduction'],
  components: { CheckBox },
  methods: {
    click() {
      this.$emit('click', !this.$props.checked)
    },
  },
}
</script>

<style module lang=stylus>

#container
  width: 100%
  display: flex
  font-size: 2.1em
  flex-direction: column
  justify-content: flex-start
  @media only screen and (max-width: 600px)
    font-size: 0.8em

#checkstep
  margin-left: 100px
  display: flex
  align-items: center
  /* cursor: pointer */
  @media only screen and (max-width: 600px)
    margin-left: 10px
    font-size: 2em

#title
  font-family: Roboto
  margin-left: 50px
  font-size: 1.5em
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    margin-left: 10px
    font-size: 2.3em

#green
  font-family: Roboto
  color: #3BB30B
  font-size: 1em
  text-transform: uppercase
  margin-bottom: 0.2em
  margin-top: 0.2em
  /* @media only screen and (max-width: 600px)
    margin-left: 10px
    font-size: 2em */

#introduction
  margin-left: 110px
  margin-bottom: 0em
  padding-right: 30%
  color: #5E5E5E
  font-size: 0.5em
  @media only screen and (max-width: 600px)
    font-size: 1.1em
    margin-left: 20px
    padding-right: 5px

#introduction strong
  color: #3bb30b
  font-weight: bold

</style>
