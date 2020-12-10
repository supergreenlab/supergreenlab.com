<template>
  <section :id='$style.container'>
    <nuxt/>

    <transition name="popup">
      <Disclaimer v-if='showDisclaimer && this.$route.name != "cookies"' :onClose='closeDisclaimer' />
    </transition>

    <transition name="popup">
      <div v-if='promo' :id='$style.promo'>
        <h1>Promo code {{ promo.promocode }} activated !</h1>
        <h2>Enjoy your {{ promo.discount }}% off :)</h2>
      </div>
    </transition>

    <portal-target name='root'>
    </portal-target>
  </section>
</template>

<script>
import Disclaimer from '~/components/layout/overlay-major.vue'

export default {
  components: {Disclaimer,},
  data() {
    return {
      showDisclaimer: false,
    }
  },
  mounted() {
    if (!window.localStorage.getItem('disclaimerShown')) {
      this.$data.showDisclaimer = true
    }
  },
  computed: {
    promo() {
      const discount = this.$store.state.checkout.discount.value,
            promocode = this.$store.state.checkout.promocode.value
      if (!promocode || !discount) return ''
      return {promocode, discount}
    },
  },
  methods: {
    closeDisclaimer(ok) {
      if (ok) {
        this.$data.showDisclaimer = false
        window.localStorage.setItem('disclaimerShown', 1)
      } else {
        document.location.href='https://www.google.com'
      }
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
  z-index: 100
  position: fixed
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100vw
  bottom: 0
  background-color: #3BB30B
  color: white
  font-size: 0.7em
  padding: 5pt 0

#promo > h1
  margin: 0

</style>
