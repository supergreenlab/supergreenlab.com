<template>
    <div class="feed-entry">
        <div class="feed-entry-header">
            <img class="feed-entry-header-image" :src="getHeaderIcon(feedEntry.type)">
            {{getFeedEntryHeading(feedEntry.type)}}
        </div>
        <div class="feed-entry-content">
            <feed-entry-light v-if="feedEntry.type === 'FE_LIGHT'" :feedEntry="feedEntry"></feed-entry-light>
            <feed-entry-water v-else-if="feedEntry.type === 'FE_WATER'" :feedEntry="feedEntry"></feed-entry-water>
            <feed-entry-media v-else-if="feedEntry.type === 'FE_MEDIA'" :feedEntry="feedEntry"></feed-entry-media>
            <feed-entry-life-event v-else-if="feedEntry.type === 'FE_LIFE_EVENT'" :feedEntry="feedEntry"></feed-entry-life-event>
            <feed-entry-ventilation v-else-if="feedEntry.type === 'FE_VENTILATION'" :feedEntry="feedEntry"></feed-entry-ventilation>
            <div v-else>UNKNOWN: {{feedEntry.type}}</div>
        </div>
        <div class="feed-entry-footer">
            <div class="feed-entry-footer-icon-container">
                <img class="feed-entry-footer-icon clickable" :src="require('~/assets/img/feed_card/button_like.png')" />
                <img class="feed-entry-footer-icon clickable" :src="require('~/assets/img/feed_card/button_comment.png')" />
                <img class="feed-entry-footer-icon clickable" :src="require('~/assets/img/feed_card/button_share.png')" />
                <img class="feed-entry-footer-icon flex-end clickable" :src="require('~/assets/img/feed_card/button_bookmark.png')" />
            </div>
            <div class="flex-start">{{getFormattedDate(feedEntry.date)}}</div>
        </div>
    </div>

</template>

<script>
    import FeedEntryLight from "./feed-entry-light";
    import FeedEntryWater from "./feed-entry-water";
    import FeedEntryMedia from "./feed-entry-media";
    import FeedEntryLifeEvent from "./feed-entry-life-event";
    import FeedEntryVentilation from "./feed-entry-ventilation";

    export default {
        name: "feed-entry",
        components: {
            FeedEntryVentilation, FeedEntryLifeEvent, FeedEntryMedia, FeedEntryWater, FeedEntryLight
        },
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        mounted() {
            if (this.feedEntry.params) {
                this.feedEntry.params = JSON.parse(this.feedEntry.params);
            }
        },
        methods: {
            getFeedEntryHeading(type) {
                switch(type){
                    case 'FE_LIGHT':
                        return 'Stretch control';
                    case 'FE_WATER':
                        return 'Watering';
                    case 'FE_MEDIA':
                        return 'Grow log';
                    case 'FE_LIFE_EVENT':
                        return 'Life event';
                    case 'FE_VENTILATION':
                        return 'Ventilation change';
                }
            },
            getHeaderIcon(type) {
                switch(type) {
                    case 'FE_LIGHT':
                        return require('~/assets/img/feed_card/icon_light.svg');
                    case 'FE_WATER':
                        return require('~/assets/img/feed_card/icon_watering.svg');
                    case 'FE_MEDIA':
                        return require('~/assets/img/feed_card/icon_media.svg');
                    case 'FE_LIFE_EVENT':
                        return require('~/assets/img/feed_card/icon_life_events.svg');
                    case 'FE_VENTILATION':
                        return require('~/assets/img/feed_card/icon_blower.svg');
                }
            },
            getFormattedDate(date) {
                date = new Date(date);
                return date.toDateString();
            }
        }
    }
</script>

<style scoped>
    .feed-entry {
        padding: 12px 0;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 5px;
        width: 450px;
    }

    .feed-entry-header {
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .feed-entry-header-image {
        margin-right: 10px;
    }

    .feed-entry-content {
        padding: 15px 0;
    }

    .feed-entry-footer {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
    }

    .feed-entry-footer-icon-container {
        display: flex;
    }

    .feed-entry-footer-icon {
        width: 25px;
        margin-right: 6px;
    }

    .flex-end {
        margin-right: 0;
        margin-left: auto;
    }

    .flex-start {
        margin-left: 0;
        margin-right: auto;
    }

    .clickable {
        cursor: pointer;
    }
</style>
