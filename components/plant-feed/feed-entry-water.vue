<template>
    <div class="feed-entry-water-wrapper">
        <div  class="feed-entry-water-header">
            <span>Was dry: {{feedEntry.params.tooDry ? 'YES' : 'NO'}}</span>
            <span>With nutes: {{feedEntry.params.nutrient ? 'YES' : 'NO'}}</span>
        </div>

        <div class="feed-entry-water-wrapper">
            <div class="feed-entry-water-cards">
                <div class="feed-entry-water-content">
                    <span>Water quantity</span>
                    <span class="feed-entry-water-volume">{{feedEntry.params.volume}} L</span>
                </div>
                <div class="feed-entry-water-content" v-if="feedEntry.params.ph">
                    <span>PH</span>
                    <span class="feed-entry-water-volume">{{feedEntry.params.ph}}</span>
                </div>
                <div class="feed-entry-water-content" v-if="feedEntry.params.ec">
                    <span>EC</span>
                    <span class="feed-entry-water-volume">{{feedEntry.params.ec}}</span>
                </div>
                <div class="feed-entry-water-content" v-if="feedEntry.params.tds">
                    <span>TDS</span>
                    <span class="feed-entry-water-volume">{{feedEntry.params.tds}}</span>
                </div>
            </div>
            <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
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
    .feed-entry-water-wrapper {
    }

    .feed-entry-water-header {
        display: flex;
        justify-content: space-between;
        color: gray;
        margin-bottom: 10px;
        padding: 0 20px;
    }

    .feed-entry-water-content {
        width: 150px;
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 90px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        margin: 10px;
    }

    .feed-entry-water-volume {
        font-size: 25px;
        display: block;
        margin-top: 15px;
    }

    p {
        padding: 10px 15px;
        text-align: left;
    }

    .feed-entry-water-cards {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
