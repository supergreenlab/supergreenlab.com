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
    <div :id='$style.body'>
      <nuxt-link :class='$style.step' to='/app'>
        <div :class='$style.logo' :id='$style.appstores'></div>
        Install the app<br />
        <small>checkout the explorer tab<br />for inspiration</small>
      </nuxt-link>
      <b>&nbsp;then&nbsp;</b>
      <nuxt-link :class='$style.step' to='/discord'>
        <div :class='$style.logo' :id='$style.discord'></div>
        <small>Still got questions?</small>
        Join the discord server<br />
        <small>Ask us anything!</small>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

#body
  display: flex
  align-items: center
  justify-content: center

#appstores
  background-image: url('~assets/img/logo-appstores.png')

#discord
  background-image: url('~assets/img/logo-discord.png')

.step
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  font-weight: bold
  color: #454545
  text-decoration: none
  text-align: center

.step:hover
  text-decoration: underline
  
.step:hover .logo
  transform: scale(1.05)

.logo
  width: 100pt
  height: 100pt
  margin-bottom: 5pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  transition: transform 0.2s
  @media only screen and (max-width: 600pt)
    width: 70pt
    height: 70pt

</style>
