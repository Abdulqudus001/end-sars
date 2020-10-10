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
      <div class="row justify-center">
        <Loader />
      </div>
    </template>
    <template v-else>
      <v-row justify="center" class="mx-auto search">
        <v-text-field
          placeholder="Search Locations"
          color="red"
          v-model="search"
        />
      </v-row>
      <v-row v-if="allLocations.length > 0">
        <v-col
          v-for="location in allLocations"
          :key="location.location.place_id"
          sm="6"
        >
          <Location :location="location" />
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <h3 class="grey--text no-result">No Results Found</h3>
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
    search: '',
  }),
  computed: {
    allLocations() {
      if (this.search.length < 0) {
        return this.locations;
      }

      const filtered = this.locations.filter((location) => {
        const name = location.location.name.toLowerCase();
        const address = location.location.formatted_address.toLowerCase();
        const search = this.search.toLowerCase();
        return name.includes(search) || address.includes(search);
      });

      return filtered;
    },
  },
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

<style lang="scss" scoped>
.search {
  max-width: 600px;
}
.no-result {
  font-size: 3rem;

  @media screen and (max-width: 768px){
    font-size: 2rem;
  }
}
</style>