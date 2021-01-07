import Vue from 'vue'
import Vuex from 'vuex'
import selected_node from './modules/selected_node'
import all_nodes from './modules/all_nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    selected_node,
    all_nodes  
  }
})
