<template>
    <div class="feed-entry-life-event">
        {{getLifeEventLabel(feedEntry.params.phase)}}
    </div>
</template>

<script>
    export default {
        name: "feed-entry-life-event",
        props: {
            feedEntry: {
                type: Object,
                required: true,
                default: {}
            }
        },
        methods: {
            getLifeEventLabel(phase) {
                switch(phase) {
                    case 'BLOOMING':
                        return 'Blooming Started!';
                    case 'VEGGING':
                        return 'Vegging Started!';
                    case 'GERMINATING':
                        return 'Germination!';
                    case 'CURING':
                            return 'Curing Started!';
                    case 'DRYING':
                        return 'Drying Started!';
                    default:
                        return phase;
                }
            }
        }
    }
</script>

<style scoped>
    .feed-entry-life-event {
        color: #15A01A;
        font-weight: bold;
        font-size: 35px;
        width: 206px;
        margin: auto;
    }
</style>
