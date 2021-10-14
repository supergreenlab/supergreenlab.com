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
  <section :id="$style.container">
    <div :class="$style.colC">
      <div  v-for="channel in channels" :key="channel.id">
        <DiscordCard :channel='channel' />
      </div>
    </div>
    <div :class="$style.colC">
      <div  v-for="channel in channels2" :key="channel.id">
        <DiscordCard :channel='channel' />
      </div>
    </div>
    <div :class="$style.colC">
      <div  v-for="channel in channels3" :key="channel.id">
        <DiscordCard :channel='channel' />
      </div>
    </div>
  </section>

</template>


<script>
import DiscordCard from '~/components/home/discordcard.vue'
import { channels } from '~/config/channels.json'

export default {
  components: { DiscordCard },
  computed: {
   channels() {
     return channels.slice(0, 6)
   },
   channels2() {
     return channels.slice(6, 12)
   },
   channels3() {
     return channels.slice(12, 18)
   }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  max-width: 700pt
  justify-content: center
  @media only screen and (max-width: 600px)
    flex-direction:column
    align-items: center

.colC
  display: flex
  flex-direction: column

</style>
