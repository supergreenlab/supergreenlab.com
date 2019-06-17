<template>
  <section :id='$style.section'>
    <div :id='$style.title'>
      <h4>Continuous Supply</h4>&nbsp;-&nbsp;<span :id='$style.level'>Advanced</span>&nbsp;- from ~ $249
    </div>
    <div :id='$style.pics'>
      <div :class='$style.picdiv'></div>
    </div>
    <div :id='$style.description'>
      <p>
        Once you’ll have a few runs under your belt, you’ll want to reach <b>continuous supply</b>, which means starting the <b>next grow before the one before ends</b>. 
      </p>
      <p>
        SuperGreenLab has developed the <b>SuperGreenController</b> just for that.
      </p>
      <p>
        If you already own SuperGreenLeds, they’re all compatible except the Solo.<br />
      </p>
      <p>
        <b>Introduces the 36 and 72 leds panels</b>, perfect for <b>veg</b> and <b>clone spaces</b>.<br />
        The 36 and 72 can even be powered directly from the SuperGreenController, <b>no need for all these power plugs !</b>
      </p>
      <p>
        <b>Features:</b>
        <ul :id='$style.firstul'>
          <li>- <b>Full spectrum</b></li>
          <li>- Power supply <b>included</b></li>
          <li>- <b>Up to 3</b> temperature and humidity <b>sensors</b> (1 included)</li>
          <li>- <b>3 motor controllers</b>, for ventilation and auto-watering (1 blower included)</li>
          <li>- SuperGreenController with wifi and bluetooth</li>
          <li>- <b>Easy setup</b> with the app</li>
          <li>- Control up to <b>3 separate grow spaces</b>.</li>
          <li>- <b>Can power your 36 and 72</b> SuperGreenLeds (up to 144 leds total)</li>
          <li>- <b>Monitoring alerts</b>, for when things fo wrong.</li>
        </ul>
      </p>
    </div>
    <a :id='$style.cta' v-on:click='setController(true)'>Go to designer</a>
  </section>
</template>

<script>
export default {
  methods: {
    setController(controller) {
      this.$store.commit('boxes/controller', {controller})
      this.$router.push('/designer/box')
    }
  }
}
</script>

<style module lang=stylus>

#section
  display: flex
  flex-direction: column

#section > #cta
  align-self: center

#title
  display: flex

#title > h4
  margin: 0 2pt 0 0

#level
  color: #3AB20B
  font-weight: 600

#pics
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 0 10pt
  white-space: nowrap

.picdiv
  height: 180pt
  width: 100%
  margin: 10pt 0
  background-size: contain
  background-repeat: no-repeat
  background-position: center
  background-image: url('~assets/img/intro-continuous-small.png')

@media only screen and (max-width: 500px)
  .picdiv
    height: 100pt


#description
  margin: 30pt 0 0 0

#description > p
  margin 8pt 0

#firstul
  margin: 0
  padding: 0

#description ul
  list-style-type: none

.green
  color: #3AB20B

.red
  color: #EA1E1E

#cta
  display: flex
  flex-direction: column
  color: white
  background-color: #3BB30B
  margin: 40pt 0
  padding: 5pt 35pt
  border-radius: 5pt
  text-decoration: none
  text-align: center
  font-size: 1.2em
  font-weight: 400
  cursor: pointer

#cta:hover
  background-color: #2C800B

</style>
