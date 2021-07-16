<template>
    <div>
        <img v-if="mediaType === MEDIA_TYPES.TYPE_IMAGE" :src='url' class="feed-entry-media-image"/>
        <video controls v-else-if="mediaType === MEDIA_TYPES.TYPE_VIDEO" ref="videoPlayer" class="feed-entry-media-video">
            <source :src="url" type="video/mp4">
        </video>
        <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    </div>
</template>

<script>
    import {getFeedMediasByFeedEntryId} from "../../lib/plant";

    export default {
        data() {
            return {
                url: null,
                mediaType: null,
                MEDIA_TYPES:  {
                    TYPE_IMAGE: 1,
                    TYPE_VIDEO: 2
                }
            }
        },
        name: "feed-entry-media",
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

    }
</script>

<style scoped>
    .feed-entry-media-image {
        max-width: 100%;
    }

    .feed-entry-media-video {
        width: 100%;
        height: 260px;
    }

    p {
        padding: 10px 15px;
        text-align: left;
    }
</style>
