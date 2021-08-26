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
    <input v-model="value" :placeholder="placeholder">
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

#container > input
  background-color: rgba(255,255,255,0.8)
  font-size: 1.2em
  border: 0.2pt solid black
  width: 100%
  border-radius: 3pt
  padding: 2pt 5pt
  margin: 5pt 10pt
  @media only screen and (max-width: 600px)
    width: 90%

#container > input:hover
  background-color: #e8e8e8



</style>
