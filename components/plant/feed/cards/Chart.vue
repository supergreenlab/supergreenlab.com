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
      <BarChart
          :chart-options="options"
          :chart-data="data"
          :height='200'
          />
    </client-only>
  </section>
</template>

<script>
export default {
  props: ['plant', 'feedEntry',],
  data() {
    return {
      data: {
        datasets: [{
          type: 'line',
          label: 'Temp',
          borderColor: '#3bb30b',
          data: this.$props.feedEntry.meta.temperature.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          type: 'line',
          label: 'Humi',
          borderColor: '#0B8BB3',
          data: this.$props.feedEntry.meta.humidity.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          type: 'line',
          label: 'VPD',
          borderColor: '#B37A0B',
          data: this.$props.feedEntry.meta.vpd.map(te => ({
            x: new Date(te[0] * 1000),
            y: Math.min(te[1], 30),
          })),
        }, {
          type: 'line',
          label: 'Ventil',
          borderColor: '#0BB3A9',
          data: this.$props.feedEntry.meta.ventilation.map(te => ({
            x: new Date(te[0] * 1000),
            y: te[1],
          })),
        }, {
          type: 'line',
          label: 'Dim',
          borderColor: '#B0B30B',
          data: this.$props.feedEntry.meta.timer.map((te, i) => {
            const dimmings = this.$props.feedEntry.meta.dimming.reduce((acc, dimming) => {
              if (dimming[i] && dimming[i][1]) {
                acc.push(dimming[i][1])
              }
              return acc
            }, [])
            const avgDimmings = dimmings.reduce((acc, d) => acc+d, 0) / dimmings.length
            return ({
              x: new Date(te[0] * 1000),
              y: te[1] * avgDimmings / 100,
            })
          }),
        }, {
          type: 'bar',
          label: 'Today',
          backgroundColor: '#CD3520',
          data: [
            {x: new Date(this.$props.feedEntry.date), y: 100}
          ],
          maxBarThickness: 2,
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
            type: 'timeseries',
            ticks: {
              source:'data',
              callback: (value, index, ticks) => {
                const plant = this.$props.plant
                const entry = this.$props.feedEntry
                const date = new Date(ticks[index].value)
                if (plant.settings.curingStart && date > new Date(plant.settings.curingStart)) {
                  const durationDays = Math.floor((date - new Date(plant.settings.curingStart)) / (1000 * 60 * 60 * 24))
                  if (durationDays == 0) {
                    return `1st day curing`
                  } else if(durationDays < 7) {
                    return `Cur. day ${durationDays}`
                  } else {
                    return `Cur. w ${Math.floor(durationDays / 7) + 1} d ${durationDays % 7 + 1}`
                  }
                } else if (plant.settings.dryingStart && date > new Date(plant.settings.dryingStart)) {
                  const durationDays = Math.floor((date - new Date(plant.settings.dryingStart)) / (1000 * 60 * 60 * 24))
                  if (durationDays == 0) {
                    return `1st day drying`
                  } else if(durationDays < 7) {
                    return `Dry. d ${durationDays}`
                  } else {
                    return `Dry. w ${Math.floor(durationDays / 7) + 1} d ${durationDays % 7 + 1}`
                  }
                } else if (plant.settings.bloomingStart && date > new Date(plant.settings.bloomingStart)) {
                  const durationDays = Math.floor((date - new Date(plant.settings.bloomingStart)) / (1000 * 60 * 60 * 24))
                  if (durationDays == 0) {
                    return `1st day bloom`
                  } else if(durationDays < 7) {
                    return `Bloom. d ${durationDays}`
                  } else {
                    return `Bloom. w ${Math.floor(durationDays / 7) + 1} d ${durationDays % 7 + 1}`
                  }
                } else if (plant.settings.veggingStart && date > new Date(plant.settings.veggingStart)) {
                  const durationDays = Math.floor((date - new Date(plant.settings.veggingStart)) / (1000 * 60 * 60 * 24))
                  if (durationDays == 0) {
                    return `1st day veg`
                  } else if(durationDays < 7) {
                    return `Veg. d ${durationDays}`
                  } else {
                    return `Veg. w ${Math.floor(durationDays / 7) + 1} d ${durationDays % 7 + 1}`
                  }
                } else if (plant.settings.germinationDate && date > new Date(plant.settings.germinationDate)) {
                  const durationDays = Math.floor((date - new Date(plant.settings.germinationDate)) / (1000 * 60 * 60 * 24))
                  if (durationDays == 0) {
                    return `Germination!`
                  } else {
                    return `Germ. ${durationDays} days ago`
                  }
                }

                const nd = date
                return nd.toLocaleDateString();
              }
            }
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
