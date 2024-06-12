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
    <div id='header_wrapper'>
      <div :id='$style.header'>
        <Header responsiveHide='true' />
      </div>
    </div>
    <div :id='$style.body'>
      <div :class='$style.title'>
        <SectionTitle title='Want to **delete your SGL account**?'
                      subtitle="No problem, here's how it's done:)"
                      center='true'
                      border='true'
                      nomargin='true'/>
      </div>

      <div :id='$style.steps'>
        <div :class='$style.step'>
          <div :class='$style.image'>
            <img src='~assets/img/delete_account/goto-settings.png' />
          </div>
          <div :class='$style.text'>
            <h2>1.</h2>
            First open the SGL app. Go to the settings tab, bottom right of the screen.
          </div>
        </div>

        <div :class='$style.step'>
          <div :class='$style.image'>
            <img src='~assets/img/delete_account/open-sgl-account.png' />
          </div>
          <div :class='$style.text'>
            <h2>2.</h2>
            Open the "SGL account" page.
          </div>
        </div>

        <div :class='$style.step'>
          <div :class='$style.image'>
            <img src='~assets/img/delete_account/request-delete-account.png' />
          </div>
          <div :class='$style.text'>
            <h2>3.</h2>
            If you are not logged in, please login first.
            Once logged in, tap the "Delete my account button" at the bottom of the screen.
          </div>
        </div>

        <div :class='$style.step'>
          <div :class='$style.image'>
            <img src='~assets/img/delete_account/login-again.png' />
          </div>
          <div :class='$style.text'>
            <h2>4.</h2>
            You will have to enter your credentials and confirm the captcha again.
          </div>
        </div>

        <div :class='$style.step'>
          <div :class='$style.done'>
            Done!
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </section>
</template>

<script>

import Header from '~/components/layout/header.vue'
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Footer from '~/components/layout/footer.vue'

export default {
  components: { Header, SectionTitle, Footer, },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh

#body
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  flex: 1
  margin-top: 90px

.done
  display: flex
  justify-content: center
  width: 100%
  margin: 30px 0
  font-size: 3em
  font-weight: bold

#steps
  margin: 40px 0

.step
  display: flex
  margin: 40px 0
  color: #454545
  @media only screen and (max-width: 900px)
    flex-direction: column

.image
  display: flex
  align-items: center
  justify-content: center
  margin: 0 40px
  @media only screen and (max-width: 900px)
    margin: 10px 0

.image > img
  height: 200px
  @media only screen and (max-width: 900px)
    height: 300px

.text
  max-width: 400px
  font-size: 1.2em
  margin: 0 20px
  @media only screen and (max-width: 900px)
    margin: 10px 30px

</style>
