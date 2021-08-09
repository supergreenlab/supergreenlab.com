<template>
    <div class="feed-entry-life-event">
        Flipped to {{(feedEntry.params.schedule)}}
    </div>
</template>

<script>
    export default {
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        name: "feed-entry-schedule"
    }
</script>

<style scoped>
    .feed-entry-life-event {
        color: #15A01A;
        font-size: 35px;
        width: 206px;
        margin: auto;
    }
</style>
