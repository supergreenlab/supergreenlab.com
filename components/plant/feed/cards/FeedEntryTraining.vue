<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id='$style.container'>
    <div  v-if="images.after && images.after[0]">
      <div :class="$style.label">After</div>
      <MediaViewer :medias='images.after' height='400px' :onMediaClick='onClickAfter' />
    </div>
    <div v-if="images.before && images.before[0]">
      <div :class="$style.label">Before</div>
      <MediaViewer :medias='images.before' height='400px' :onMediaClick='onClickBefore' />
    </div>
    <p :id='$style.message' v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    <FullscreenPics v-if='showPic' :medias='medias' :onClose='onClose'/>
  </div>
</template>

<script>
export default {
  name: "feed-entry-training",
  data() {
    return {
      showPic: false,
      medias: null,
      images: {
        before: [],
        after: []
      }
    }
  },
  props: ['lib', 'feedEntry'],
  async mounted() {
    const { lib } = this.$props
    const data = await lib.getFeedMediasForFeedEntryId(this.feedEntry.id)
    data.medias.forEach(imageObject => {
      if (JSON.parse(imageObject.params).before) {
        this.images.before.push(imageObject);
      } else {
        this.images.after.push(imageObject);
      }
    })
  },
  computed: {
    mediaUrl: () => (url) => {
      return 'https://storage.supergreenlab.com' + url;
    }
  },
  methods: {
    onClickAfter(e) {
      this.$data.showPic = true
      this.$data.medias = this.$data.images.after
    },
    onClickBefore(e) {
      this.$data.showPic = true
      this.$data.medias = this.$data.images.before
    },
    onClose(e) {
      this.$data.showPic = false
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: block

.image
  max-width: 100%

.video
  width: 100%
  height: 260px

#message
  padding: 10px 15px
  text-align: left

.label
  text-align: left
  padding: 10px 10px 5px 10px

</style>
