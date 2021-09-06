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
    <div class="feed-entry-life-event">
        Flipped to {{(feedEntry.params.schedule)}}
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
        name: "feed-entry-schedule"
    }
</script>

<style scoped>
    .feed-entry-life-event {
        color: #15A01A;
        font-size: 35px;
        width: 206px;
        margin: auto;
    }
</style>
