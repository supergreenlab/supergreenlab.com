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
    <div :id='$style.title'>
      <SectionTitle title='Proudly introducting:'
                    green='The SuperGreenLab App'
                    title2='Now on apple & android stores!' />
    </div>
    <div :id='$style.screens'>

      <div :class='$style.screen' :style='screen == 0 ? {"opacity": 1} : {"opacity": 0}'>
        <div :class='$style.previous' @click='previous'></div>
        <div :class='$style.screenpic' :id='$style.keeptrack'></div>
        <div :class='$style.screendesc'>
          <h2>Keep track of your grow</h2>
          <div>
            <b>Growing cannabis is simple;</b> all you need is love and rigor.<br />
            We know you love your plants; <u>we are here to help you take care of them 💚</u><br/><br />

            Imagine what it would be like to consistently <b>grow and enjoy</b> your own <b>homegrown cannabis</b> exactly how you like it - every. single. time.<br /><br />

            <u>Dense trichome covered nugs overflowing from your stash jar… forever.</u><br />
            Even if it’s your <b>first time growing</b> - green fingers <b>NOT</b> required!<br /><br />

            In beta, our Grow Assistant &amp; Diary app has <b>helped hundreds of SuperGreenLab growers</b> around the world <b>successfully grow, harvest, dry, cure</b>, and enjoy their own homegrown flower 🌼
            <u>Now we’re ready to help every grower out there 🌵</u>
          </div>
        </div>
        <div :class='$style.next' @click='next'></div>
      </div>

      <div :class='$style.screen' :style='screen == 1 ? {"opacity": 1} : {"opacity": 0}'>
        <div :class='$style.previous' @click='previous'></div>
        <div :class='$style.screenpic' :id='$style.recordactionsprogress'></div>
        <div :class='$style.screendesc'>
          <h2>Record your actions &amp; progress</h2>
          <div>
            <b>Ever wanted to travel back in time</b> to compare your current grow with the best you ever did?<br />
            <b>Keep track of your progress</b> and have a clear view of how your current grow <b>compares to previous ones</b>.<br />
            Take logs, pictures, measures, and document every action in your plant’s diary with the help of your Grow Assistant.<br /><br />

            No more guesswork; track metrics such as temperature, humidity, watering pH &amp; EC for accurate monitoring of your plant’s environment - stack the odds in your favor for consistent successful growing 👌<br /><br />
            Bonus for SGL bundle owners: temps/humidity measures, light/ventilation power are automatically recorded and graphed!
          </div>
        </div>
        <div :class='$style.next' @click='next'></div>
      </div>

      <div :class='$style.screen' :style='screen == 2 ? {"opacity": 1} : {"opacity": 0}'>
        <div :class='$style.previous' @click='previous'></div>
        <div :class='$style.screenpic' :id='$style.explore'></div>
        <div :class='$style.screendesc'>
          <h2>Learn directly from the Community</h2>
          <div>
            Want to know if the <b>grass is really greener</b> on the other side?<br /><br />

            <b>Explore and learn from other grower’s experiences</b> by checking out their grow diaries.<br />
            Ask questions and get feedback from the community - by learning from each other <b>we grow stronger</b> 💪
          </div>
        </div>
        <div :class='$style.next' @click='next'></div>
      </div>

      <div :class='$style.screen' :style='screen == 3 ? {"opacity": 1} : {"opacity": 0}'>
        <div :class='$style.previous' @click='previous'></div>
        <div :class='$style.screenpic' :id='$style.alerts'></div>
        <div :class='$style.screendesc'>
          <h2>Alerts & Reminders to prevent disasters</h2>
          <div>
            When <b>life gets busy</b> it’s easy to <b>forget to check up on your plants</b> or remember when the last watering was, even for someone with <b>many grows under their belt</b> (trust me, I know ^^).<br /><br />

            Live stress free knowing your <b>Grow Assistant has your back</b>!<br /><br />

            With the <b>optional SuperGreenLab controller/sensor combo</b> you can also get alerts when temperature or humidity shifts too much. Prevent issues <b>before they even happen</b>!
          </div>
        </div>
        <div :class='$style.next' @click='next'></div>
      </div>

    </div>
    <div :class='$style.stores'>
      Download <b>now</b>:<br />
      <a href='https://play.google.com/store/apps/details?id=com.supergreenlab.app2' target='_blank'><img src='~/assets/img/playstore.png' /></a>
      <a href='https://apps.apple.com/gb/app/supergreenlab-grow-assistant/id1502232318' target='_blank'><img src='~/assets/img/appstore.png' /></a>
    </div>

  </section>
</template>

<script>
import SectionTitle from '~/components/widgets/sectiontitle.vue'
import Step from '~/components/home/step.vue'

export default {
  components: { SectionTitle, Step, },
  data: () => ({
    screen: 0,
  }),
  methods: {
    previous() {
      const nScreens = this.$el.querySelectorAll(`.${this.$style.screen}`).length
      this.$data.screen = this.$data.screen-1 < 0 ? nScreens-1 : this.$data.screen-1
      console.log(this.$data.screen)
    },
    next() {
      const nScreens = this.$el.querySelectorAll(`.${this.$style.screen}`).length
      this.$data.screen = this.$data.screen+1 >= nScreens ? 0 : this.$data.screen+1
      console.log(this.$data.screen)
    },
  },
}

</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center

#title
  width: 100%

#screens
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around
  flex-wrap: wrap
  margin: 30pt 0 40pt 0
  max-width: 900pt
  height: 300pt
  @media only screen and (max-width: 600px)
    height: 500pt
    padding-top: 50pt

.screen
  position: absolute
  width: 600pt
  display: flex
  margin: 30pt 0 30pt 0
  transition: opacity 0.5s
  @media only screen and (max-width: 600px)
    width: 100%
    flex-direction: column

.screenpic
  width: 300pt
  height: 300pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  @media only screen and (max-width: 600px)
    height: 250pt

.screendesc
  display: flex
  flex-direction: column
  justify-content: center
  padding: 20pt
  color: #454545
  width: 100%

.screendesc b
  color: #3bb30b

.screendesc h2
  margin: 10pt 0
  color: #676767

#keeptrack
  background-image: url('~assets/img/app-keep-track.png')

#recordactionsprogress
  background-image: url('~assets/img/app-record-actions-progress.png')

#explore
  background-image: url('~assets/img/app-explore.png')

#alerts
  background-image: url('~assets/img/app-alerts-reminders.png')

.previous, .next
  position: absolute
  top: 50%
  width: 40pt
  height: 40pt
  background-position: center
  background-size: contain
  background-repeat: no-repeat
  cursor: pointer
  @media only screen and (max-width: 600px)
    top: 25%

.previous:hover, .next:hover
  opacity: 0.7

.previous:active, .next:active
  opacity: 0.5

.previous
  left: -50pt
  background-image: url('~assets/img/leftarrow.png')
  @media only screen and (max-width: 600px)
    left: 5pt

.next
  right: -50pt
  background-image: url('~assets/img/rightarrow.png')
  @media only screen and (max-width: 600px)
    right: 5pt

</style>
