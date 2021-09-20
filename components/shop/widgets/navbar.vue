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
    <div v-for='(c, i) in items' :key='c.id' :class='$style.navitem'>
      <nuxt-link :to="{ hash: `#${c.slug}`}" :class="$style.section">Bundles</nuxt-link>
      <span v-if='i != items.length-1' :class="$style.separation"></span>
    </div>
  </section>
</template>

<script>

export default {
  props: ['containers',],
  computed: {
    items() {
      return this.$props.containers.filter(c => c.menu)
    },
  },
}

</script>

<style module lang=stylus>
#container
  display: flex
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
  text-decoration: none
  color: #4c4c4c
  text-transform: uppercase
  cursor: pointer

.separation
  margin-left: 10px
  margin-right: 10px

.navitem
  display: flex
  padding: 0 20pt

</style>
