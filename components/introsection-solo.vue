<template>
  <section :id='$style.section'>
    <div :id='$style.title'>
      <h4>The Solo board</h4> -&nbsp;<span :id='$style.level'>Intermediate</span>&nbsp;- from $149
    </div>
    <div :id='$style.pics'>
      <div :class='$style.picdiv'></div>
      <div :class='$style.subtitle'>
        192 leds - <b>$149</b>
      </div>
    </div>
    <div :id='$style.description'>
      <p>
        With it’s embedded computer with wifi and sensors, this unique led panel has everything you’ll need to start doing automatic and monitored grows.
        You’ll have an eye on your grow, no matter where you are.
      </p>
      <p>
        <b>Features:</b>
        <ul :id='$style.firstul'>
          <li>- Full spectrum</li>
          <li>- Power supply included</li>
          <li>- Temperature and humidity sensor included</li>
          <li>- Ventilation included</li>
          <li>- Embedded computer with wifi and bluetooth</li>
          <li>- Easy setup with the app</li>
        </ul>
      </p>
    </div>
    <a :id='$style.cta' href='https://shop.supergreenlab.com/products/sgb-192-301b'>Go to shop</a>
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
  background-image: url('~assets/img/intro-192-small.png')

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
