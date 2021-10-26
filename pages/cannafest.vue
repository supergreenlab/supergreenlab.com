<!--
      Copyright (C) 2021  SuperGreenLab <towelie@supergreenlab.com>
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
    <Header responsiveHide='true' />
    <div class="typeform-widget" :id="$style.typeform" :onSubmit="onSubmit" data-url="https://form.typeform.com/to/mCr3Drhg?typeform-medium=embed-snippet" data-transparency="50" data-hide-headers=true data-hide-footer=true style="width: 100%; height: 100%;"></div>
  </section>
</template>

<script>
import Header from '~/components/layout/header.vue'

export default {
  components: { Header, },
  mounted() {
    setTimeout(() => {
      var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/";
      if(!gi.call(d,id)) {
        js=ce.call(d,"script");
        js.id=id;
        js.src=b+"embed.js";
        q=gt.call(d,"script")[0];
        q.parentNode.insertBefore(js,q)
      }
    }, 100)
  },
  methods: {
    onSubmit() {
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100vw
  height: 100vh
  flex-direction: column
  justify-content: center
  align-items: center

#typeform
  width: 100%
  height: 100%

</style>
