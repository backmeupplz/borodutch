<template lang="pug">
v-app
  v-container
    Profile
    v-row
      v-col.d-flex.flex-row.justify-space-between
        GradientText(:small='true') Projects
        ShowStatsButton(:click='toggleOpenClose') {{ allPanelsOpen ? "Collapse all" : "Expand all" }}
    v-row
      Voicy(:index='0')
    v-row
      Shieldy(:index='1')
    v-row
      Banofbot(:index='2')
    v-row
      Randym(:index='3')
    v-row
      Todorant(:index='4')
    v-row
      Feedr(:index='5')
    v-row
      GoldenBorodutch(:index='6')
    v-row
      CheckMyTextBot(:index='7')
    v-row
      TLGCoin(:index='8')
    v-row
      Borodutch(:index='9')
    v-row
      Temply(:index='10')
    v-row
      Arbeitbot(:index='11')
    v-row
      Localizer(:index='12')
    v-row
      PostYourStartup(:index='13')
    v-row
      MT(:index='14')
    v-row
      Fondu(:index='15')
    v-row
      Pleaseno(:index='16')
    v-row
      Resetbot(:index='17')
    v-row
      Fixsleep(:index='18')
    v-row.justify-center.mt-4
      .thank-you Thank you for scrolling!
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Profile from '@/components/Profile.vue'
import GradientText from '@/components/GradientText.vue'
import ShowStatsButton from '@/components/ShowStatsButton.vue'
import { namespace } from 'vuex-class'

import Voicy from '@/components/Voicy.vue'
import Shieldy from '@/components/Shieldy.vue'
import Banofbot from '@/components/Banofbot.vue'
import Randym from '@/components/Randym.vue'
import Todorant from '@/components/Todorant.vue'
import Feedr from '@/components/Feedr.vue'
import GoldenBorodutch from '@/components/GoldenBorodutch.vue'
import CheckMyTextBot from '@/components/CheckMyTextBot.vue'
import TLGCoin from '@/components/TLGCoin.vue'
import Borodutch from '@/components/Borodutch.vue'
import Temply from '@/components/Temply.vue'
import Arbeitbot from '@/components/Arbeitbot.vue'
import Localizer from '@/components/Localizer.vue'
import PostYourStartup from '@/components/PostYourStartup.vue'
import MT from '@/components/MT.vue'
import Fondu from '@/components/Fondu.vue'
import Pleaseno from '@/components/Pleaseno.vue'
import Resetbot from '@/components/Resetbot.vue'
import Fixsleep from '@/components/Fixsleep.vue'

const AppStore = namespace('AppStore')

const length = 19

@Component({
  components: {
    Profile,
    GradientText,
    ShowStatsButton,
    Voicy,
    Shieldy,
    Banofbot,
    Randym,
    Todorant,
    Feedr,
    GoldenBorodutch,
    CheckMyTextBot,
    TLGCoin,
    Borodutch,
    Temply,
    Arbeitbot,
    Localizer,
    PostYourStartup,
    MT,
    Fondu,
    Pleaseno,
    Resetbot,
    Fixsleep,
  },
})
export default class App extends Vue {
  @AppStore.State openPanels!: number[]

  @AppStore.Mutation openAllPanels!: (length: number) => void

  @AppStore.Mutation closeAllPanels!: () => void

  get allPanelsOpen() {
    return this.openPanels.length >= length
  }

  toggleOpenClose() {
    if (this.allPanelsOpen) {
      this.closeAllPanels()
    } else {
      this.openAllPanels(length)
    }
  }
}
</script>

<style>
* {
  font-family: Noto Sans;
}
.container {
  max-width: 1000px !important;
}
.container,
.v-application--wrap {
  background-color: black !important;
}
.thank-you {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.6;
}
</style>
