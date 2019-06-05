<template lang="pug">
  v-app(dark)
    v-content
      v-container.pa-4
        Profile
        Voicy
        GoldenBorodutch
        Fondu
        Pleaseno
        Resetbot
        Borodutch
</template>

<script lang="ts">
// Dependencies
import Profile from "./components/Profile.vue";
import Fondu from "./components/Fondu.vue";
import Borodutch from "./components/Borodutch.vue";
import GoldenBorodutch from "./components/GoldenBorodutch.vue";
import Pleaseno from "./components/Pleaseno.vue";
import Resetbot from "./components/Resetbot.vue";
import Voicy from "./components/Voicy.vue";

export default {
  components: {
    Voicy,
    Profile,
    Fondu,
    Borodutch,
    Pleaseno,
    GoldenBorodutch,
    Resetbot
  }
};
</script>

<style>
a {
  color: white;
}
</style>