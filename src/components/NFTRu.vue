<template lang="pug">
ProjectCard(
  title='NFT ru',
  link='https://nft-ru.com',
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
export default class NFTRu extends Vue {
  @Prop({ required: true }) index!: number

  get descriptionText() {
    return [
      [
        'Community of Russian-speaking NFT project founders without wannabes and constant noise from cofounder-seekers.',
      ],
    ]
  }
}
</script>
