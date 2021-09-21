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
  <section :id='$style.container'>
    <div :id="$style.logosearch" :style='{"background-image": `url(${require(`~/assets/img/searchlogo.png`)})`}'></div>
    <input v-model="value" :placeholder="placeholder">
    <div :id="$style.btnerase" @click="value = '' ">Erase</div>
  </section>
</template>
<script>
import Fuse from 'fuse.js'
export default {
  name: 'VueFuse',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    defaultAll: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    fuseOpts: {
      type: Object,
      default: () => {},
    },
    mapResults: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      fuse: null,
      value: '',
      result: [],
    }
  },
  emits: ['fuse-input', 'fuse-results'],
  watch: {
    list () {
      if (this.fuse) {
        this.fuse.setCollection(this.list)
        this.fuseSearch()
      }
    },
    fuseOpts () {
      this.fuse.options = this.fuseOpts
      this.fuseSearch()
    },
    search () {
      this.value = this.search
    },
    value () {
      this.$emit('fuse-input', this.value)
      this.fuseSearch()
    },
    result () {
      this.$emit('fuse-results', this.result)
    },
  },
  mounted () {
    this.initFuse()
  },
  methods: {
    defaultAllList (list) {
      if (this.mapResults) {
        return list
      }
      return list.map((item, refIndex) => {
        return { item, refIndex }
      })
    },
    initFuse () {
      this.fuse = new Fuse(this.list, this.fuseOpts)
      if (this.defaultAll) {
        this.result = this.defaultAllList(this.list)
      }
      if (this.search) {
        this.value = this.search
      }
    },
    fuseSearch () {
      if (this.value.trim() === '') {
        if (this.defaultAll) {
          this.result = this.defaultAllList(this.list)
        } else {
          this.result = []
        }
      } else {
        const r = this.fuse.search(this.value.trim())
        this.result = this.mapResults ? r.map(r => r.item) : r
      }
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  border: 3px solid rgb(241, 243, 242)
  transition: all 0.6s ease 0s
  border-radius: 0

#container > input
  font-size: 1em
  width: 100%
  padding: 5pt
  @media only screen and (max-width: 600px)
    width: 90%

#container:hover
  border: 3px solid darkgrey

#logosearch
  padding: 0 15pt
  width: 25pt
  height: 15pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat

#btnerase
  padding: 5pt 15pt
  background-color: #f1f2f3
  border: 3px solid rgb(241, 243, 242)
  cursor: pointer
  color: #5e5e5e
  font-family: Roboto
  font-weight: bold

</style>
