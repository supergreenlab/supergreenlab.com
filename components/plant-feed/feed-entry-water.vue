<template>
    <div>
        <div  class="feed-entry-water-header">
            <span>Was dry: {{feedEntry.params.tooDry ? 'YES' : 'NO'}}</span>
            <span>With nutes: {{feedEntry.params.nutrients ? 'YES' : 'NO'}}</span>
        </div>

        <div class="feed-entry-water-content">
            <span>Water quantity</span>
            <span class="feed-entry-water-volume">{{feedEntry.params.volume}} L</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "feed-entry-water",
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
    }
</script>

<style scoped>
    .feed-entry-water-header {
        display: flex;
        justify-content: space-between;
        color: gray;
        margin-bottom: 10px;
    }

    .feed-entry-water-content {
        width: 150px;
        margin: 0 auto;
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 90px;
        padding: 15px;
    }

    .feed-entry-water-volume {
        font-size: 25px;
        display: block;
        margin-top: 15px;
    }
</style>
