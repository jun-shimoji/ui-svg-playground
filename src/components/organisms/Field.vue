<template>
    <div>
        <h2>node操作用mock</h2>
        <ul>
            <li>操作方法
                <ul>
                    <li>nodeクリックでプロパティが開く</li>
                    <li>保存ボタンクリックで次の世代を作成(次の世代がない場合)</li>
                    <li>ピンチイン・アウト(またはCTRL+マウスホイール)で拡大縮小</li>
                    <li>トラックパッドの二本指スクロールでキャンバス移動</li>
                </ul>
            </li>
        </ul>
        <v-row >
            <v-col><Node/></v-col>
        </v-row>
        <Property/>
    </div>
</template>

<script>
import Node from '@/components/molecules/Node.vue'
import Property from '@/components/molecules/Property.vue'

export default {
    name: 'Field',
    components: {
        Node,
        Property,
    },    
}
</script>