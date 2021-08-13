<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <div :class="$style.plant_header" v-if="plant">
    <div :class="$style.plant_header_content">
      <h1>{{ plant.name }}</h1>

      <div>
        <div :class="$style.slide">
          <div :class="$style.plant_header_data">
            <span :class="$style.data_entry_name">Strain name</span>
            <div :class="$style.data_entry_value_big">
              {{ plant.settings.strain }}
            </div>
            from
            <span :class="$style.green">{{ plant.settings.seedBank }}</span>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_plant_type.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">Plant Type</span>
                {{ plant.settings.plantType }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_medium.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">Medium</span>
                {{ plant.settings.medium }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_dimension.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">Lab dimensions</span>
                {{ plant.boxSettings.width }}x{{ plant.boxSettings.height }}x{{
                  plant.boxSettings.depth
                }}
                {{ plant.boxSettings.unit }}
              </div>
            </div>
                        <h3>Life event dates</h3>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="
                  require('~/assets/img/plant_infos/icon_germination_date.svg')
                "
              />
              <div>
                <span :class="$style.data_entry_name">Germination</span>
                {{
                  plant.settings.germinationDate
                    ? getFormattedDate(plant.settings.germinationDate)
                    : "Not set"
                }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="
                  require('~/assets/img/plant_infos/icon_vegging_since.svg')
                "
              />
              <div>
                <span :class="$style.data_entry_name">Vegging</span>
                {{
                  plant.settings.veggingStart
                    ? getFormattedDate(plant.settings.veggingStart)
                    : "Not set"
                }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="
                  require('~/assets/img/plant_infos/icon_blooming_since.svg')
                "
              />
              <div>
                <span :class="$style.data_entry_name">Blooming</span>
                {{
                  plant.settings.bloomingStart
                    ? getFormattedDate(plant.settings.bloomingStart)
                    : "Not set"
                }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_drying_since.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">
                  Drying
                </span>
                {{
                  plant.settings.dryingStart
                    ? getFormattedDate(plant.settings.dryingStart)
                    : "Not set"
                }}
              </div>
            </div>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_curing_since.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">
                  Curing
                </span>
                {{
                  plant.settings.curingStart
                    ? getFormattedDate(plant.settings.curingStart)
                    : "Not set"
                }}
              </div>
            </div>
                        <h3>Toolbox</h3>
            <div :class="$style.data_entry">
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_seed.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">Seeds</span>
                {{ plant.settings.strain }} from {{ plant.settings.seedbank }}
              </div>
            </div>
            <div
              :class="$style.data_entry"
              v-if="plant.boxSettings.products[0]"
            >
              <img
                :class="$style.data_icon"
                :src="require('~/assets/img/plant_infos/icon_furniture.svg')"
              />
              <div>
                <span :class="$style.data_entry_name">Furniture</span>
                {{ plant.boxSettings.products[0].name }} by
                {{ plant.boxSettings.products[0].specs.brand }}
              </div>
            </div>
          </div>
          <img
            :class="$style.plant_image"
            :src="`https://storage.supergreenlab.com${plant.thumbnailPath}`"
          />
        </div>
      </div>
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
};
</script>

<style module lang=stylus>

.plant_header
    background-color: #3F51B5
    color: white
    margin-bottom: 10px
    width: 100%;
    display: flex;
    justify-content: center;

.plant_header_content
    display: flex
    flex-direction: column

.slide
  display: flex
  align-items: center
  margin: 10pt


.plant_header_data
    font-weight: 400
    margin: 10pt
    text-align: left
    /* width: 150pt */
    @media only screen and (max-width: 800px)
      font-size: 10pt
      width: 100%
      max-height: 150pt;
      overflow-y: scroll;
      overflow-x: hidden;
      font-size: 10pt

.plant_header_data h3
    margin-bottom: -5px

.plant_header_data span
    margin-bottom: -5px
    font-weight: bold
    padding: 3px 0
    font-size: 18px

.plant_image
    margin: 5pt
    display: flex
    max-height: 400pt
    object-fit: cover
    @media only screen and (max-width: 800px)
      height: 120pt

.data_entry
    display: flex
    flex-direction: row
    align-items: center
    margin: 10px 0

.data_entry_name
    display: block
    text-decoration: none
    text-transform: none
    font-weight: unset
    font-size: 12px

.data_entry_value_big
    font-weight: bold
    padding: 3px 0
    font-size: 18px

.data_icon
    width: 34px
    margin-right: 5px

.green
    color: #3bb30b
    font-weight: bold
</style>
