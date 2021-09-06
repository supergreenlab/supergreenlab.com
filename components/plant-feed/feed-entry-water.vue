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
