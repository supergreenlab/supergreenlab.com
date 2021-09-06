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
