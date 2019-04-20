<template>
  <section :id='$style.container'>
    <h3>Box #{{ i }}</h3>
    <div :id='$style.empty'>
      No light selected for this box yet.
      <nuxt-link :id='$style.create' to='/box'>Create box</nuxt-link>
    </div>
    <div v-if='enabled == "false"' :id='$style.disabled'></div>
  </section>
</template>

<script>
export default {
  props: ['i', 'enabled'],
}
</script>

<style module lang=stylus>

#container
  position: relative
  display: flex
  flex-direction: column

#logo
  margin: 5pt
  font-size: 1.2em
  align-self: start

#empty
  display: flex
  flex-direction: column
  align-items: start
  justify-content: center
  padding: 30pt 0

#create
  display: flex
  flex-direction: column
  color: white
  background-color: #3BB30B
  margin: 20pt 0 25pt 0
  padding: 5pt 35pt
  border-radius: 5pt
  text-decoration: none
  text-align: center
  font-weight: 600

#create:hover
  background-color: #2C800B

#disabled
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.8)

</style>
