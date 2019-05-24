<template>
  <section :id='$style.section'>
    <div :id='$style.title'>
      <h4>The Solo board</h4> -&nbsp;<span :id='$style.level'>Intermediate</span>&nbsp;- from $149
    </div>
    <div :id='$style.pics'>
      <div :class='$style.picdiv'></div>
      <div :class='$style.subtitle'>
        192 leds - <b>$149</b><br />
        <small :class='$style.green'>power supply included</small>
      </div>
    </div>
    <div :id='$style.description'>
      <p>
        With it’s <b>embedded computer</b> with wifi and <b>sensors</b>, this unique led panel has everything you’ll need to start doing <b>automatic</b> and <b>monitored grows</b>.
        You’ll have <b>an eye on your grow</b>, no matter where you are.
      </p>
      <p>
        <b>Features:</b>
        <ul :id='$style.firstul'>
          <li>- <b>Full spectrum</b></li>
          <li>- Power supply <b>included</b></li>
          <li>- Temperature and humidity sensor <b>included</b></li>
          <li>- Ventilation <b>included</b></li>
          <li>- <b>Embedded computer</b> with wifi and bluetooth</li>
          <li>- <b>Easy setup</b> with the app</li>
          <li>- <b>Monitoring alerts</b>, for when things fo wrong.</li>
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

.subtitle
  text-align: center

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
