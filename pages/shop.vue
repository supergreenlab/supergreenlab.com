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
      <div :id='$style.header'>
        <Header/>
      </div>
      <div :id='$style.fullcontent'>
        <div :id='$style.leftcolumn'>
          <Banner/>
        </div>
        <div :id='$style.content'>

          <Banner/>
          <Newsletter/>
        </div>
        <div :id='$style.rightcolumn'>
          <Newsletter/>
        </div>
      </div>
  </section>
</template>

<script>
import Header from '~/components/shop/layout/header.vue'
import Banner from '~/components/shop/widgets/banner.vue'
import SideBar from '~/components/shop/layout/sidebar.vue'
import Newsletter from '~/components/shop/widgets/newsletter.vue'

export default{
  components: {Header, Banner, SideBar, Newsletter}
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#header
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 1000


#fullcontent
  display: flex
  justify-content: space-around
  height: 3000px
  width: 100%
  margin-top: 83px
  @media only screen and (max-width: 600px)
    display: flex
    justify-content: center

#content
  display: flex
  align-items: center
  flex-direction: column
  margin: 0px 220px
  width: 100%
  height: 100%
  background-color: grey
  @media only screen and (max-width: 600px)
    margin 20px 0px

#leftcolumn
  background-color: #E4E4E4
  position: fixed
  left: 0
  width: 220px
  height: 100%
  @media only screen and (max-width: 600px)
    display: none

#rightcolumn
  position: fixed
  right: 0
  background-color: #E4E4E4
  width: 220px
  height: 100%
  font-size: 0.7em
  @media only screen and (max-width: 600px)
    display: none


</style>
