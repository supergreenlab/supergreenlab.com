<template>
    <div>
        {{getLifeEventLabel(feedEntry.params.phase)}}
    </div>
</template>

<script>
    export default {
        name: "feed-entry-life-event",
        props: ['feedEntry'],
        mounted() {
            if (this.feedEntry.params) {
                this.feedEntry.params = JSON.parse(this.feedEntry.params);
            }
        },
        methods: {
            getLifeEventLabel(phase) {
                switch(phase) {
                    case 'BLOOMING':
                        return 'Blooming started!';
                    case 'VEGGING':
                        return 'Vegging started!';
                    case 'GERMINATING':
                        return 'Germination!';
                    default:
                        return phase;
                }
            }
        }
    }
</script>

<style scoped>

</style>
