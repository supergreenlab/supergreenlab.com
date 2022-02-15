<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
  <div :id="$style.container" v-if="plant">
    <div :class="$style.content">
      <h1>{{plant.name}}</h1>
      <div :class="$style.data">
        <div>
          <span :class="$style.data_entry_name">Strain name</span>
          <div :class="$style.data_entry_value_big">{{plant.settings.strain}}</div>
          from <span :class="$style.green">{{plant.settings.seedBank}}</span>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_plant_type.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Plant Type</span>
            {{plant.settings.plantType}}
          </div>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_medium.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Medium</span>
            {{plant.settings.medium}}
          </div>
        </div>
        <div v-if='plant.boxSettings' :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_dimension.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Lab dimensions</span>
            {{plant.boxSettings.width}}x{{plant.boxSettings.height}}x{{plant.boxSettings.depth}}
            {{plant.boxSettings.unit}}
          </div>
        </div>
        <h3>Life event dates</h3>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_germination_date.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Germination</span>
            {{plant.settings.germinationDate ? formattedDate(plant.settings.germinationDate) : 'Not set'}}
          </div>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_vegging_since.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Vegging</span>
            {{plant.settings.veggingStart ? formattedDate(plant.settings.veggingStart) : 'Not set'}}
          </div>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_blooming_since.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Blooming</span>
            {{plant.settings.bloomingStart ? formattedDate(plant.settings.bloomingStart) :'Not set'}}
          </div>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_drying_since.svg')"/>
          <div>
            <span :class="$style.data_entry_name">
              Drying
            </span>
            {{plant.settings.dryingStart ? formattedDate(plant.settings.dryingStart) : 'Not set'}}
          </div>
        </div>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_curing_since.svg')"/>
          <div>
            <span :class="$style.data_entry_name">
              Curing
            </span>
            {{plant.settings.curingStart ? formattedDate(plant.settings.curingStart) : 'Not set'}}
          </div>
        </div>
        <h3>Toolbox</h3>
        <div :class="$style.data_entry">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_seed.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Seeds</span>
            {{plant.settings.strain}} from {{plant.settings.seedBank}}
          </div>
        </div>
        <div v-if='plant.boxSettings' :class="$style.data_entry" v-for="product in plant.boxSettings.products">
          <img :class="$style.data_icon" :src="require('~/assets/img/plant/infos/icon_furniture.svg')"/>
          <div>
            <span :class="$style.data_entry_name">Furniture</span>
            {{product.name}} by {{product.specs.brand}}
          </div>
        </div>
      </div>
      <img :class="$style.plant_image" :src="`https://storage.supergreenlab.com${plant.thumbnailPath}`"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plant: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    formattedDate: () => (date) => {
      date = new Date(date);
      return date.toLocaleDateString();
    }
  }
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  background-color: #3F51B5
  color: white
  width: 100%
  margin-bottom: 10px
  max-height: 400px

#container h1
  width: 100%

.content
  max-width: 970px
  display: inline-flex
  flex-flow: wrap
  padding-bottom: 20px

.data
  width: 50%
  font-weight: 400
  max-height: 328px
  overflow-y: scroll
  overflow-x: hidden
  padding-bottom: 10px
  text-align: left

.data h3
  text-align: left
  margin-top: 15px
  margin-bottom: -5px

.plant_image
  max-height: 325px
  padding: 5px
  margin: 0 auto
  margin-right: 0
  max-width: 50%
  display: flex
  align-self: flex-start

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
