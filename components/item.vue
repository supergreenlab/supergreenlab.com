<template>
  <div :id='$style.item'>
    <div :id='$style.itempic' :style='{"background-image": `url(${require(`~/assets/img/${icon}`)})`}'></div>
    <div :id='$style.itemdescription'>
      <span :id='$style.itemname'>{{ name }}</span>
      <span :id='$style.itemn'>x<b>{{ n }}</b> = <b>{{ total }}</b></span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'name', 'n', 'total', ],
}
</script>

<style module lang=stylus>

#item
  display: flex
  width: 100%

#itempic
  flex: 0.6
  margin-right: 10pt
  background-position: center
  background-repeat: no-repeat
  background-size: contain

#itemdescription
  flex: 1
  display: flex
  flex-direction: column

#itemdescription > span
  margin: 5pt 0

#itemname
  font-size: 1.1em

#itemn
  font-size: 1em

#itemn > b:nth-of-type(2)
  font-weight: 600

</style>
