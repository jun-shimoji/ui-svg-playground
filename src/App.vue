<template>
  <v-app>
    <v-main>
      <v-container fluid>
      <!-- <v-tabs fixed-tabs>
        <v-tab style="text-transform: none" to="/field" router>field</v-tab>
        <v-tab style="text-transform: none" to="/sample_node" router>sample_node</v-tab>
        <v-tab style="text-transform: none" to="/animation" router>animation</v-tab>
        <v-tab style="text-transform: none" to="/sandbox" router>sandbox</v-tab>
        <v-tab style="text-transform: none" to="/property" router>property</v-tab>
        <v-tab style="text-transform: none" to="/samplecanvas" router>sample_canvas</v-tab>
      </v-tabs> -->
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
};
</script>

<style>
  *{text-transform: none}
</style>