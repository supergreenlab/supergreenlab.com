<template>
    <div class="plant_header" v-if="plant">
        <div class="plant_header_content">
            <h1>{{plant.name}}</h1>
            <div class="plant_header_data">
                <div>
                    <label>Strain name</label>
                    {{plant.settings.strain}}
                    <span>from
                <span class="green">{{plant.settings.seedBank}}</span>
              </span>
                </div>
                <div>
                    <label>Plant Type</label>
                    {{plant.settings.plantType}}
                </div>
                <div>
                    <label>Medium</label>
                    {{plant.settings.medium}}
                </div>
                <div>
                    <label>Lab dimensions</label>
                    {{plant.boxSettings.width}}x{{plant.boxSettings.height}}x{{plant.boxSettings.depth}}
                    {{plant.boxSettings.unit}}
                </div>
                <h3>Life event dates</h3>
                <div>
                    <label>Germination</label>
                    {{plant.settings.germinationDate ? getFormattedDate(plant.settings.germinationDate) : 'Not set'}}
                </div>
                <div>
                    <label>Vegging</label>
                    {{plant.settings.veggingStart ? getFormattedDate(plant.settings.veggingStart) : 'Not set'}}
                </div>
                <div>
                    <label>Blooming</label>
                    {{plant.settings.bloomingStart ? getFormattedDate(plant.settings.bloomingStart) :'Not set'}}
                </div>
                <div>
                    <label>
                        Drying
                    </label>
                    {{plant.settings.dryingStart ? getFormattedDate(plant.settings.dryingStart) : 'Not set'}}
                </div>
                <div>
                    <label>
                        Curing
                    </label>
                    {{plant.settings.curingStart ? getFormattedDate(plant.settings.curingStart) : 'Not set'}}
                </div>
                <h3>Toolbox</h3>
                <div>
                    <label>Seeds</label>
                    {{plant.settings.strain}} from {{plant.settings.seedbank}}
                </div>
                <div>
                    <label>Furniture</label>
                    {{plant.boxSettings.products[0].name}} by {{plant.boxSettings.products[0].specs.brand}}
                </div>
            </div>
            <img :src="`https://storage.supergreenlab.com${plant.thumbnailPath}`"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "plant-info",
        props: {
            plant: {
                type: Object,
                required: true,
                default: null
            }
        },
        methods: {
            getFormattedDate(date) {
                date = new Date(date);
                return date.toLocaleDateString();
            }
        }
    }
</script>

<style scoped>

    .plant_header {
        background-color: #3F51B5;
        color: white;
        width: 100%;
        margin-bottom: 10px;
        max-height: 400px;
    }

    .plant_header h1 {
        width: 100%
    }

    .plant_header_content {
        max-width: 970px;
        display: inline-flex;
        flex-flow: wrap;
        padding-bottom: 20px;
    }

    .plant_header_data {
        width: 50%;
        font-weight: 400;
        max-height: 328px;
        overflow: scroll;
        padding-bottom: 10px;
    }

    .plant_header_data div {
        margin-left: 0;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .plant_header_data label {
        text-decoration: none;
        text-transform: none;
        font-weight: unset;
        margin-top: 5px;
        margin-bottom: 0;
        text-align: left;
        margin-left: 0;
        font-size: 12px;
        padding-bottom: 0;
    }

    .plant_header_data h3 {
        text-align: left;
        margin-top: 15px;
        margin-bottom: -5px;
    }

    .plant_header img {
        max-height: 325px;
        padding: 5px;
        margin: 0 auto;
        margin-right: 0;
        max-width: 50%;
        display: flex;
        align-self: flex-start;
    }

    .green {
        color: #3bb30b;
        font-weight: bold;
    }

</style>
