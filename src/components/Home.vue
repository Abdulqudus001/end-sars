<template>
  <div>
    <Hero @schedule="showDialog = true" />
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
      <v-btn @click="showDialog = true">Schedule Protest</v-btn>
    </v-container>
  </div>
</template>

<script>
import NewProtest from './NewProtest.vue';
import Hero from './Hero.vue';

export default {
  components: { NewProtest, Hero },
  data: () => ({
    loading: false,
    snackbar: false,
    text: '',
    showDialog: false,
  }),
  methods: {
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
