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
    //- v-layout(row wrap)
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    //-       Voicy.ma-1
    //-       Shieldy.ma-1
    //-       Localizer.ma-1
    //-       PostYourStartup.ma-1
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    //-       GoldenBorodutch.ma-1
    //-       Todorant.ma-1
    //-       Feedr.ma-1
    //-       MT.ma-1
    //-       Fondu.ma-1
    //-       Pleaseno.ma-1
    //-       Resetbot.ma-1
    //-   v-flex(xs12 md4)
    //-     v-layout(column)
    //-       Banofbot.ma-1
    //-       Arbeitbot.ma-1
    //-       Temply.ma-1
    //-       Randym.ma-1
    //-       Borodutch.ma-1
    //-       CheckMyTextBot.ma-1
    //-       TLGCoin.ma-1
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Profile from '@/components/Profile.vue'
import GradientText from '@/components/GradientText.vue'
import ShowStatsButton from '@/components/ShowStatsButton.vue'
import Voicy from '@/components/Voicy.vue'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

const length = 1

@Component({
  components: {
    Profile,
    GradientText,
    ShowStatsButton,
    Voicy,
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
</style>
