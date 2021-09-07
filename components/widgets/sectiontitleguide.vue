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
    <h1 :id='$style.title'>{{ title }}</h1>
    <h2 :id='$style.green'>{{ green }}</h2>
    <p :id='$style.content'>{{ content }}</p>
  </section>
</template>

<script>

export default {
  props: ['title', 'green', 'content'],
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  @media only screen and (max-width: 600px)
    font-size: 1em

#title
  font-family: Roboto
  margin-top: 10px
  margin-bottom: 10px
  font-size: 2.7em
  color: #5E5E5E
  text-transform: capitalize

#green
  font-family: Roboto
  color: #3BB30B
  font-size: 2.1em
  text-align: center
  text-transform: capitalize
  margin-bottom: 10px

#content
  margin: 10px
  font-size: 1em
  @media only screen and (max-width: 600pt)
    margin-top: 30px



</style>
