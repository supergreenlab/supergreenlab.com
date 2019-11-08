<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <section :id='$style.container'>
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>

      <h1>Cookie Policy for SuperGreenLab</h1>

      <p>This is the Cookie Policy for SuperGreenLab, accessible from https://www.supergreenlab.com</p>

      <p><strong>What Are Cookies</strong></p>

      <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

      <p>For more general information on cookies see the Wikipedia article on HTTP Cookies.</p>

      <p><strong>How We Use Cookies</strong></p>

      <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

      <p><strong>Disabling Cookies</strong></p>

      <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>

      <p><strong>The Cookies We Set</strong></p>

      <ul>




        <li>
          <p>Orders processing related cookies</p>
          <p>This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.</p>
        </li>


        <li>
          <p>Forms related cookies</p>
          <p>When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>
        </li>

        <li>
          <p>Site preferences cookies</p>
          <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
        </li>

      </ul>

      <p><strong>Third Party Cookies</strong></p>

      <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>

      <ul>

        <li>
          <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
          <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
        </li>
      </ul>

      <p><strong>More Information</strong></p>

      <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com">Cookies Policy Template Generator</a> and the <a href="https://www.webterms.org">WebTerms Generator</a>.</p>

      <p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>

      <ul>
        <li>Email: towelie@supergreenlab.com</li>

      </ul>
    </div>

  </section>

</template>

<script>
import Header from '~/components/header.vue'

export default {
  components: {Header,},
}
</script>

<style module lang=stylus>
#container
  display: flex
  flex-direction: column
  color: #5d5d5d

#body
  padding: 50pt 30pt 70pt 30pt
</style>
