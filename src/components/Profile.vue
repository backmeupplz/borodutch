<template lang="pug">
div
  .username.ml-1 borodutch
  v-row
    v-col(:cols='$vuetify.breakpoint.lgAndUp ? undefined : 12')
      GradientText Nikita Kolmogorov
      .user-count
        span(v-if='numberOfUsers') {{ numberOfUsers }}
        Loader.rotate(v-else)
      .user-count-description people used my apps today
      .user-count-updated
        | Updated daily. Curious how I calculated this number? Check out the code
        | {{ " " }}
        Link(
          url='https://github.com/backmeupplz/borodutch-stats/blob/master/src/helpers/userCount.ts'
        ) here
        | . Careful: it's not the prettiest code I've written.
      .social-block
        v-btn(text, icon, href='https://t.me/borodutch', target='_blank')
          v-icon(:size='20') $telegram
        v-btn.social-button-margin(
          text,
          icon,
          href='https://m.me/borodutch',
          target='_blank'
        )
          v-icon(:size='20') $facebook
        v-btn.social-button-margin(
          text,
          icon,
          href='https://linkedin.com/in/nikitakolmogorov',
          target='_blank'
        )
          v-icon(:size='20') $linkedin
        v-btn.social-button-margin(
          text,
          icon,
          href='https://github.com/backmeupplz',
          target='_blank'
        )
          v-icon(:size='20') $github
        v-btn.social-button-margin(
          text,
          icon,
          href='https://vk.com/borodutch',
          target='_blank'
        )
          v-icon(:size='20') $vk
        v-btn.social-button-margin(
          text,
          icon,
          href='mailto:n@borodutch.com',
          target='_blank'
        )
          v-icon(:size='20') $email
    v-col.clips-subviews(:cols='$vuetify.breakpoint.lgAndUp ? undefined : 12')
      .avatar-container-container
        .avatar-container
          .circle(:style='circleExtraStyle')
          v-img(aspect-ratio='1', src='/images/avatar.png', max-height='100%')
          .fade
  v-row
    v-col
      GradientText(:small='true') My story
      .story
        p
          | Hi there! My name is Nikita and I'm a serial product launcher. I'm half developer, half entrepreneur. If I can build something quick and efficient, I build it myself — if I cannot (whether I'm not at the right level of expertise or just don't have time) I delegate tasks to my trusted list of contractors. In case if you want, you can always become a sponsor of my work on
          | {{ " " }}
          Link(url='https://github.com/sponsors/backmeupplz') my GitHub Sponsor profile
          | .
        p I started as an iOS developer but over the years I've mastered backend, frontend, Android, React Native development; as well as management, hiring, consulting, public speaking and a variety of other soft skills. My favorite stack at this time is Node + TypeScript + Koa + Mongo on backend, Vue + TypeScript + Vuetify on frontend, React Native + Swift + Kotlin on Mobile, Node + TypeScript + Telegraf.js for Telegram bots.
        .fade-text(v-if='!showMore')
        .show-more-button(v-if='!showMore', @click='showMore = true') Show more
        p(v-if='showMore') My mission is to bring value to the people around me. If I see a pain point, I try to fix it as soon as possible. Aside from my main tech stack, programming languages I use include: Python, Ruby, Objective-C, Java, C, C++, Assembly, Bash, Groovy, Dart, JavaScript, Solidity and some R. I host all of my servers on dedicated instances in the cloud running various Linux distros (mainly Debian based). I build hardware solutions for fun based on Raspberry Pi's and connect whole bunch of random stuff to it's GPIO. Even though I favor Vue, I'm fluent with React and Angular. I'm fond of AI and ML as well as I've built multiple blockchain-based solutions. As per databases, I favor MongoDB (and PostgreSQL when it just has to be relational) on server and Realm locally. Always trying to be a step ahead of the current tech.
        p(v-if='showMore') Please, find my contacts, the list of the products I'm most proud of with some of their stats as well as the list of publications on this page. Cheers!
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import GradientText from '@/components/GradientText.vue'
import Link from '@/components/Link.vue'
import Loader from '@/components/Loader.vue'
import { namespace } from 'vuex-class'
import { toSpaces } from '@/helpers/toSpaces'

const AppStore = namespace('AppStore')

@Component({
  components: { GradientText, Link, Loader },
})
export default class Profile extends Vue {
  @AppStore.State stats?: any
  @AppStore.State gradient!: string

  showMore = false

  get numberOfUsers() {
    return this.stats.userCount ? toSpaces(this.stats.userCount.count) : ''
  }

  get circleExtraStyle() {
    return `background: linear-gradient(${this.gradient});`
  }
}
</script>

<style scoped>
.username {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;

  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.6;
}
.justify-end {
  display: relative;
}
.avatar-container {
  position: relative;
  display: flex;

  flex-direction: row;
  justify-content: flex-end;

  padding: 0px 0px 100px 100px;
}
.fade {
  position: absolute;
  top: 0;
  bottom: 100px;
  left: 0;
  right: 0;
  background: linear-gradient(
    170deg,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 1) 90%
  );
}
.fade-text {
  position: absolute;
  top: 0;
  bottom: -10px;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 1) 100%
  );
  pointer-events: none;
}
.show-more-button {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 20px;
  color: white;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  opacity: 0.8;
}
.circle {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 100px;
  left: 100px;

  opacity: 0.8;
  border-radius: 50%;
}
.user-count {
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 54px;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.8;
}
.user-count-description {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 44px;

  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.5;
}
.user-count-updated {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.8;

  margin-top: 10px;
}
.social-block {
  margin-top: 15px;
}
.social-button-margin {
  margin-left: 10px;
}
.story {
  position: relative;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.01em;

  color: #ffffff;

  opacity: 0.8;
}
.clips-subviews {
  overflow: hidden;
}
@media only screen and (max-width: 800px) {
  .avatar-container-container {
    display: flex;
    justify-content: center;
  }
  .avatar-container {
    display: flex;

    max-width: 400px;

    padding: 0px 0px 0px 0px;

    height: 400px;
    min-width: 400px;
  }
  .circle {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .fade {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      170deg,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 1) 90%
    );
  }
  .social-block {
    display: flex;
    justify-content: center;
  }
}
</style>
