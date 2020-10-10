import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROjECT_ID,
});

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase.firestore();

Vue.prototype.$axios = Axios;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP,
    libraries: 'places',
  },
});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
