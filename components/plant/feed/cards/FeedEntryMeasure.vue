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
  <section :id='$style.container'>
    <MediaViewer v-if='media' :medias='[media]' height='400px' :onMediaClick='onClick' :setShownMedias='setShownMedias'/>
    <p :id='$style.message' v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    <FullscreenPics v-if='showPic' :medias='[media]' :onClose='onClose'/>
  </section>
</template>

<script>
export default {
  data() {
    return {
      media: null,
      showPic: false,
    }
  },
  props: ['lib', 'feedEntry', 'feedMedias', 'setShownMedias',],
  async mounted() {
    if (!this.$props.feedMedias) {
      if (!this.$props.lib) {
        return
      }
      const { lib } = this.$props
      const data = await lib.getFeedMediasForFeedEntryId(this.feedEntry.id)
      const media = data.medias[0]
      this.$props.setShownMedias(data.medias)

      const { feedEntry } = this.$props
      if (feedEntry.params.previous) {
        const previous = await lib.getFeedMediaById(feedEntry.params.previous)
        media.previous = previous
      }
      this.$data.media = media
    } else {
      this.$props.setShownMedias(this.$props.feedMedias)
      this.$data.media = this.$props.feedMedias[0]
    }

  },
  methods: {
    onClick(e) {
      this.$data.showPic = true
    },
    onClose(e) {
      this.$data.showPic = false
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column

#message
  padding: 10px 15px
  text-align: left

</style>
