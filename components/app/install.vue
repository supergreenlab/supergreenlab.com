<!--
      Copyright (C) 2023  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id='$style.stores'>
    <a target='_blank' href='https://play.google.com/store/apps/details?id=com.supergreenlab.app2'><img src='~/assets/img/app/icon-playstore.png' /></a>
    <a target='_blank' href='https://apps.apple.com/gb/app/supergreenlab-grow-assistant/id1502232318'><img src='~/assets/img/app/icon-appstore.png' /></a>
  </div>
</template>

<script>

export default {
}

</script>

<style module lang=stylus>

#stores
  display: flex
  align-items: center
  justify-content: center

#stores a
  margin: 20px 10px

#stores a img
  height: 50px
  @media only screen and (max-width: 600px)
    height: 40px


</style>
