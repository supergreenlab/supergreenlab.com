<template>
  <section :id='$style.container'>
    <div :id='$style.pic'>
      <img :src='require(`~/assets/img/${icon}`)' />
    </div>
    {{ name }}
    <div :id='$style.n'>{{ n }}</div>
    <div :id='$style.price'>
      <div v-if='free' :id='$style.included'>Included</div>
      <div v-else :id='$style.price'><small v-if='n > 1'>{{ n }} x ${{ price }} = </small>${{ n * price }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['icon', 'name', 'n', 'price', 'free']
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
  @media only screen and (max-width: 500px)
    flex-basis: 30pt

#pic
  padding: 5pt 20pt
  @media only screen and (max-width: 500px)
    padding: 3pt 5pt

#pic > img
  flex: 1
  max-width: 50pt
  @media only screen and (max-width: 500px)
    max-width: 40pt

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
  @media only screen and (max-width: 500px)
    right: -5pt
    top: -5pt
    width: 15pt
    height: 15pt
    border-radius: 7.5pt

#price
  margin-top: 3pt
  font-weight: 600
  align-self: flex-end
  white-space: nowrap

#price > small
  opacity: 0.3
  font-weight: 300

#included
  color: #3AB20B
  font-weight: 300

</style>
