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
  <section :id="$style.container">
    <div :id="$style.spotlightcontainer">
      <h2 :id="$style.title" v-html='$md.render(config.title)'></h2>
      <div v-if='loading==false' :id='$style.plantcontainer'>
        <div :id='$style.pic'>
          <div :style='{"background-image": `url(https://storage.supergreenlab.com${plant.thumbnailPath})`}'></div>
        </div>
        <div :id='$style.description'>
          <div :id='$style.descriptionbody'>
            <h3>{{ plant.name }}</h3>
            <div v-html='$md.render(config.description)'></div>
          </div>
          <div :id='$style.button'>
          <a :id='$style.plantbutton' :href='`sglapp://supergreenlab.com/public/plant?id=${plant.id}`' target='_blank'>Open plant</a><br />
          <i><nuxt-link :id='$style.appbutton' to='/app' target='_blank'>Install app first</nuxt-link></i>
        </div>
        </div>
      </div>
      <div v-else :id='$style.loading'>
      <div :id='$style.loadingdiv'>
        <Loading label='Loading plant..' />
      </div>
    </div>
    </div>


    <!-- <div v-if='loading==false' :id='$style.plantcontainer'>
      <div :id='$style.pic' :style='{"background-image": `url(https://storage.supergreenlab.com${plant.thumbnailPath})`}'></div>
      <div :id='$style.description'>
        <div :id='$style.descriptionbody'>
          <h3>{{ plant.name }}</h3>
          <div v-html='$md.render(config.description)'></div>
        </div>
        <div :id='$style.button'>
          <a :id='$style.plantbutton' :href='`sglapp://supergreenlab.com/public/plant?id=${plant.id}`' target='_blank'>Open plant</a><br />
          <i><nuxt-link :id='$style.appbutton' to='/app' target='_blank'>Install app first</nuxt-link></i>
        </div>
      </div>
    </div>
    <div v-else :id='$style.loading'>
      <div :id='$style.loadingdiv'>
        <Loading label='Loading plant..' />
      </div>
    </div> -->
  </section>
</template>

<script>
import axios from 'axios'
import Loading from '~/components/widgets/loading.vue'

export default {
  props: ['config',],
  components: {Loading,},
  data() {
    return {
      plant: null,
      loading: true,
    }
  },
  async mounted() {
    const { plantid } = this.$props.config
    const { data: plant } = await axios.get(`https://api2.supergreenlab.com/public/plant/${plantid}`)
    this.$data.plant = plant
    this.$data.loading = false
  },
  methods: {
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center

#spotlightcontainer
  display:flex
  flex-direction: column

#title
  text-transform: uppercase
  font-weight: bold
  font-size: 2.5em
  margin-bottom: 10pt
  color: #5E5E5E

#plantcontainer
  width: 80%
  display: flex
  justify-content:center
  align-self : center

#pic
  height: 160pt

#pic > div
  width: 160pt
  height: 100%
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#description
  display: flex
  flex-direction: column
  margin: 0 10pt

#descriptionbody
  flex: 1

#descriptionbody strong
  color: #3BB30B
  font-weight: 600

#descriptionbody > h3
  color: #5E5E5E
  margin-bottom: 5pt

#button
  display: flex
  align-items: flex-end
  flex-direction: column

#plantbutton
  display: block
  background-color: #3bb30b
  text-align: center
  padding: 8pt 25pt
  border-radius: 5pt
  color: #ffffff
  text-decoration: none
  font-size: 1.2em
  margin: 4pt 0
  white-space: nowrap
  text-transform: uppercase
  font-weight: bold

#plantbutton:hover
  background-color: #2F880B



#appbutton
  color: #3bb30b
  font-weight: bold
  font-size: 1.2em

#loading
  display: flex
  align-items: center
  justify-content: center

#loadingdiv
  width: 50%
  height: 50%

</style>
