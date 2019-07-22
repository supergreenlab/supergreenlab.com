<template>
  <section :id='$style.container'>
    <nuxt/>

    <transition name="popup">
      <div v-if='promo' :id='$style.promo'>
        <h1>Promo code {{ promo.promocode }} activated !</h1>
        <h2>Enjoy your {{ promo.discount }}% off :)</h2>
      </div>
    </transition>
  </section>
</template>

<script>
import { shopify } from '~/config.json'

export default {
  computed: {
    promo() {
      const { promos } = shopify,
            promocode = this.$store.state.checkout.promocode.value
      if (!promocode || !promos[promocode]) return ''
      return {promocode, discount: promos[promocode]}
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  justify-content: center
  background-color: white

#promo
  position: fixed
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%
  bottom: 0
  background-color: #3BB30B
  color: white
  font-size: 0.7em
  padding: 5pt 0

#promo > h1
  margin: 0

</style>
