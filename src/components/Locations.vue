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
    Hello All Locations
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    text: '',
  }),
  mounted() {
    this.loadLocations();
  },
  methods: {
    loadLocations() {
      const locations = [];
      this.$firebase.collection('protests').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          locations.push(doc.data());
        });
      }).catch(() => {
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