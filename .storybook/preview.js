import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import '@mdi/font/css/materialdesignicons.css'

import Vuex from 'vuex';

const vuetifyOptions = {}

Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi'
  }
})

Vue.use(Vuex);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  () => {
    return (
    { vuetify: new Vuetify(vuetifyOptions), template: '<v-app><story/></v-app>' }
  )}
]