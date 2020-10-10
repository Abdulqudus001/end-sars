<template>
  <div>
    <Hero @schedule="authenticate" @showLocations="locations = true" />
    <v-container>
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
      <new-protest
        v-if="showDialog"
        @hideDialog="showDialog = false"
        @save="schedule"
        :show-dialog="showDialog"
        :loading="loading"
      />
      <Locations v-if="locations" />
    </v-container>
  </div>
</template>

<script>
import NewProtest from './NewProtest.vue';
import Hero from './Hero.vue';
import Locations from './Locations.vue';

export default {
  components: { NewProtest, Hero, Locations },
  data: () => ({
    loading: false,
    snackbar: false,
    text: '',
    showDialog: false,
    locations: false,
  }),
  methods: {
    authenticate() {
      if (sessionStorage.getItem('sars-password')) {
        this.showDialog = true;
      } else {
        const password = prompt('Enter password');
        if (password === '#n0t0SARS') {
          sessionStorage.setItem('sars-password', password);
          this.showDialog = true;
        }
      }
    },
    schedule(protest) {
      this.loading = true;
      let location = {...protest.location};
      location.geometry = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng()
      };

      location.photos = location.photos.map((el) => {
        return {
          url: el.getUrl(),
          height: el.height,
          width: el.width
        }
      });

      if (location.opening_hours) {
        delete location.opening_hours;
      }


      const data = {
        date: protest.date,
        time: protest.time,
        contact: protest.contact,
        location: location,
      };
      console.log(data);
      this.$firebase.collection('protests').add(data).then(() => {
        this.loading = false;
        this.showDialog = false;
        this.snackbar = true;
        this.text = 'Protest location saved';
      }).catch(() => {
        this.loading = false;
        this.snackbar = true;
        this.text = 'Something went wrong';
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
