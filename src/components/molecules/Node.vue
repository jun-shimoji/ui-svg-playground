<template>
    <svg :width="width" :height="height" :viewBox="viewport" class="bg" @wheel="pan" @click="field_click">
        <g v-for="(n, idx) in nodes" :key="idx" v-show="n.is_show" >
            <rect :x="n.x"
                  :y="n.y"
                  :width="w"
                  :height="h"
                  :class="{'user_not_active': n.sender == 'user' && !n.active ? true : false,
                           'bot_not_active':  n.sender == 'bot' && !n.active ? true : false,
                           'user_active': n.sender == 'user' && n.active ? true : false,
                           'bot_active':  n.sender == 'bot' && n.active ? true : false}"
                  :rx="rx"
                  :ry="ry"
                  @click="select(n)"
            ></rect>
            <image style="pointer-events:none"
                   :x="n.x + x_icon_align"
                   :y="n.y + y_icon_align"
                   :href='getImgUrl(n.type)'
            />
            <text style="pointer-events:none"
                  :x="n.x + x_pad"
                  :y="n.y + y_pad"
                  fill="black"
                  >{{n.name}}</text>
            <path style="pointer-events:none"
                    v-for="(l, ix) in n.line" :key="ix"
                    :d="make_bezie(l)" />

        </g>
    </svg>
</template>

<script>
export default {
    data: () => ({
        dx: 0,
        dy: 0,
        viewport: '0 0 0 0',
        warn_message: '変更内容は保存されていません。表示内容を変更しますか。',
        nodes: [],
        node_clicked: 0,
        canvas_clicked: 0,
    }),
    computed: {
        x()       { return this.$store.getters.config.x },
        y()       { return this.$store.getters.config.y },
        width()       { return this.$store.getters.config.width },
        height()      { return this.$store.getters.config.height },
        w()           { return this.$store.getters.config.w },
        h()           { return this.$store.getters.config.h },
        rx()          { return this.$store.getters.config.rx },
        ry()          { return this.$store.getters.config.ry },
        mr()          { return this.$store.getters.config.mr },
        x_pad()       { return this.$store.getters.config.x_pad },
        y_pad()       { return this.$store.getters.config.y_pad },
        x_icon_align(){ return this.$store.getters.config.x_icon_align},
        y_icon_align(){ return this.$store.getters.config.y_icon_align},
    },
    mounted () {
      this.nodes = this.$store.getters.nodes
      this.viewport = [0, 0, this.width, this.height].join(' ')
    },
    methods: {
        select (n) {  //画像がクリックされた場合
            this.node_clicked++ // fieldがクリックされた場合との差分確認用
            let work = this.$store.getters.work
            if( work.id && (work.id != n.id) ) { //編集中の場合は確認ダイアログ表示
                if(window.confirm(this.warn_message)) {
                    this.initialize(n)
                }
            } else {
                this.initialize(n)                
            }
            //次の世代がない場合は保存ボタンを押せるようにする
            if( this.$store.getters.nodes.filter((v) => v.gen == n.gen + 1).length == 0 ){
                this.$store.dispatch('toggle_false')
            }            
        },
        initialize(_n) {
            // this.$store.dispatch('toggle_true')
            this.$store.dispatch('set_current', {property: _n})
            this.$store.dispatch('reset_work')
            this.$store.dispatch('setNodesActiveFalse')
            this.$store.dispatch('set_current_active_true')
            if(_n.gen == 0 ) { //世代が0の場合は、種別は文字だけにする
                this.$store.dispatch('set_current_element',
                    {index:'items', value: '1'} )
            }
        },
        getImgUrl(msg_type) {
            return require('@/assets/icon-' + msg_type + '.svg')
        },
        pan (e) {
            var [x, y, w, h] = this.viewport.split(' ').map(v => parseFloat(v))
            if (e.ctrlKey) {
              // 拡大（Y軸が上がる場合） 縮小（Y軸が下がる場合）
              if (e.deltaY > 0) {
                 w = w * 1.05  //この値変えて拡大縮小の感度を変える
                 h = h * 1.05  //この値変えて拡大縮小の感度を変える
              } else {
                w = w * 0.95 //この値変えて拡大縮小の感度を変える
                h = h * 0.95 //この値変えて拡大縮小の感度を変える
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
        },
        // ベジェ曲線
        make_bezie (l) {
            let cx_srt = l.x_srt == l.x_end ? l.x_srt : l.x_srt + this.mr/2
            let cy_srt = l.y_srt
            let cx_end = l.x_srt == l.x_end ? l.x_srt : l.x_srt + this.mr/4
            let cy_end = l.y_end
            let bezie =
                ' M ' + l.x_srt + ' ' + l.y_srt +
                ' C ' + cx_srt  + ' ' +  cy_srt + ', ' +
                        cx_end  + ' ' +  cy_end + ', ' +
                '   ' + l.x_end + ' ' + l.y_end
            return bezie
        },
        field_click() { //フィールドをクリックした場合
            this.canvas_clicked++
            // nodeをクリックした後にfieldをクリックした場合
            if(this.node_clicked != this.canvas_clicked) {
                let work = this.$store.getters.work
                if( work.id ) {
                    if(window.confirm(this.warn_message)) {
                        this.initialize({})
                    }
                } else {
                    this.initialize({})
                }
                this.node_clicked = this.canvas_clicked = 0
                this.$store.dispatch('set_current_active_false')
            } 
        }

    }   
}
</script>

<style scoped>
    .user_not_active {
      fill:#FFF;
      stroke:lightgray;
      stroke-width: 4px;
      /* transition: all 0.4s; */
    }
    .bot_not_active {
      fill:#EAFCEB;
      stroke:#73DE74;
      stroke-width: 4px;
      /* transition: all 0.4s; */
    }
    .user_active {
      fill:#FFF;
      stroke:lightgray;
      stroke-width: 8px;
      /* transition: all 0.4s; */
    }
    .bot_active {
      fill:#EAFCEB;
      stroke:#73DE74;
      stroke-width: 8px;
      /* transition: all 0.4s; */
    }
    .bg{
      /* background-color:#688BBC; */
      background-color:#F2F2F2;
      border:solid 4px #EFF2F5;
    }
    path {
        fill:transparent;
        /* transition: all 0.4s; */
        stroke-width: 3px;
        stroke:#CCCCCC;
    }    

    @keyframes anim{
    0%{fill:transparent;}
    100%{fill: #FFF};
    }

    @keyframes move{
    0%{stroke-opacity:0;}
    100%{stroke-opacity:1};
    }

</style>