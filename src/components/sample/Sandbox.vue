<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <div>line with indicator</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
          <line :x1="x1" y1=10 x2=200 y2=200 stroke="black"></line>
        </svg>
        <div><input type="range" v-model="x1"></div>
      </v-col>
      <v-col cols="12" md="6">
        <div>circle, rect</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
          <circle r=50 cx=100 cy=100 @click="active = !active" :class="{'active': active}"></circle>
          <rect x="10" y="200" width="100" height="75" @click="active = !active" :class="{'active': active}" />
        </svg>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <div>Path M 0 0 L 300 300, Bezier curve</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
            <path d="M 0 0 C 150 0, 75 300, 300 300" fill="transparent"/>
            <path d="M 0 0 L 300 300" fill="transparent"/>
            <circle r=10 cx=150 cy=0 fill="red"></circle>
            <circle r=10 cx=75 cy=300 fill="red"></circle>
        </svg>
      </v-col>
      <v-col cols="12" md="6">
        <div>Bezier curve2</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
            <path d="M 0 0 C 150 0, 75 150, 300 150" fill="transparent"/>
            <circle r=10 cx=150 cy=0 fill="red"></circle>
            <circle r=10 cx=75 cy=150 fill="red"></circle>
        </svg>
      </v-col>

    </v-row>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <div>Bezier curve3</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
            <path d="M 0 0 C 75 0, 12 300, 150 300" fill="transparent"/>
            <circle r=10 cx=75 cy=0 fill="red"></circle>
            <circle r=10 cx=37 cy=300 fill="red"></circle>
        </svg>
      </v-col>
    </v-row>
    <br><br>
    <v-row class="text-center">
      <v-col cols="12" md="2">
        <v-text-field label="start x" v-model="startX"></v-text-field>
        <v-text-field label="end x" v-model="endX"></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field label="start y" v-model="startY"></v-text-field>
        <v-text-field label="end y" v-model="endY"></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="reset">リセット</v-btn>
        <v-btn @click="makeBezie" class="mt-5">描画</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <div>Bezier curve4</div>
        <svg :viewbox="viewbox" :width="width" :height="height" class="bg">
            <path :d="bezie" fill="transparent"/>
            <circle r=10 :cx="startCX" :cy="startCY"></circle>
            <circle r=10 :cx="endCX"   :cy="endCY"></circle>
        </svg>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'Sandbox',

    data: () => ({
      viewbox: "0 0 300 300",
      width: 300,
      height: 300,
      x1: 10,
      active: false,
      startX: 0,
      startY: 0,
      endX: 300,
      endY: 300,
      startCX: 150,
      startCY: 0,
      endCX: 75,
      endCY: 300,
      bezie: "M 0 0 C 150 0, 75 300, 300 300"
    }),
    methods: {
      reset() {
        this.startX   = 0
        this.startY   = 0
        this.endX     = 300
        this.endY     = 300
        this.startCX  = this.endX/2
        this.startCY  = 0
        this.endCX    = 75
        this.endCY    = 300
        this.bezie    = "M 0 0 C 150 0, 75 300, 300 300"
        this.makeBezie()
      },
      makeBezie() {
        // 始点向け制御点
        let marginX = Math.abs(this.startX - this.endX)
        this.startCX = marginX/2
        this.startCY = this.startY
        this.endCX = marginX/4
        this.endCY = this.endY
        this.bezie = " M "+ this.startX + " " + this.startY // Mコマンドで始点生成
                   + " C "+ marginX/2   + " " + this.startY // Cコマンドで始点制御点
                          + ", " + 
                          + marginX/4   + " " + this.endY   // と終点制御点 を作成
                          + " "
                          + this.endX   + " " + this.endY   // 最後に終点を記す
        console.log('this.bezie: ', this.bezie)
      },
    }

  }
</script>

<style scoped>
    .bg{
      background-color:#688BBC;
      border:solid 1px #EFF2F5;
    }
    rect{
      fill: #EFF2F5;
      transition: all 0.4s;
      stroke:#EFF2F5;
      stroke-width: 5px;
    }
    circle{
      fill: #EFF2F5;
      transition: all 0.4s;
      stroke:red;
      stroke-width: 2px;
    }
    .active {
        fill: #00B900;
        stroke: #00B900;
        stroke-width: 5px;
    }
    path {
        /* fill: #333; */
        transition: all 0.4s;
        stroke: black;
        stroke-width: 4px;
    }    
</style>