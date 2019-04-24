<template>
  <section :id='$style.container'>
    <div :id='$style.pic'>
      <img :src='require(`~/assets/img/${icon}`)' />
    </div>
    {{ name }}
    <div :id='$style.n'>{{ n }}</div>
    <div :id='$style.price'>
      <div v-if='free' :id='$style.included'>Included</div>
      <div v-else-if='realtotal && total != realtotal' :id='$style.price'><span>${{ total }}</span> ${{ realtotal }}</div>
      <div v-else :id='$style.price'>${{ total }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['icon', 'name', 'n', 'total', 'realtotal', 'free']
}
</script>

<style module lang=stylus>

#container
  display: flex
  position: relative
  flex-direction: column
  align-items: center
  justify-content: space-around
  border: 1px solid #C4C4C4
  border-radius: 3pt
  text-align: center
  margin: 10pt 5pt
  flex-basis: 60pt
  padding: 5pt 5pt

#pic
  padding: 5pt 20pt

#pic > img
  flex: 1
  max-width: 50pt

#n
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  right: -5pt
  top: -5pt
  width: 20pt
  height: 20pt
  border: 1px solid #C4C4C4
  border-radius: 10pt
  background-color: white
  font-weight: 400

#price
  margin-top: 3pt
  font-weight: 600
  align-self: flex-end

#price > span
  text-decoration: line-through
  opacity: 0.3
  font-weight: 300

#included
  color: #3AB20B
  font-weight: 300

</style>
