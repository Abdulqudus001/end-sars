<template>
  <v-dialog v-model="showDialog" max-width="400" persistent>
    <v-card>
      <v-card-title>
        <v-row justify="space-between">
          Schedule Protest
          <v-btn icon text @click="$emit('hideDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-dialog
            ref="date"
            v-model="showDateDialog"
            :return-value.sync="protest.date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="protest.date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="protest.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.date.save(protest.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog
            ref="time"
            v-model="showTimeDialog"
            :return-value.sync="protest.time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="protest.time"
                label="Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="showTimeDialog"
              v-model="protest.time"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="showTimeDialog = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.time.save(protest.time)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-row class="mx-0 my-3">
            <v-icon>mdi-map</v-icon>
            <gmap-autocomplete
              @place_changed="setPlace"
              class="autocomplete"
            />
          </v-row>
          <v-btn
            color="primary"
            class="mt-6"
            block
            min-height="40px"
            @click.prevent="save"
            type="submit"
            :loading="loading"
          >Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['showDialog', 'loading'],
  data: () => ({
    showDateDialog: false,
    showTimeDialog: false,
    protest: {
      date: '',
      time: '',
      location: '',
    },
  }),
  methods: {
    save() {
      this.$emit('save', this.protest);
    },
    setPlace(place) {
      this.protest.location = place;
    },
  },
}
</script>

<style lang="scss" scoped>
.autocomplete {
  flex-grow: 1;
  padding: 10px;
  padding-left: 0;
  border-bottom: 1px solid transparentize($color: #000000, $amount: 0.65);
  margin-left: 10px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #1976d2;
  }
}
</style>