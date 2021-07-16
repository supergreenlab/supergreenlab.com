<template>
    <div>
        <img v-if="imgUrl" :src='imgUrl'/>
    </div>
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
                    this.imgUrl = 'https://storage2.supergreenlab.com' + data.medias[0].filePath;
                    console.log(data, 'in feed-entry-media');
                })
                .catch(err => console.log(err.message));

        },

    }
</script>

<style scoped>

</style>
