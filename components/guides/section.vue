<!--
      Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
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
    <component :is='componentForSection' :index='index' :guide='guide' :guideSection='guideSection'></component>
  </section>
</template>

<script>
import GuideSection from '~/components/guides/guidesection.vue'
import Group from '~/components/guides/diary/group.vue'
import Watering from '~/components/guides/diary/watering.vue'
import LifeEvent from '~/components/guides/diary/lifeevent.vue'
import Schedule from '~/components/guides/diary/schedule.vue'

const componentsForType = {
  'FE_WATER': Watering,
  'FE_LIFE_EVENT': LifeEvent,
  'FE_SCHEDULE': Schedule,
}

export default {
  props: [ 'index', 'guide', 'guideSection', ],
  components: {},
  computed: {
    componentForSection() {
      const section = this.$props.guideSection
      if (this.$props.guide.diary) {
        if (section.grouped) {
          return Group
        } else if (section.entry && componentsForType[section.entry.type]) {
          return componentsForType[section.entry.type]
        }
      }
      return GuideSection
    }
  },
}
</script>

<style module lang=stylus>

#container {
}

</style>
