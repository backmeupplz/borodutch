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
        a(href="https://github.com/backmeupplz") GitHub
        | , 
        a(href="https://vk.com/borodutch") VK
        | , 
        a(href="mailto:n@borodutch.com") Email
    v-card-text
      p Hi there! My name is Nikita and I'm a serial product launcher. I'm half developer, half entrepreneur. If I can build something quick and efficient, I build it myself — if I cannot (whether I'm not at the right level of expertise or just don't have time) I delegate tasks to my trusted list of contractors.
      p I started as an iOS developer but over the years I've mastered backend, frontend, Android, React Native development; as well as management, hiring, consulting, public speaking and a variety of other soft skills. My favorite stack at this time is Node + TypeScript + Koa + Mongo on backend, Vue + TypeScript + Vuetify on frontend, React Native + Swift + Kotlin on Mobile, Node + TypeScript + Telegraf.js for Telegram bots.
      p My mission is to bring value to the people around me. If I see a pain point, I try to fix it as soon as possible. Aside from my main tech stack, programming languages I use include: Python, Ruby, Objective-C, Java, C, C++, Assembly, Bash, Groovy, Dart, JavaScript, Solidity and some R. I host all of my servers on dedicated instances in the cloud running various Linux distros (mainly Debian based). I build hardware solutions for fun based on Raspberry Pi's and connect whole bunch of random stuff to it's GPIO. Even though I favor Vue, I'm fluent with React and Angular. I'm fond of AI and ML as well as I've built multiple blockchain-based solutions. As per databases, I favor MongoDB (and PostgreSQL when it just has to be relational) on server and Realm locally. Always trying to be a step ahead of the current tech.
      p Please, find my contacts, the list of the products I'm most proud of with some of their stats as well as the list of publications on this page. Cheers!
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Profile extends Vue {}
</script>