<template>
  <section :id='$style.section'>
    <div :id='$style.title'>
      <h4>Bare Led panels</h4> -&nbsp;<span :id='$style.level'>Beginner</span>&nbsp;- from $89
    </div>
    <div :id='$style.pics'>
      <!--<div :class='$style.pic' :id='$style.pic36'>
        <div :class='$style.picdiv' :id='$style.picdiv36'></div>
        <div :class='$style.subtitle'>
          36 leds - <b>$24.99</b>
        </div>
      </div>
      <div :class='$style.pic' :id='$style.pic72'>
        <div :class='$style.picdiv' :id='$style.picdiv72'></div>
        <div :class='$style.subtitle'>
          72 leds - <b>$34.99</b>
        </div>
      </div>-->
      <div :class='$style.pic' :id='$style.pic144'>
        <div :class='$style.picdiv' :id='$style.picdiv144'></div>
        <div :class='$style.subtitle'>
          144 leds - <b>$89</b><br />
          <small :class='$style.green'>power supply included</small>
        </div>
      </div>
      <div :class='$style.pic' :id='$style.pic288'>
        <div :class='$style.picdiv' :id='$style.picdiv288'></div>
        <div :class='$style.subtitle'>
          288 leds - <b>$99</b><br />
          <small :class='$style.red'>power supply NOT included</small>
        </div>
      </div>
    </div>
    <div :id='$style.description'>
      <p>
        This is where to go if you’re looking for a cheap but effective solution to start with, or if you want to upgrade your existing setup.
      </p>
      <p>
        <b>Features:</b>
        <ul :id='$style.firstul'>
          <li>- Full spectrum</li>
          <li>- 2 different sizes:</li>
          <li>
            <ul>
              <!--<li>- <b>36 leds</b>: 130x110mm (5.1x4.3 in)   <span :class='$style.green'>power supply included*</span></li>
              <li>- <b>72 leds</b>: 250x110mm (9.8x4.3 in)   <span :class='$style.green'>power supply included*</span></li>-->
              <li>- <b>144 leds</b>: 250x230mm (9.8x9 in)    <span :class='$style.green'>power supply included</span></li>
              <li>- <b>288 leds</b>: 350x250mm (13.8x9.8 in) <span :class='$style.red'>power supply NOT included</span></li>
            </ul>
          </li>
          <li>- <b>Large aluminium panel</b> for better light <b>repartition</b>, <b>no need</b> for lens or heat dissipator</li>
          <li>- Stays <b>cool at max power</b>, perfect for <b>tight spaces</b>, no need for a <b>huge tent anymore</b></li>
          <li>- Available in <b>black</b> or <b>white</b></li>
        </ul>
      </p>
    </div>
    <a :id='$style.cta' v-on:click='setController(false)'>Go to designer</a>
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

.subtitle
  text-align: center

#level
  color: #3AB20B
  font-weight: 600

#pics
  display: flex
  justify-content: center
  flex-wrap: wrap
  align-items: center
  margin: 10pt 0
  white-space: nowrap

.pic
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 0 10pt

.picdiv
  height: 200pt
  width: 100%
  background-position: bottom
  background-size: contain
  background-repeat: no-repeat

#pic36
  flex-basis: 70px

#picdiv36
  background-image: url('~assets/img/intro-36-small.png')
  max-width: 70px

#pic72
  flex-basis: 140px

#picdiv72
  background-image: url('~assets/img/intro-72-small.png')
  max-width: 140px

#pic144
  flex-basis: 206px

#picdiv144
  background-image: url('~assets/img/intro-144-small.png')
  max-width: 206px

#pic288
  flex-basis: 233px

#picdiv288
  background-image: url('~assets/img/intro-288-small.png')
  max-width: 233px

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
