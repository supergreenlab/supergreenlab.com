<template>
    <div>
        <!-- TODO: "Timer mode", if required
        <div  class="feed-entry-ventilation-header">
            Timer mode
        </div>
         -->

        <div class="feed-entry-ventilation-content" v-if="feedEntry.params.values">
            <div class="feed-entry-ventilation-card">
                <span class="feed-entry-ventilation-settings">
                    <img class="feed-entry-ventilation-icon" :src="require('~/assets/img/feed_card/icon_blower.svg')" />
                    Night settings
                </span>
                <span class="feed-entry-ventilation-volume">{{feedEntry.params.values.blowerMin}}%</span>
            </div>
            <div class="feed-entry-ventilation-card">
                <span class="feed-entry-ventilation-settings">
                    <img class="feed-entry-ventilation-icon" :src="require('~/assets/img/feed_card/icon_blower.svg')" />
                    Day settings
                </span>
                <span class="feed-entry-ventilation-volume">{{feedEntry.params.values.blowerMax}}%</span>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "feed-entry-ventilation",
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

    .feed-entry-ventilation-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .feed-entry-ventilation-content {
        display: inline-flex;
    }

    .feed-entry-ventilation-card {
        width: 150px;
        margin: 5px;
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 90px;
        padding: 10px;
    }

    .feed-entry-ventilation-settings {
        display: flex;
        align-items: center;
    }

    .feed-entry-ventilation-icon {
        width: 20px;
        margin-right: 10px;
    }

    .feed-entry-ventilation-volume {
        font-size: 25px;
        display: block;
        margin-top: 15px;
    }
</style>
