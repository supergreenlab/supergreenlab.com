<template>
    <feed-entry-light v-if="feedEntry.type === 'FE_LIGHT'" :feedEntry="feedEntry"></feed-entry-light>
    <feed-entry-water v-else-if="feedEntry.type === 'FE_WATER'" :feedEntry="feedEntry"></feed-entry-water>
    <feed-entry-media v-else-if="feedEntry.type === 'FE_MEDIA'" :feedEntry="feedEntry"></feed-entry-media>
</template>

<script>
    import FeedEntryLight from "./feed-entry-light";
    import FeedEntryWater from "./feed-entry-water";
    import FeedEntryMedia from "./feed-entry-media";
    export default {
        name: "feed-entry",
        components: {FeedEntryMedia, FeedEntryWater, FeedEntryLight},
        props: ['feedEntry']
    }
</script>

<style scoped>

</style>
