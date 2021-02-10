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
    <h1 :id='$style.green'>{{ green }}</h1>
    <p :id='$style.introduction'>{{ introduction }}</p>
  </section>
</template>

<script>
export default {
  props: ['title', 'green', 'introduction'],
}
</script>

<style module lang=stylus>
#container
  width: 90%
  display: flex
  font-size: 2.1em
  flex-direction: column
  justify-content: flex-start
  @media only screen and (max-width: 600px)
    font-size: 0.8em

#title
  margin-left: 100px
  font-size: 1.5em
  color: #5E5E5E
  @media only screen and (max-width: 600px)
    margin-left: 10px
    font-size: 2.3em

#green
  margin-left: 160px
  color: #3BB30B
  font-size: 1em
  text-transform: capitalize
  margin-bottom: 0.2em
  margin-top: 0.2em
  @media only screen and (max-width: 600px)
    margin-left: 0px
    font-size: 2em

#introduction
  margin-left: 250px
  margin-bottom: 0em
  padding-right: 30%
  color: #5E5E5E
  font-size: 0.5em
  font-style: italic
  @media only screen and (max-width: 600px)
    font-size: 1.1em
    margin-left: 60px
    padding-right: 0%

</style>
