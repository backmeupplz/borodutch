<template lang="pug">
  v-card
    center
      v-avatar.ma-2(:size='150')
        img(src="/images/avatar.jpg")
      .display-1 Nikita Kolmogorov
      .subheading
        a(href="https://t.me/borodutch") Telegram
        | , 
        a(href="https://m.me/borodutch") Facebook
        | , 
        a(href="https://linkedin.com/in/nikitakolmogorov") LinkedIn
        | , 
        a(href="https://vk.com/borodutch") VK
        | , 
        a(href="mailto:n@borodutch.com") Email
    v-card-text
      p Hi there! My name is Nikita and I'm a serial product launcher. I'm half a developer, half an entrepreneur. If I can build something quick and efficient, I build it myself — if I cannot (whether I'm not at the right level of expertise or just don't have time) I delegate tasks to my trusted list of contractors.
      p I started as an iOS developer but over the years I've mastered backend, frontend, Android, React Native development; as well as management, hiring, consulting, public speaking and a variety of other soft skills. My favorite stack at this time is Node + TypeScript + Koa + Mongo on backend, Vue + TypeScript + Vuetify on frontend, React Native on Mobile, Node + Telegraf.js for Telegram bots.
      p Please, find my contacts, the list of the products I'm most proud of with some of their stats as well as the list of publications on this page. Cheers!
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Profile extends Vue {}
</script>
