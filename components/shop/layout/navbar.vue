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
    <div :class="$style.section">Bundles</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">SGL Family</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">Spotlight</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">3d Printing</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">SGL Products</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">Growing Pack</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">Furniture</div>
    <span :class="$style.separation"></span>
    <div :class="$style.section">Tools</div>
  </section>
</template>

<script>

export default {

}

</script>

<style module lang=stylus>
#container
  display: flex
  justify-content: space-around
  margin-top: 3px
  margin-bottom: 3px
  @media only screen and (max-width: 600px)
    margin-left: 10px
    margin-right: 10px
    white-space: nowrap
    overflow-x: auto
    justify-content: start
    overflow-behavior: smooth

#container::-webkit-scrollbar
  display: none

.section
  text-transform: uppercase
  cursor: pointer

.separation
  border-left: 1px solid
  @media only screen and (max-width: 600px)
    margin-left: 10px
    margin-right: 10px

</style>
