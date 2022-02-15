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
  <div :id="$style.container">
    <div :id="$style.header" v-if="feedEntry.params.phase">
      <span>Phase: {{phase(feedEntry.params.phase)}}</span>
    </div>

    <div :id="$style.cards">
      <div :class="$style.content">
        <span>Water quantity</span>
        <span :class="$style.value">{{feedEntry.params.volume}} L</span>
      </div>
      <div :class="$style.content" v-if="feedEntry.params.ph">
        <span>PH</span>
        <span :class="$style.value">{{feedEntry.params.ph}}</span>
      </div>
      <div :class="$style.content" v-if="feedEntry.params.ec">
        <span>EC</span>
        <span :class="$style.value">{{feedEntry.params.ec}}</span>
      </div>
      <div :class="$style.content" v-if="feedEntry.params.tds">
        <span>TDS</span>
        <span :class="$style.value">{{feedEntry.params.tds}}</span>
      </div>
      <div :class="$style.content" v-for="nutrient in feedEntry.params.nutrientProducts">
        <span>{{nutrient.product.name}}</span>
        <span :class="$style.value">{{nutrient.quantity}} {{nutrient.unit}}</span>
      </div>
    </div>
    <p :id='$style.message' v-if="feedEntry.params.message">{{feedEntry.params.message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    feedEntry: {
      type: Object,
      required: true,
      default: {}
    }
  },
  computed: {
    phase: () => (phase) => {
      switch (phase) {
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

<style module lang=stylus>

#container
  display: block

#header
  display: flex;
  justify-content: flex-end;
  color: gray;
  margin-bottom: 10px;
  padding: 0 20px;

.content
  width: 150px;
  border: 1px solid lightgray;
  border-radius: 5px;
  height: 90px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin: 10px;

.value
  font-size: 25px;
  display: block;
  margin-top: 15px;

#message
  padding: 10px 15px;
  text-align: left;

#cards
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;

</style>
