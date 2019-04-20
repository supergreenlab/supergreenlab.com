<template>
  <section :id='$style.container'>
    <div :id='$style.image'>
      <img :src='require(`~/assets/img/${image}`)' />
    </div>
    <div :id='$style.body'>
      <h4>{{ title }}</h4>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: ['image', 'title',],
}
</script>

<style module lang=stylus>

#container
  display: flex
  margin: 20pt 0

#image
  display: flex
  align-items: center
  justify-content: center
  width: 100pt

#image > img
  margin-right: 20pt


#body > h4
  margin-bottom: 10pt
  font-weight: 400
  font-size: 1.1em

</style>
