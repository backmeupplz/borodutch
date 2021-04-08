<template lang="pug">
ProjectCard(
  title='Borodutch Club',
  link='https://club.borodutch.com',
  :index='index',
  :noExtra='true',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { namespace } from 'vuex-class'
import { Prop } from 'vue-property-decorator'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Club extends Vue {
  @AppStore.State stats?: any

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'I tried joining many communities of people who launch their products to find the one where the quality of members is high. All of them start fine but then suffer from an influx of "wannabes".',
      ],
      [
        "So I decided to start my closed community of product people who love to launch MVP's quickly and try out various business hypotheses. As usual, both the ",
        {
          url: 'https://github.com/backmeupplz/borodutch-club',
          name: 'frontend',
        },
        ' and the ',
        {
          url: 'https://github.com/backmeupplz/borodutch-club-backend',
          name: 'backend',
        },
        ' are open source.',
      ],
    ]
  }
}
</script>
