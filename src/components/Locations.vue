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
    userCoords() {
      return JSON.parse(localStorage.getItem('sars-coords'));
    },
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
        this.locations = this.sortLocations(locations) || [];
      }).catch(() => {
        this.loading = false;
        this.snackbar = true;
        this.text = 'Something went wrong, please refresh';
      });
    },
    sortLocations(locations) {
      if (!this.userCoords) {
        return locations;
      }

      const dup = [...locations];
      dup.sort((a, b) => {
        const geometryA = a.location.geometry;
        const geometryB = b.location.geometry;
        const distanceA = this.calculateDistance(
          this.userCoords.lat,
          this.userCoords.lng,
          geometryA.lat,
          geometryA.lng
        );
        const distanceB = this.calculateDistance(
          this.userCoords.lat,
          this.userCoords.lng,
          geometryB.lat,
          geometryB.lng
        );
        return distanceA - distanceB;
      });

      return dup;
    },
    calculateDistance(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    }
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