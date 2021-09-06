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
    <div>
        <img v-if="mediaType === MEDIA_TYPES.TYPE_IMAGE" :src='url' :class="$style.feed_entry_media_image"/>
        <video controls v-else-if="mediaType === MEDIA_TYPES.TYPE_VIDEO" ref="videoPlayer" :class="$style.feed_entry_media_video">
            <source :src="url" type="video/mp4" >
        </video>
        <img @click="Playvid" v-if="mediaType === MEDIA_TYPES.TYPE_VIDEO && playbtn" src='~assets/img/playbtn.png' :id="$style.playbtn" />
        <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    </div>
</template>

<script>
    import {getFeedMediasByFeedEntryId} from "../../lib/plant";

    export default {
        data() {
            return {
                playbtn: true,
                url: null,
                mediaType: null,
                MEDIA_TYPES:  {
                    TYPE_IMAGE: 1,
                    TYPE_VIDEO: 2
                }
            }
        },
        name: "feed_entry_media",
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        mounted() {
            getFeedMediasByFeedEntryId(this.feedEntry.id)
                .then(data => {
                    this.url = 'https://storage.supergreenlab.com' + data.medias[0].filePath;

                    // Here I differentiate between image and video media
                    if (this.url.includes('/feedmedias/pictures')) {
                        this.mediaType = this.MEDIA_TYPES.TYPE_IMAGE;
                    } else if (this.url.includes('/feedmedias/videos')) {
                        this.mediaType = this.MEDIA_TYPES.TYPE_VIDEO;
                    }

                })
                .catch(err => console.log(err.message));
        },
        methods: {

        Playvid() {
          this.$refs.videoPlayer.play()
          this.playbtn = false
          }
        }

    }
</script>

<style module lang=stylus>

.feed_entry_media_image {
    width: 100%;
    max-height: 448px;
    object-fit: cover;
}

.feed_entry_media_video {
    width: 100%;
    height: 252pt;
}

p {
    padding: 10px 15px;
    text-align: left;
}

#playbtn
  width: 100pt
  height: 100pt
  position: absolute
  left: 45%
  margin-top: 75pt
  cursor: pointer
  @media only screen and (max-width: 600px)
    left: 35%



</style>
