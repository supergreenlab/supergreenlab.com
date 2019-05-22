<template>
  <section :id='$style.section'>
    <div :id='$style.title'>
      <h4>The Continuous Supply Setup</h4>&nbsp;-&nbsp;<span :id='$style.level'>Advanced</span>&nbsp;- from $149
    </div>
    <div :id='$style.pics'>
      <div :class='$style.picdiv'></div>
    </div>
    <div :id='$style.description'>
      <p>
        And finally, the continuous supply setup ! Once you’ll have a few runs under your belt, you’ll want to reach continuous supply, which means starting a new grow before the one before ends. 
      </p>
      <p>
        SuperGreenLab has developed the SuperGreenController just for that.
      </p>
      <p>
        It can be mixed with all kinds of leds, even from other manufacturers*.
      </p>
      <p>
        If you already own SuperGreenLeds, they’re all compatible except the Solo.<br />
        The 36 and 72 can even be powered directly from the SuperGreenController, no need for all these wires !
      </p>
      <p>
        <b>Features:</b>
        <ul :id='$style.firstul'>
          <p>- Full spectrum</p>
          <p>- Power supply included</p>
          <p>- Up to 3 temperature and humidity sensors (1 included)</p>
          <p>- 3 motor controllers, for ventilation and auto-watering (1 blower included)</p>
          <p>- SuperGreenController with wifi and bluetooth</p>
          <p>- Easy setup with the app</p>
          <p>- Control up to 3 separate grow spaces.</p>
          <p>- Can power your 36 and 72 SuperGreenLeds (up to 144 leds total)</p>
          <p>- Monitoring alerts, for when things fo wrong.</p>
        </ul>
      </p>
    </div>
    <nuxt-link :id='$style.cta' to='/designer/box'>Go to designer</nuxt-link>
  </section>
</template>

<script>
export default {
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

#cta:hover
  background-color: #2C800B

</style>
