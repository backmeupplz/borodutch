<template lang="pug">
ProjectCard(
  title='Dosu',
  link='https://dosu.app',
  :index='index',
  :noExtra='true',
  :descriptionText='descriptionText'
)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProjectCard from '@/components/ProjectCard.vue'
import { Prop } from 'vue-property-decorator'

@Component({
  components: { ProjectCard },
})
export default class Dosu extends Vue {
  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Pseudoanonymous platform to share your thoughts with the world. Secure, legal, free from hate speech. More info in the ',
        {
          url: 'https://invest.borodutch.com/55m-users-voicy-is-on-sale/',
          name: 'blog post',
        },
        '.',
      ],
    ]
  }
}
</script>
