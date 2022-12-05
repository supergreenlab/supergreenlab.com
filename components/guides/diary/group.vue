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
    <div :id='$style.list'>
      <div v-for='e in guideSection.entry' :class='{ [$style.listItem]: true, [$style.selected]: current == e }' @click='selectItem(e)'>
        <img v-if='thumbnailPath(e)' :src='thumbnailPath(e)' />
        <div v-else>{{ e.type }}</div>
      </div>
    </div>
    <div :id='$style.current'>
      <FeedEntry :key='current.id' :feedEntry='current' :feedMedias='currentMedias' />
    </div>
  </section>
</template>

<script>

import FeedEntry from '~/components/plant/feed/cards/FeedEntry.vue'

export default {
  props: [ 'index', 'guide', 'guideSection',],
  components: {FeedEntry,},
  data() {
    return {
      current: this.$props.guideSection.entry[0],
    }
  },
  computed: {
    thumbnailPath() {
      return (entry) => {
        if ((entry.medias || []).length == 0) {
          return ''
        }
        const media = this.$props.guideSection.medias.find(m => entry.medias[0].thumbnailPath.indexOf(m.fileName) !== -1)
        return `/img/${media.fileSmall}`
      }
    },
    currentMedias() {
      const { current } = this.$data
      return (current.medias || []).map(m1 => { 
        const file = this.$props.guideSection.medias.find(m => m1.filePath.indexOf(m.fileName) !== -1)
        return Object.assign({}, m1, {
          type: file.type,
          filePath: `/img/${file.type.indexOf('video/') == 0 ? file.filePath : file.fileFull}`,
          thumbnailPath: `/img/${this.$props.guideSection.medias.find(m => m1.thumbnailPath.indexOf(m.fileName) !== -1).fileSmall}`,
        })
      })
    },
  },
  methods: {
    selectItem(e) {
      this.$data.current = e
    },
  },
}
</script>

<style module lang=stylus>

#container {
}

#list
  display: flex
  align-items: center
  justify-content: center

.listItem
  margin: 5px 5px
  cursor: pointer
  min-height: 40px

.selected
  border: 3px solid #3bb30b

#current
  display: flex
  align-items: center
  justify-content: center

</style>
