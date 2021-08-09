<template>
    <div class="feed-entry-nutrient-wrapper">
        <div  class="feed-entry-water-header" v-if="feedEntry.params.phase">
            <span>Phase: {{getPhase(feedEntry.params.phase)}}</span>
        </div>

        <div class="feed-entry-nutrient-cards">
            <div class="feed-entry-nutrient-content">
                <span>Water quantity</span>
                <span class="feed-entry-nutrient-volume">{{feedEntry.params.volume}} L</span>
            </div>
            <div class="feed-entry-nutrient-content" v-if="feedEntry.params.ph">
                <span>PH</span>
                <span class="feed-entry-nutrient-volume">{{feedEntry.params.ph}}</span>
            </div>
            <div class="feed-entry-nutrient-content" v-if="feedEntry.params.ec">
                <span>EC</span>
                <span class="feed-entry-nutrient-volume">{{feedEntry.params.ec}}</span>
            </div>
            <div class="feed-entry-nutrient-content" v-if="feedEntry.params.tds">
                <span>TDS</span>
                <span class="feed-entry-nutrient-volume">{{feedEntry.params.tds}}</span>
            </div>
            <div class="feed-entry-nutrient-content" v-for="nutrient in feedEntry.params.nutrientProducts">
                <span>{{nutrient.product.name}}</span>
            <span class="feed-entry-nutrient-volume">{{nutrient.quantity}} {{nutrient.unit}}</span>
        </div>
        </div>
        <p v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
    </div>
</template>

<script>
    export default {
        name: "feed-entry-nutrient-mix",
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        methods: {
            getPhase(phase) {
                switch(phase) {
                    case "EARLY_VEG":
                        return "Early veg";
                    case "MID_VEG":
                        return "Mid veg";
                    case "LATE_VEG":
                        return "Late veg";
                    case "EARLY_BLOOM":
                        return "Early bloom";
                    case "LATE_BLOOM":
                        return "Late bloom";
                    case "MID_BLOOM":
                        return "Mid bloom";
                    default:
                        return phase;
                }
            }
        }
    }
</script>

<style scoped>
    .feed-entry-nutrient-wrapper {

    }

    .feed-entry-water-header {
        display: flex;
        justify-content: flex-end;
        color: gray;
        margin-bottom: 10px;
        padding: 0 20px;
    }

    .feed-entry-nutrient-content {
        width: 150px;
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 90px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        margin: 10px;
    }

    .feed-entry-nutrient-volume {
        font-size: 25px;
        display: block;
        margin-top: 15px;
    }

    p {
        padding: 10px 15px;
        text-align: left;
    }

    .feed-entry-nutrient-cards {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
    }

</style>
