<template>
  <section :id='$style.container'>
    <div :id='$style.logo'>
      <Logo subtitle='Growbox Designer' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.intro'>
        <h2>Growbox designer</h2>
        <p>
          We'll start by the main box.<br /><br />
            And then the veg box, which is optionnal, but allows to double the frequency of your harvests, so you can avoid having too much at once, but still have continuous supply.
        </p>
      </div>
      <Box i='1' />
      <Box i='2' enabled=false />
      <Box i='3' enabled=false />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/logo.vue'
import Box from '~/components/box.vue'

export default {
  components: { Logo, Box, },
}
</script>

<style module lang=stylus>

#container
  display: flex
  flex-direction: column
  min-height: 100vh

#logo
  margin: 5pt
  font-size: 1.2em
  align-self: start

#intro
  padding: 50pt 0
  font-weight: 300

#intro > h2
  margin: 40pt 0 40pt 0

#body
  padding: 0 30pt 0 30pt
  max-width: 600pt

</style>
