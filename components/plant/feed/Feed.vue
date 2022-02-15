<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
    <FeedEntry v-for="feedEntry in feedEntries" v-bind:key="feedEntry.id" :lib='lib' :feedEntry="feedEntry" v-on:dialogTriggered="dialogTriggered"></FeedEntry>
    <div v-if='feedEntries.length' :id="$style.spinner_container">
      <infinite-loading
              spinner="spiral"
              @infinite="loadNextFeedEntriesById">
        <div slot="no-more"></div>
      </infinite-loading>
    </div>
  </section>
</template>

<script>
export default {
  props: ['lib', 'plantID',],
  data() {
    return {
      feedEntries: [],
      page: 0,
      pageSize: 10,
    }
  },
  async mounted() {
    const { lib, plantID, } = this.$props
    const feedEntries = await lib.getFeedEntriesForPlantId(plantID, this.pageSize, this.page)
    this.feedEntries = this.feedEntries.concat(feedEntries);
  },
  methods: {
    async loadNextFeedEntriesById($state) {
      const { lib, plantID, } = this.$props
      this.page++;
      const feedEntries = await lib.getFeedEntriesForPlantId(plantID, this.pageSize, this.page * this.pageSize)
      if (feedEntries.length > 0) {
        this.feedEntries = this.feedEntries.concat(feedEntries);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    dialogTriggered() {
      this.$emit('dialogTriggered');
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  align-items: center
  flex: 1

#spinner_container div
  width: 250px

</style>
