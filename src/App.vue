<template lang="pug">
v-app
  v-container
    Profile
    v-row
      v-col.d-flex.flex-row.justify-space-between
        GradientText(:small='true') Projects
        ShowStatsButton(:click='toggleOpenClose') {{ allPanelsOpen ? "Collapse all" : "Expand all" }}
    v-row
      Voicy
    v-row
      Shieldy
    v-row
      Banofbot
    v-row
      Randym
    v-row
      Todorant
    v-row
      Feedr
    v-row
      GoldenBorodutch
    v-row
      CheckMyTextBot
    v-row
      TLGCoin
    v-row
      Borodutch
    v-row
      Temply
    v-row
      Arbeitbot
    v-row
      Localizer
    //- v-layout(row wrap)
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    //-       PostYourStartup.ma-1
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    //-       MT.ma-1
    //-       Fondu.ma-1
    //-       Pleaseno.ma-1
    //-       Resetbot.ma-1
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    v-row.justify-center.mt-4
      .thank-you Thank you for scrolling!
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Profile from '@/components/Profile.vue'
import GradientText from '@/components/GradientText.vue'
import ShowStatsButton from '@/components/ShowStatsButton.vue'
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
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

const length = 1

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
