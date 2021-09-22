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
    <img width='20pt' height='20pt' src='~/assets/img/icon_search.svg' />
    <input v-model="value" @keypress.native='listenEscape' :placeholder="placeholder">
    <img :id='$style.clear' @click="clear()" width='20pt' height='20pt' src='~/assets/img/icon_clear.svg' />
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
    clear() {
      this.value = ''
    },
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
    listenEscape() {
      this.value = ''
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  transition: all 0.6s ease 0s
  background-color: rgba(255, 255, 255, 0.8)

#container > input
  font-size: 1em
  width: 100%
  padding: 5pt
  margin: 5pt 0
  border: 1px solid #D8D8D8
  border-radius: 3pt

#container > input:hover
  border: 1px solid #B4B4B4

#container > img
  margin: 5pt

#clear
  cursor: pointer

</style>
