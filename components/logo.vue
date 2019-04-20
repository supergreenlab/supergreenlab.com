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
  <div :id='$style.supergreenlab' :style='{"font-size": size, color, margin}'>
    <div v-if='overtitle' :id='$style.overtitle'>{{ overtitle }}</div>
    <div :id='$style.logo'>
      <span :class='vertical == true ? $style.supersmallword : ""'>S<span :class='$style.supersmall'>upe</span>r</span><br v-if='vertical != false' />
      <span :class='$style.supergreen'>G<span :class='$style.supersmall'>ree</span>n</span><br v-if='vertical != false' />
      <span>L<span :class='$style.supersmall'>a</span>b</span>
    </div>
    <div v-if='subtitle' :id='$style.subtitle'>{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    vertical: {
      default: false,
    },
    size: {
      default: '1em',
    },
    color: {
      default: 'black',
    },
    margin: {
      default: '0pt',
    },
    overtitle: {
      default: ''
    },
    subtitle: {
      default: ''
    }
  }
}
</script>

<style module lang=stylus>

#supergreenlab
  display: flex
  flex-direction: column

#logo
  font-family: 'PlumeAd'
  text-transform: uppercase
  letter-spacing: 1pt
  word-spacing: -10pt

.supergreen
  color: #3BB30B

.supersmall
  font-size: 0.9em

.supersmallword
  font-size: 0.85em

#overtitle, #subtitle
  font-family: Roboto
  font-weight: 300
  font-size: 0.4em

#subtitle
  align-self: end

</style>
