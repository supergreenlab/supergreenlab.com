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
        <div  v-if="images.after && images.after[0]">
            <div class="image_label">After</div>
            <img :src='getMediaUrl(images.after[0].filePath)' class="feed-entry-media-image"/>
        </div>
        <div v-if="images.before && images.before[0]">
            <div class="image_label">Before</div>
            <img :src='getMediaUrl(images.before[0].filePath)' class="feed-entry-media-image"/>
        </div>
        <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    </div>
</template>

<script>
    import {getFeedMediasByFeedEntryId} from "../../lib/plant";

    export default {
        name: "feed-entry-training",
        data() {
            return {
                images: {
                    before: [],
                    after: []
                }
            }
        },
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        methods: {
            getMediaUrl(url) {
                return 'https://storage.supergreenlab.com' + url;
            }
        },
        mounted() {
            getFeedMediasByFeedEntryId(this.feedEntry.id)
                .then(data => {
                    data.medias.forEach(imageObject => {
                        if (JSON.parse(imageObject.params).before) {
                            this.images.before.push(imageObject);
                        } else {
                            this.images.after.push(imageObject);
                        }
                    })
                })
                .catch(err => console.log(err.message));
        },
    }
</script>

<style scoped>
    .feed-entry-media-image {
        width: 100%;
        height: 448px;
        object-fit: cover;
    }

    .feed-entry-media-video {
        width: 100%;
        height: 260px;
    }

    p {
        padding: 10px 15px;
        text-align: left;
    }

    .image_label {
        text-align: left;
        padding: 10px 10px 5px 10px;
    }
</style>
