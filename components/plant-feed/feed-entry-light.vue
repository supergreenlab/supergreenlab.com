<template>
    <div class="feed-entry-light-content">
        <div v-for="(initialValue, key) in feedEntry.params.initialValues"
             v-if="initialValue !== feedEntry.params.values[key]"
             class="feed-entry-light-content-entry">
            <span>channel</span>
            <span class="channel-number">{{key + 1}}</span>
            {{initialValue}}%&nbsp;&#10132;&nbsp;{{feedEntry.params.values[key]}}%
        </div>
    </div>
</template>

<script>
    export default {
        name: "feed-entry-light",
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
    .feed-entry-light-content {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .feed-entry-light-content-entry {
        display: flex;
        flex-direction: column;
        margin: 10px;
    }

    .channel-number {
        font-size: 35px;
        color: gray;
    }
</style>
