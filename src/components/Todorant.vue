<template lang="pug">
ProjectCard(
  title='Todorant',
  link='https://todorant.com',
  :numberOfUsers='numberOfUsers',
  :index='4'
)
  div(slot='description')
    p Todorant is the only todo manager you will ever need again. It doesn't just help you to keep track of tasks, it manages them for you. Based on "Getting Things Done", "Willpower" and "Eat That Frog" books.
    p
      | Users on Todorant created
      | {{ " " }}
      span(v-if='todoCount') {{ todoCount }}
      Loader(v-else)
      | {{ " " }}
      | todos.
  div(slot='charts')
    v-row.flex-row.justify-center(v-show='!!stats.voicy')
      v-col(cols='12', md='6')
        BarChart(:chartData='cloudflareData')
      v-col(cols='12', md='6')
        BarChart(:chartData='userData')
      v-col(cols='12', md='6')
        BarChart(:chartData='todoData')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import ProjectCard from '@/components/ProjectCard.vue'
import BarChart from '@/components/BarChart.vue'
import Loader from '@/components/Loader.vue'
import Link from '@/components/Link.vue'
import { toSpaces } from '@/helpers/toSpaces'
import { emptyDataSet } from '@/helpers/emptyDataSet'
import { daysAgo } from '@/helpers/daysAgo'

const AppStore = namespace('AppStore')

@Component({
  components: { BarChart, ProjectCard, Loader, Link },
})
export default class Todorant extends Vue {
  @AppStore.State stats?: any
  @AppStore.State color!: string

  get numberOfUsers() {
    return this.stats.userCountSeparate && this.stats.userCountSeparate.todorant
      ? toSpaces(this.stats.userCountSeparate.todorant)
      : undefined
  }

  get todoCount() {
    return this.stats.todorant
      ? toSpaces(this.stats.todorant.db.todoCount)
      : undefined
  }

  get cloudflareData() {
    return !this.stats.todorant
      ? emptyDataSet
      : {
          labels: this.stats.todorant.cloudflare
            .map((a: any, i: number) => daysAgo(i))
            .reverse(),
          datasets: [
            {
              label: 'Number of todorant.com visits',
              backgroundColor: this.color,
              data: this.stats.todorant.cloudflare,
            },
          ],
        }
  }

  get userData() {
    return !this.stats.todorant
      ? emptyDataSet
      : {
          labels: this.stats.todorant.db.userDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new users',
              backgroundColor: this.color,
              data: this.stats.todorant.db.userDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
  get todoData() {
    return !this.stats.todorant
      ? emptyDataSet
      : {
          labels: this.stats.todorant.db.todoDaily
            .map((a: any) => daysAgo(a._id))
            .reverse(),
          datasets: [
            {
              label: 'Number of new todos',
              backgroundColor: this.color,
              data: this.stats.todorant.db.todoDaily
                .map((o: any) => o.count)
                .reverse(),
            },
          ],
        }
  }
}
</script>
