<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="1">
        <v-btn @click="addMsg">child</v-btn>
      </v-col>
      <v-col cols="12" md="1">
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>

    <svg :width="width" :height="height" :viewBox="viewport" @wheel="zoomPan" class="bg">
      <rect v-for="msg in msgs" :key="msg.id" 
            :x="msg.x" :y="msg.y" :width="boxWidth" :height="boxHeight" rx="10" ry="10"
            @click="active = !active"
            :class="{'active': active}" >
      </rect>
      <path v-for="msg in msgs" :key="msg.bezie"
            :d="msg.bezie" />
    </svg>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    data: () => ({
      width: 800,
      height: 600,
      ratio: 1,
      dx: 0,
      dy: 0,
      viewport: '0 0 800 600',

      boxWidth: 100,
      boxHeight: 100,
      boxXMargin: 300,
      boxYMargin: 200,
      active: false,
      msgs: [
        {id:0, x:-20, y:-20, bezie:""},
      ],
    }),

    methods: {
      addMsg () {
        let newId  = this.msgs.length                                           //msgsの配列の個数がそのまま最新IDに
        let newX   = 0 + this.boxWidth         + this.boxXMargin                //新しい箱のx座標
        let newY   = 0 + (this.boxHeight)*(newId-1) + this.boxYMargin*(newId-1)  //新しい箱のy座標
        let newBezie = ""
        let newMsg = {id: newId, x: newX, y: newY}
        console.log('lengthY:', newY)

        this.msgs.push(newMsg)
        this.msgs.forEach((element,index) => {
          if(index > 0) {
            this.msgs[index].y = - newY/2 + (this.boxHeight + this.boxYMargin)*(index - 1)
            newBezie = " M " + this.boxWidth + " " + this.boxHeight/2
                     + " L " + Number(newX) + " " + Number(this.boxHeight/2 - this.msgs[index].y)

            console.log("newBezie:",newBezie)
            this.msgs[index].bezie = newBezie
          }
        });
      },
      zoomPan (e) {
        var [x, y, w, h] = this.viewport.split(' ').map(v => parseFloat(v))
        if (e.ctrlKey) {
          // 拡大（Y軸が上がる場合） 縮小（Y軸が下がる場合）
          if (e.deltaY > 0) {
             w = w * 1.01
             h = h * 1.01
          } else {
            w = w * 0.99
            h = h * 0.99
          }
          this.makeViewBox(x, y, w, h)
          this.ratio = w / this.width
          e.preventDefault()
        } else {
          // 移動
          if ((this.dx + e.deltaX > -this.width && this.dy + e.deltaY > -this.width) &&
              (this.dx + e.deltaX < this.width * 2 && this.dy + e.deltaY < this.width * 2)) {
            this.makeViewBox(x + e.deltaX, y + e.deltaY, w, h)
            this.dx += e.deltaX
            this.dy += e.deltaY
          }
        }
      },
      // viewboxを作成
      makeViewBox (x, y, w, h) {
        this.viewport = [x, y, w, h].join(' ')
      }
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
      transition: all 0.2s;
      stroke: #EFF2F5;
      stroke-width: 0px;
      /* fill: transparent; */
      animation:anim 0.5s ease-in 0s forwards;
    }
    circle{
      fill: #EFF2F5;
      transition: all 0.4s;
      stroke:#688BBC;
      stroke-width: 4px;
    }
    .active {
        fill: transparent;
        stroke: #00B900;
        stroke-width: 4px;
        animation:anim 1s ease-in 0s forwards;

    }
    path {
        fill: #333;
        stroke: black;
        stroke-width: 4px;
        animation:move 1s ease-in 0s normal forwards;
    }    

    @keyframes anim{
    0%{fill:transparent;}
    100%{fill:#EFF2F5};
    }

    @keyframes move{
    0%{stroke-opacity:0;}
    100%{stroke-opacity:1};
    }


</style>