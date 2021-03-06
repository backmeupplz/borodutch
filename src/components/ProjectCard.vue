<template lang="pug">
.card-container
  .title-container
    .column
      .card-title
        span {{ title }}
        v-btn.ml-2(text, icon, color='grey', :href='link', target='_blank')
          v-icon(small) $arrow
      span.number-of-users(v-if='numberOfUsers') {{ numberOfUsers }} users
    ShowStatsButton(v-if='!noExtra', :click='expandOrCollapse') {{ isOpen ? "Hide stats" : "Show stats" }}
  .card-text
    DescriptionText(:data='descriptionText')
  div(v-show='isOpen')
    ChartsList(
      v-if='!!chartsListData',
      :data='chartsListData',
      :loading='loading'
    )
    div(v-if='publications && publications.length')
      .card-title.mt-8 Publications
      ul.list-color
        li(v-for='(publication, i) in publications', :key='i')
          Link(:url='publication.link') {{ publication.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Link from '@/components/Link.vue'
import ShowStatsButton from '@/components/ShowStatsButton.vue'
import { Prop, Watch } from 'vue-property-decorator'
import { Publication } from '@/models/Publication'
import { namespace } from 'vuex-class'
import ChartsList from '@/components/ChartsList.vue'
import DescriptionText from '@/components/DescriptionText.vue'

const AppStore = namespace('AppStore')

@Component({
  components: { Link, ShowStatsButton, ChartsList, DescriptionText },
})
export default class ProjectCard extends Vue {
  @Prop({ required: true }) index!: number
  @Prop({ required: true }) title!: string
  @Prop({ required: false }) numberOfUsers?: number
  @Prop({ required: true }) link!: string
  @Prop({ required: false }) publications?: Publication[]
  @Prop({ required: false }) noExtra?: boolean
  @Prop({ required: false }) chartsListData?: any[]
  @Prop({ required: false }) loading?: boolean
  @Prop({ required: false }) descriptionText?: any[]

  @AppStore.State openPanels!: number[]
  @AppStore.Mutation togglePanel!: (index: number) => void

  expandOrCollapse() {
    this.togglePanel(this.index)
  }

  get isOpen() {
    return this.openPanels.includes(this.index)
  }
}
</script>

<style>
.card-container {
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-sizing: border-box;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
  width: 100%;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-title {
  font-size: 28px;
  line-height: 33px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.9;
}
.card-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.8;
}
.list-color {
  color: white;
}
.column {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.number-of-users {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.5;
}
@media only screen and (max-width: 800px) {
  .card-container {
    padding: 12px;
    margin: 8px;
  }
}

@media only screen and (max-width: 450px) {
  .title-container {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
