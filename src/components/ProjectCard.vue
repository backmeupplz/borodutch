<template lang="pug">
  .card-container
    .title-container
      .column
        .card-title
          span {{title}}
          v-btn.ml-2(text icon color='grey' :href='link' target='_blank')
            v-icon(small) $arrow
        span.number-of-users(v-if='numberOfUsers') {{numberOfUsers}} users
      ShowStatsButton(:click='expand') Show stats
    .card-text
      slot(name='description')
    div(v-if='showMore')
      slot(name='charts')
      div(v-if='publications && publications.length')
        .card-title.mt-8 Publications
        ul.list-color
          li(v-for='(publication, i) in publications' :key='i')
            Link.link-opacity(:url='publication.link') {{publication.name}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Link from '@/components/Link.vue'
import ShowStatsButton from '@/components/ShowStatsButton.vue'
import { Prop } from 'vue-property-decorator'
import { Publication } from '@/models/Publication'

@Component({
  components: { Link, ShowStatsButton },
})
export default class ProjectCard extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: false }) numberOfUsers?: number
  @Prop({ required: true }) link!: string
  @Prop({ required: true }) publications!: Publication[]

  showMore = false

  expand() {
    this.showMore = !this.showMore
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
.link-opacity {
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

@media only screen and (max-width: 400px) {
  .title-container {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
