<template>
    <img v-if="imgUrl" :src='imgUrl' class="feed-entry-media-image"/>
</template>

<script>
    import {getFeedMediasByFeedEntryId} from "../../lib/plant";

    export default {
        data() {
            return {
                imgUrl: null
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
                    this.imgUrl = 'https://storage.supergreenlab.com' + data.medias[0].filePath;
                    console.log(data, 'in feed-entry-media');
                })
                .catch(err => console.log(err.message));

        },

    }
</script>

<style scoped>
    .feed-entry-media-image {
        max-width: 100%;
    }
</style>
