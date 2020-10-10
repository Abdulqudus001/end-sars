<template>
  <div id="locations">
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
    <template v-if="loading">
      <Loader />
    </template>
    <template v-else>
      <v-row>
        <v-col
          v-for="location in locations"
          :key="location.location.place_id"
          sm="6"
        >
          <Location :location="location" />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import Loader from './Loader.vue';
import Location from './Location.vue';

export default {
  components: { Loader, Location },
  data: () => ({
    snackbar: false,
    text: '',
    loading: false,
    locations: [],
  }),
  mounted() {
    this.loadLocations();
  },
  methods: {
    loadLocations() {
      this.loading = true;
      const locations = [];
      this.$firebase.collection('protests').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          locations.push(doc.data());
        });
        this.loading = false;
      }).catch(() => {
        this.loading = false;
        this.snackbar = true;
        this.text = 'Something went wrong, please refresh';
      });

      this.locations = locations;
    },
  },
};
</script>

<style>

</style>