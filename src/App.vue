<template>
  <v-app>
    <v-app-bar app elevation="2">
      <div class="d-flex align-center">
        <h1>#EndSARS</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://twitter.com/ibn_abubakre" target="_blank" text icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/abdulqudus001/end-sars"
        target="_blank"
        text
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/components/Home.vue';

export default {
  name: 'App',
  components: { Home },
  data: () => ({
    //
  }),
};
</script>
