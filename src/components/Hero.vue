<template>
  <section class="hero">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <header class="py-3">
      <v-row class="mx-0" align="center">
        <div class="d-flex align-center">
          <h1>#EndSARS</h1>
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://twitter.com/ibn_abubakre" target="_blank" class="mx-2" text icon color="white">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          href="https://github.com/abdulqudus001/end-sars"
          target="_blank"
          text
          icon
          color="white"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-row>
    </header>

    <v-row justify="center" align="center" class="mx-0 hero__text fill-height">
      <v-container>
        <h1 class="my-2 font-weight-black">Find Protest Locations Near You</h1>
        <h2 class="my-2">Let Our Voices Be Heard</h2>
        <h2 class="red--text">#EndSARSNOW!!!</h2>
        <v-row class="mx-0 my-3" justify="center" align="center">
          <v-btn class="ma-2" color="white" @click="getUserLocation">Find Locations</v-btn>
          <v-btn class="ma-2" color="white" @click="$emit('schedule')">Schedule Protest</v-btn>
        </v-row>
      </v-container>
    </v-row>
  </section>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    text: '',
  }),
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.snackbar = true;
        this.text = 'Geolocation is not supported by this browser.';
      }
      this.scrollToSection();
    },
    showPosition(position) {
      const { coords } = position;
      const lsCoords = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      localStorage.setItem('sars-coords', JSON.stringify(lsCoords));
    },
    scrollToSection() {
      this.$vuetify.goTo('#locations');
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  max-width: calc(1366px - 20px);
  margin: 0 auto;
}

.hero {
  height: 100vh;
  background: linear-gradient(transparentize($color: #000, $amount: 0.5), transparentize($color: #000, $amount: 0.5)), url('../assets/hero.jpg');

  &__text {
    position: relative;
    margin-top: -60px;
    text-align: center;
    color: #FFF;

    h1 {
      font-size: 3.5rem;

      @media screen and (max-width: 768px) {
        font-size: 2.5rem;
      }
    }

    h2 {
      font-size: 3rem;

      @media screen and (max-width: 768px) {
        font-size: 2rem;
      }
    }
  }
}
</style>