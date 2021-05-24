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
          <SideBar/>
        </div>
        <div :id='$style.content'>
          <Banner/>
          <div :class='$style.title'>
            <SectionTitle title='Bundles'/>
          </div>
          <div :id='$style.bundles'>
            <div :class='$style.bundle' v-for='b in bundles' :key='b.id' :ref='b.slug'>
              <div :id='b.slug'></div>
              <Bundle :bundle='b' :showdescription='false' :showAll='false' />
            </div>
          </div>
          <div :class='$style.title'>
            <SectionTitle title='Spotlight'/>
          </div>
          <Spotlight/>
          <div :class='$style.title'>
            <SectionTitle title='Sgl Addons'/>
          </div>
          <!-- <div :class='$style.shop'>
           <ProductList ref='sgl-addons' :products='sglAddons' :center=true :maxItems=4 />
          </div> -->
          <Banner/>
          <div :class='$style.title'>
            <SectionTitle title='Growing pack'/>
          </div>
          <div :class='$style.pack'>
            <Pack />
          </div>
          <Newsletter/>
          <div :class='$style.title'>
            <SectionTitle title='SGL Products'/>
          </div>
          <div :class='$style.shop'>
           <ProductList :products='sglSpareParts' :center=true :maxItems=4 />
          </div>
          <div :class='$style.title'>
            <SectionTitle title='Furniture'/>
          </div>
          <div :class='$style.shop'>
            <ProductList ref='homepage-furniture' :products='furnitures' :center=true :maxItems=4 />
          </div>
          <div :class='$style.title'>
            <SectionTitle title='Tools'/>
          </div>
          <div :class='$style.shop'>
            <ProductList ref='homepage-tools' :products='tools' :center=true :maxItems=4 />
          </div>
          <Footer/>
        </div>
        <div :id='$style.rightcolumn'>
          <Newsletter/>
          <Banner/>
          <Banner/>
        </div>
      </div>
  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import TitleStep from '~/components/widgets/titlestep.vue'
import Footer from '~/components/layout/footer.vue'
import Header from '~/components/shop/layout/header.vue'
import Banner from '~/components/shop/widgets/banner.vue'
import SideBar from '~/components/shop/layout/sidebar.vue'
import Spotlight from '~/components/shop/layout/spotlight.vue'
import Newsletter from '~/components/shop/widgets/newsletter.vue'
import ProductList from '~/components/products/productlist.vue'
import Pack from '~/components/home/pack.vue'
import Bundle from '~/components/shop/layout/sectionbundles.vue'

export default{
  components: {TitleStep, SectionTitle ,ProductList, Bundle, Pack ,Footer, Header, Banner, SideBar, Newsletter, Spotlight},

  computed: {
    bundles() {
			return this.$store.getters['eshop/bundles']
		},
    sglSpareParts() {
      return this.$store.getters['eshop/leds'].concat(this.$store.getters['eshop/accessories'])
    },
    furnitures() {
      return this.$store.getters['eshop/collection']('homepage-furniture')
    },
    tools() {
      return this.$store.getters['eshop/productsWithTypes'](['TOOLS'])
    },
    sglAddons() {
      return this.$store.getters['eshop/collection']('sgl-addons')
    },
	},

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
  background-color: #fff
  @media only screen and (max-width: 1200px)
    margin 20px 0px

#leftcolumn
  display:flex
  flex-direction: column
  left: 0px
  position: fixed
  width: 220px
  height: 100%
  font-size: 0.7em
  @media only screen and (max-width: 1200px)
    display: none

#rightcolumn
  display:flex
  flex-direction: column
  right: 0px
  position: fixed
  width: 220px
  height: 100%
  font-size: 0.7em
  @media only screen and (max-width: 1200px)
    display: none


.shop
  display: flex
  width: 100%
  max-width: 900pt
  padding: 0 15pt

.pack
  width: 80%
  display: flex
  justify-content: center

#bundles
  display: flex
  justify-content: space-around
  align-items: center
  width: 100%
  @media only screen and (max-width: 600px)
    flex-direction: column

.bundle
  margin: 10px
  width: 100%
  /* max-width: 920pt */
  height: 100%
  /* border-radius: 10px
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  @media only screen and (max-width: 600px)
    width: 100%
    height: 100%

.title
  width: 100%
  margin: 20pt 0 20pt 0

</style>
