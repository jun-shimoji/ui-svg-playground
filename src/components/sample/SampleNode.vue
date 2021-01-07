<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6">

        <div>user_node</div>    
        <svg :viewbox="viewbox" :width="width" :height="height/2" class="bg">
          <node-user id='sample1' :x="x_node" :y="y_node"
                     :width="node_width" :height="node_height"
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="user_msg"
                     msg_name="こんにちは" />
        </svg>
      </v-col>
      <v-col cols="12" md="6">
        <div>bot_node</div>
        <svg :viewbox="viewbox" :width="width" :height="height/2" class="bg">
          <node-bot id='sample2' :x="x_node" :y="y_node"
                    :width="node_width" :height="node_height"
                    :x_padding="x_padding"
                    :y_padding="y_padding"
                    msg_type="text"
                    msg_name="世界" />
        </svg>
      </v-col>
      <v-col cols="12" md="12">
        <div>connector(sample1)</div>
        <svg :viewbox="viewbox" :width="width*2.5" :height="height/2" class="bg">
          <node-user id='sample3' :x="x_node" :y="y_node"
                     :width="node_width" :height="node_height" 
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="user_msg"
                     msg_name="こんにちは" />
          <node-bot id='sample4' :x="x_node+node_width*2" :y="y_node"
                     :width="node_width" :height="node_height"
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="text"
                     msg_name="世界"
                     parent='m3' />
          <path d="M 200 75 L 350 75 z" style="stroke:black" /></svg>
      </v-col>
    </v-row>



    <v-row class="text-center" justify="center" align-content="center">

      <v-col cols="12" md="12">
        <div>connector(sample2)</div>
        <v-btn @click="check">check</v-btn>
        <svg :viewbox="viewbox" :width="width*4.0" :height="height*2" class="bg">
          <node-user id='m1' :testVal="node.m1"
                    :x="x_node" :y="y_node+node_height*3"
                    :width="node_width" :height="node_height"
                    gen='0'
                    :x_padding="x_padding" :y_padding="y_padding"
                    msg_type="user_msg"    msg_name="こんにちは" />
          <node-bot id='m2' :x="x_node+node_width*2" :y="y_node+node_height*3"
                    :width="node_width" :height="node_height"
                    gen='1'
                    :x_padding="x_padding"
                    :y_padding="y_padding"
                    msg_type="template"
                    msg_name="世界"
                    parent='m5' />
          <path d="M 200 225 L 350 225 z" />
          <node-user id='m3' :x="x_node+node_width*4" :y="y_node"
                     :width="node_width" :height="node_height" 
                     gen='2'
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="user_msg"
                     msg_name="Stay hungry," />
          <path d="M 500 225 C 575 225, 537 75 650 75" />

          <node-user id='m4' :x="x_node+node_width*4" :y="y_node+node_height*3"
                     :width="node_width" :height="node_height" 
                     gen='2'
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="user_msg"
                     msg_name="Even you," />
          <path d="M 500 225 L 650 225 z" />
          <node-bot id='m5' :x="x_node+node_width*6" :y="y_node"
                     :width="node_width" :height="node_height"
                    gen='3'
                    :x_padding="x_padding"
                    :y_padding="y_padding"
                    msg_type="text"
                    msg_name="Stay foolish."
                    parent='m7' />
          <path d="M 800 75 L 950 75 z" />
          <node-bot id='m6' :x="x_node+node_width*6" :y="y_node+node_height*3"
                     :width="node_width" :height="node_height"
                    gen='3'
                    :x_padding="x_padding"
                    :y_padding="y_padding"
                    msg_type="image_map"
                    msg_name="Brutus."
                    parent='m8' />
          <path d="M 800 225 L 950 225 z" />
          <node-user id='m7' :x="x_node+node_width*4" :y="y_node+node_height*6"
                     :width="node_width" :height="node_height" 
                     gen='2'
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="url"
                     msg_name="google it," />
          <path d="M 500 225 C 575 225, 537 375, 650 375" />
          </svg>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
        <svg :viewbox="viewbox" :width="width" :height="height/2" class="bg">
          <node-user :x="node.m1.x" :y="y_node"
                     :width="node_width" :height="node_height"
                     :x_padding="x_padding"
                     :y_padding="y_padding"
                     msg_type="user_msg"
                     msg_name="こんにちは" />
        </svg>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NodeBot from './NodeBot.vue'
import NodeUser from './NodeUser.vue'

  export default {
    components: {NodeUser, NodeBot},

    data: () => ({
        viewbox: "0 0 300 300",
        width: 300,
        height: 300,
        x_node: 50,
        x_padding: 10,
        y_node: 50,
        y_padding: 50,
        node_width: 150,
        node_height: 50,      
        active: false,
        d: "M 50 100 L 300 100 z",
        // node: [ {id:'m5', sp: {x:50, y:50}, node_width:150, node_height:50, bp: this.calcBp(50, 50, 150, 50)}]
        // node: [ {id:'m5', sp: {x:50, y:50}, node_width:150, node_height:50, bp: {x:0, y:0}}]
        node: { 'm1': {x:50 },
                 'm2': {x:50 }},
    }),
    methods: {
      calcBp(x, y, node_width, node_height) {
        let bp = {}
        bp['x'] = x + node_width
        bp['y'] = y + node_height/2
        return bp
      },
      check() {
        console.log(this.node.m1)
      }
    }

  }
</script>

<style scoped>
    .bg{
      /* background-color:#688BBC; */
      background-color:#F2F2F2;
      border:solid 1px #EFF2F5;
    }
    rect{
      transition: all 0.4s;
      stroke-width: 2px;
    }
    .active {
        fill: #00B900;
        stroke: #00B900;
        stroke-width: 5px;
    }
    path {
        fill:transparent;
        transition: all 0.4s;
        stroke-width: 2px;
        stroke:#CCCCCC;
    }    
</style>