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
    <div>
        <!-- TODO: "Timer mode", if required
        <div  class="feed-entry-ventilation-header">
            Timer mode
        </div>
         -->

        <div class="feed-entry-ventilation-content" v-if="feedEntry.params.values">
            <div class="feed-entry-ventilation-card">
                <span class="feed-entry-ventilation-settings">
                    <img class="feed-entry-ventilation-icon" :src="require('~/assets/img/feed_card/icon_blower.svg')" />
                    Night settings
                </span>
                <span class="feed-entry-ventilation-volume">{{feedEntry.params.values.blowerMin}}%</span>
            </div>
            <div class="feed-entry-ventilation-card">
                <span class="feed-entry-ventilation-settings">
                    <img class="feed-entry-ventilation-icon" :src="require('~/assets/img/feed_card/icon_blower.svg')" />
                    Day settings
                </span>
                <span class="feed-entry-ventilation-volume">{{feedEntry.params.values.blowerMax}}%</span>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "feed-entry-ventilation",
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

    .feed-entry-ventilation-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .feed-entry-ventilation-content {
        display: inline-flex;
    }

    .feed-entry-ventilation-card {
        width: 150px;
        margin: 5px;
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 90px;
        padding: 10px;
    }

    .feed-entry-ventilation-settings {
        display: flex;
        align-items: center;
    }

    .feed-entry-ventilation-icon {
        width: 20px;
        margin-right: 10px;
    }

    .feed-entry-ventilation-volume {
        font-size: 25px;
        display: block;
        margin-top: 15px;
    }
</style>
