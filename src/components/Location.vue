<template>
  <div class="location row mx-0">
    <div class="location__images col-12 col-md-4 pa-0">
      <v-carousel
        cycle
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        height="100%"
      >
        <template v-if="location.location.photos">
          <v-carousel-item
            v-for="photos in location.location.photos"
            :key="photos.url"
          >
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              :src="photos.url"
              aspect-ratio="1"
              min-width="250px"
              height="100%"
              width="100%"
            />
          </v-carousel-item>
        </template>
        <template v-else>
          <v-carousel-item>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="@/assets/no-image.png"
              height="100%"
            />
          </v-carousel-item>
        </template>
      </v-carousel>
    </div>
    <div class="location__details pa-2 col-12 col-md-8">
      <h3 class="location__name">{{ location.location.name }}</h3>
      <div v-html="location.location.adr_address" class="location__address"></div>
      <div class="location__date mt-4">{{ date }}</div>
      <div class="location__time">{{ location.time }}</div>
      <div class="location__contact">
        Contact Person: {{ location.contact }}
      </div>
      <div v-show="userCoords" class="location__distance">{{ distance }} miles</div>
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
      return protestDate;
    },
    userCoords()  {
      return JSON.parse(localStorage.getItem('sars-coords'));
    },
    distance() {
      if (!this.userCoords) {
        return null;
      }
      const protestLocation = this.location.location.geometry;
      const distanceDifference = this.calculateDistance(
        this.userCoords.lat,
        this.userCoords.lng,
        protestLocation.lat,
        protestLocation.lng
      );
      return distanceDifference.toFixed(2);
    }
  },
  methods: {
    // Proudly sponsored by SO
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
.location {
  border-radius: 8px;
  // border: 1px solid transparentize($color: #000, $amount: 0.7);
  box-shadow: 0 4px 7px rgba($color: #000, $alpha: 0.2);
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
  &__time,
  &__contact {
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: 960px) {
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
      width: 100%;
    }

    &__distance {
      bottom: unset;
      top: 8px;
    }
  }
}
</style>