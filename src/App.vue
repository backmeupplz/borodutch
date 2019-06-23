<template lang="pug">
  v-app(dark)
    v-container(grid-list-md)
      v-layout(row wrap)
        v-flex(xs12 md4)
          v-layout(column)
            Profile.ma-1
            Voicy.ma-1
            Shieldy.ma-1
            TLGCoin.ma-1
        v-flex(xs12 md4)
          v-layout(column)
            GoldenBorodutch.ma-1
            MT.ma-1
            Fondu.ma-1
            Pleaseno.ma-1
            Resetbot.ma-1
            Borodutch.ma-1
        v-flex(xs12 md4)
          v-layout(column)
            Banofbot.ma-1
            Arbeitbot.ma-1
            Temply.ma-1
            Randym.ma-1
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
import TLGCoin from "./components/TLGCoin.vue";
import Banofbot from "./components/Banofbot.vue";
import Randym from "./components/Randym.vue";
import Temply from "./components/Temply.vue";
import Shieldy from "./components/Shieldy.vue";
import Arbeitbot from "./components/Arbeitbot.vue";
import MT from "./components/MT.vue";

export default {
  components: {
    Voicy,
    Profile,
    Fondu,
    Borodutch,
    Pleaseno,
    GoldenBorodutch,
    Resetbot,
    TLGCoin,
    Banofbot,
    Randym,
    Temply,
    Shieldy,
    Arbeitbot,
    MT
  }
};
</script>

<style>
a {
  color: white !important;
}
</style>