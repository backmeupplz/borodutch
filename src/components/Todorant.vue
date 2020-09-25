<template lang="pug">
ProjectCard(
  title='Todorant',
  link='https://todorant.com',
  :numberOfUsers='numberOfUsers',
  :index='index',
  :chartsListData='chartsListData',
  :loading='!stats.todorant',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import ProjectCard from '@/components/ProjectCard.vue'
import { toSpaces } from '@/helpers/toSpaces'
import { createCloudflareData } from '@/helpers/createCloudflareData'
import { aggregateCount } from '@/helpers/aggregateCount'

const AppStore = namespace('AppStore')

@Component({
  components: { ProjectCard },
})
export default class Todorant extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Todorant is the only todo manager you will ever need again. It doesn\'t just help you to keep track of tasks, it manages them for you. Based on "Getting Things Done", "Willpower" and "Eat That Frog" books.',
      ],
      ['Users on Todorant created ', this.todoCount, ' todos.'],
    ]
  }

  get chartsListData() {
    return [
      createCloudflareData(
        this.color,
        this.stats.todorant ? this.stats.todorant.cloudflare : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new users',
        this.stats.todorant ? this.stats.todorant.db.userDaily : undefined
      ),
      aggregateCount(
        this.color,
        'Number of new todos',
        this.stats.todorant ? this.stats.todorant.db.todoDaily : undefined
      ),
    ]
  }

  get numberOfUsers() {
    return !this.stats ||
      !this.stats.userCountSeparate ||
      !this.stats.userCountSeparate.todorant
      ? 0
      : toSpaces(this.stats.userCountSeparate.todorant)
  }

  get todoCount() {
    return !this.stats || !this.stats.todorant
      ? 0
      : toSpaces(this.stats.todorant.db.todoCount)
  }
}
</script>
