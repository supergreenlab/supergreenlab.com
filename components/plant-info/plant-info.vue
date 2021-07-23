<template>
    <div class="plant_header" v-if="plant">
        <div class="plant_header_content">
            <h1>{{plant.name}}</h1>
            <div class="plant_header_data">
                <div>
                    <span class="data_entry_name">Strain name</span>
                    <div class="data_entry_value_big">{{plant.settings.strain}}</div>
                    from <span class="green">{{plant.settings.seedBank}}</span>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_plant_type.svg')"/>
                    <div>
                        <span class="data_entry_name">Plant Type</span>
                        {{plant.settings.plantType}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_medium.svg')"/>
                    <div>
                        <span class="data_entry_name">Medium</span>
                        {{plant.settings.medium}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_dimension.svg')"/>
                    <div>
                        <span class="data_entry_name">Lab dimensions</span>
                        {{plant.boxSettings.width}}x{{plant.boxSettings.height}}x{{plant.boxSettings.depth}}
                        {{plant.boxSettings.unit}}
                    </div>
                </div>
                <h3>Life event dates</h3>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_germination_date.svg')"/>
                    <div>
                        <span class="data_entry_name">Germination</span>
                        {{plant.settings.germinationDate ? getFormattedDate(plant.settings.germinationDate) : 'Not set'}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_vegging_since.svg')"/>
                    <div>
                        <span class="data_entry_name">Vegging</span>
                        {{plant.settings.veggingStart ? getFormattedDate(plant.settings.veggingStart) : 'Not set'}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_blooming_since.svg')"/>
                    <div>
                        <span class="data_entry_name">Blooming</span>
                        {{plant.settings.bloomingStart ? getFormattedDate(plant.settings.bloomingStart) :'Not set'}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_drying_since.svg')"/>
                    <div>
                        <span class="data_entry_name">
                            Drying
                        </span>
                        {{plant.settings.dryingStart ? getFormattedDate(plant.settings.dryingStart) : 'Not set'}}
                    </div>
                </div>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_curing_since.svg')"/>
                    <div>
                        <span class="data_entry_name">
                            Curing
                        </span>
                        {{plant.settings.curingStart ? getFormattedDate(plant.settings.curingStart) : 'Not set'}}
                    </div>
                </div>
                <h3>Toolbox</h3>
                <div class="data_entry">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_seed.svg')"/>
                    <div>
                        <span class="data_entry_name">Seeds</span>
                        {{plant.settings.strain}} from {{plant.settings.seedbank}}
                    </div>
                </div>
                <div class="data_entry" v-if="plant.boxSettings.products[0]">
                    <img class="data_icon" :src="require('~/assets/img/plant_infos/icon_furniture.svg')"/>
                    <div>
                        <span class="data_entry_name">Furniture</span>
                        {{plant.boxSettings.products[0].name}} by {{plant.boxSettings.products[0].specs.brand}}
                    </div>
                </div>
            </div>
            <img class="plant_image" :src="`https://storage.supergreenlab.com${plant.thumbnailPath}`"/>
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
        overflow-y: scroll;
        overflow-x: hidden;
        padding-bottom: 10px;
        text-align: left;
    }

    .plant_header_data h3 {
        text-align: left;
        margin-top: 15px;
        margin-bottom: -5px;
    }

    .plant_image {
        max-height: 325px;
        padding: 5px;
        margin: 0 auto;
        margin-right: 0;
        max-width: 50%;
        display: flex;
        align-self: flex-start;
    }

    .data_entry {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
    }

    .data_entry_name {
        display: block;
        text-decoration: none;
        text-transform: none;
        font-weight: unset;
        font-size: 12px;
    }

    .data_entry_value_big {
        font-weight: bold;
        padding: 3px 0;
        font-size: 18px;
    }

    .data_icon {
        width: 34px;
        margin-right: 5px;
    }

    .green {
        color: #3bb30b;
        font-weight: bold;
    }

</style>
