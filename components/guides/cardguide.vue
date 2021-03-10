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
    <div :id="$style.guideimgcontainer" :style='{"background-position" : `center center`,"background-repeat" : `no-repeat`, "background-size" : `cover`,"background-image": `url(${require(`~/assets/img/${ guide.thumbnail.fileLarge }`)})`}'>
      <div :id="$style.guidelogo" >
        <img src="~assets/img/logoguidecard.png" alt="logo-supergreenlab">
      </div>
    </div>
    <div :id="$style.titlecontainer">
      <div :id="$style.title">
        <h2> {{ guide.name.substring(0, 7) }}<span :class="$style.green">{{ guide.name.substring(7, 50) }} </span></h2>
      </div>
      <div :id="$style.stepdonecontainer">
        <span :class="$style.green">{{ userStep }}</span>/{{ guide.sections.length }}<div :id="$style.stepdonestring">Steps Done</div>
      </div>
    </div>
    <p :id="$style.introduction"> {{ guide.text.substring(0, 93) }}...</p>
    <div :id="$style.readmorecontainer">
      <div :id="$style.readmorebtn">Read More</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['guide', 'userStep'],
}

</script>

<style module lang=stylus>
#container
 border: 3px solid #EFEFEF
 color: #5D5D5D
 @media only screen and (max-width: 1000pt)
  width: 300px
  height: 300px
  font-size: 0.8rem
 @media only screen and (max-width: 600pt)
  font-size: 0.8em
  width: 300px
  height: 300px

#guideimgcontainer
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 100%)
  display: flex
  justify-content: flex-end
  margin-top: 20px
  width: 100%
  height: 200px
  @media only screen and (max-width: 1000pt)
    height: 150px
  @media only screen and (max-width: 600pt)
    height: 150px

#guidelogo
  margin: 10px
  position: absolute

#titlecontainer
  display: flex
  justify-content: space-between
  align-items: center
  margin: 10px
  height: 38px
  @media only screen and (max-width: 1000pt)
    height: 24px
  @media only screen and (max-width: 600pt)
    height: 24px

#title
  font-weight: bold
  text-transform: capitalize

.green
  color: #3BB30B

#stepdonecontainer
  display: flex
  align-items: center
  font-size: 2.3em

#stepdonestring
  font-size: 0.5rem
  width 20px
  margin: 3px

#introduction
  height: 50px
  margin: 10px
  @media only screen and (max-width: 1000pt)
    margin-bottom: 0px
    height: 25px
    font-size: 0.8rem
  @media only screen and (max-width: 600pt)
    margin-bottom: 0px
    height: 25px
    font-size: 0.8rem

#readmorecontainer
  display: flex
  justify-content: flex-end
  margin: 10px
  @media only screen and (max-width: 1000pt)
    margint-bottom: 10px
  @media only screen and (max-width: 600pt)
    margint-bottom: 10px

#readmorebtn
  cursor: pointer
  text-align: center
  padding: 5px
  background-color: #3BB30B
  color: white
  text-transform: uppercase
  border-radius: 3px
  width: 150px

#readmorebtn:hover
  background-color: #2F880B

</style>
