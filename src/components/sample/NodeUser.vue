<template>
  <g>
    <rect  :x="x" :y="y" :width="width" :height="height" :rx="rx" :ry="ry" />
    <image :x="x+x_padding"   :y="y+height/2-(20/2)"     :href='getImgUrl(msg_type)' height="20" />
    <text  :x="x+x_padding*5" :y="y+25+Math.floor(15/2)" fill="black" font-size="15" >
      {{testVal}} {{msg_name}}</text>
  </g>
</template>

<script scoped>

  export default {
    name: 'Node',

    data: () => ({
      rx: 10,
      ry: 10,
      active: false,
    }),
    created: () => {

    },
    methods: {
      getImgUrl(msg_type) {
          return require('@/assets/' + msg_type + '.svg')
      }
    },
    props: {
      x        : Number,
      x_padding: Number,
      y        : Number,
      y_padding: Number,
      width    : Number,
      height   : Number,
      msg_name : String,
      msg_type : String,
      testVal  : {},
    }
  }
</script>

<style scoped>
    rect{
      fill:#FFF;
      stroke:#FFF;
      transition: all 0.4s;
      stroke-width: 2px;
    }
</style>