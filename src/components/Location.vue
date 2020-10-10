<template>
  <div class="location row mx-0">
    <div class="location__images col-12 col-sm-4 pa-0">
      <v-carousel
        cycle
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        height="100%"
      >
        <v-carousel-item
          v-for="photos in location.location.photos"
          :key="photos.url"
        >
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            :src="photos.url"
            height="100%"
          />
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="location__details pa-2 col-12 col-sm-8">
      <h3 class="location__name">{{ location.location.name }}</h3>
      <div v-html="location.location.adr_address" class="location__address"></div>
      <div class="location__date mt-4">{{ date }}</div>
      <div class="location__time">{{ location.time }}</div>
      <div class="location__distance">1200 miles</div>
      <v-btn
        :href="location.location.url"
        target="_blank"
        text
        class="caption text-capitalize font-weight-medium pl-0 my-2"
        color="primary"
      >
        View On Map
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ['location'],
  computed: {
    date() {
      const protestDate = new Date(this.location.date).toDateString();
      console.log(protestDate);
      return protestDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  border-radius: 8px;
  border: 1px solid;
  position: relative;

  &__images::v-deep {
    width: 250px;
    height: 250px;

    .v-carousel {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }

  &__details {
    position: relative;
    word-break: normal;
  }

  &__distance {
    border-radius: 8px;
    height: 25px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background-color: #F44336;
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: #FFF;
  }

  &__date,
  &__time {
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    &__images {
      height: 200px;
      width: 100%;

      .v-carousel {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0px;
      }
    }

    &__details {
      position: unset;
    }

    &__distance {
      bottom: unset;
      top: 8px;
    }
  }
}
</style>