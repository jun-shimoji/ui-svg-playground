<template>
    <div>
    <svg :width="width" :height="height"
         :viewBox="viewport"
         @wheel="zoomPan"
         style="background: #ddd" >
        <rect x="-20" y="-20" width="100" height="100"
        rx="20" ry="20" />
    </svg>
    </div>
    
</template>
<script>
export default {
    data: ()=> ({
        width: 800,
        height: 600,
        viewport: '0 0 800 600',
        ratio: 1,
        dx:0,
        dy:0,
    }),
    methods: {
      zoomPan (e) {
        var [x, y, w, h] = this.viewport.split(' ').map(v => parseFloat(v))
        // 移動
        if ((this.dx + e.deltaX > -this.width && this.dy + e.deltaY > -this.width) &&
            (this.dx + e.deltaX < this.width * 2 && this.dy + e.deltaY < this.width * 2)) {
          this.makeViewBox(x + e.deltaX, y + e.deltaY, w, h)
          this.dx += e.deltaX
          this.dy += e.deltaY
        }
      },
      // viewboxを作成
      makeViewBox (x, y, w, h) {
        this.viewport = [x, y, w, h].join(' ')
      }        
    }
}
</script>