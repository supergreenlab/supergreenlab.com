<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
  <section :id='$style.container'>
    <client-only placeholder="Loading...">
      <LineChart
          :chart-options="options"
          :chart-data="data"
          :height='200'
          />
    </client-only>
  </section>
</template>

<script>
export default {
  props: ['feedEntry',],
  data() {
    console.log(this.$props.feedEntry.meta)
    return {
      data: {
        datasets: [{
          label: 'Temp',
          borderColor: '#3bb30b',
          data: this.$props.feedEntry.meta.temperature.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          label: 'Humi',
          borderColor: '#0B8BB3',
          data: this.$props.feedEntry.meta.humidity.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          label: 'VPD',
          borderColor: '#B37A0B',
          data: this.$props.feedEntry.meta.vpd.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          label: 'Ventil',
          borderColor: '#0BB3A9',
          data: this.$props.feedEntry.meta.ventilation.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          label: 'Dim',
          borderColor: '#B0B30B',
          data: this.$props.feedEntry.meta.timer.map((te, i) => {
            return ({
              x: new Date(te[0] * 1000),
              y: te[1] * (this.$props.feedEntry.meta.dimming[i] || this.$props.feedEntry.meta.dimming[this.$props.feedEntry.meta.dimming.length-1])[0][1] / 100,
            })
          }),
        }],
      },
      options: {
        elements: {
          point:{
            radius: 0
          }
        },
        scales: {
          x: {
            type: 'linear',
          },
          y: {
            type: 'linear',
            beginAtZero: true,
          }
        },
      },
      plugins: [],
    };
  },
}
</script>

<style module lang=stylus>

#container {}

</style>
