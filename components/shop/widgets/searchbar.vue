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
   <div :id='$style.searchcontainer'>
    <div :class='$style.searchlogo' :id="$style.searchlogo"></div>
    <input type='text' name='search' :id='$style.searchbars' placeholder='What are you looking for?'>
   </div>
</template>

<script>
export default {

}
</script>

<style module lang=stylus>

#searchcontainer
  display: flex
  align-items: center
  background-color: #EDEDED
  border: 1pt solid #c2c2c2
  border-radius: 2pt

.searchlogo
  width: 30px
  height: 30px
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  cursor: pointer
  @media only screen and (max-width: 600px)
    width: 25px
    height: 25px

#searchlogo
  background-image: url('~assets/img/searchlogo.png')
  padding: 0.5em 2.5em

#searchbars
  border: none
  border-radius: 0pt
  width: 100%

</style>
