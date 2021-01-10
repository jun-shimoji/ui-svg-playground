<template>
    <v-navigation-drawer absolute
          right
          permanent :width="300"
          v-model="drawer"
          :mini-variant.sync="mini"
          v-show="property.active"
    >
        <template v-slot:prepend>
          <v-list-item two-line>
                <v-btn icon @click.stop="mini = !mini"><v-app-bar-nav-icon /></v-btn>
                <v-btn @click="set_property" :disabled="toggle" class="ml-4">保存</v-btn>
                <!-- <v-btn @click="reset_property" class="ml-4">表示を消す</v-btn> -->

          </v-list-item>

        </template>
        <v-container>
                <div>メッセージID: {{property_id}}</div>
                <div>世代: {{property.gen}}</div>
                <div>送信者: {{property.sender}}</div><br/>
                <v-text-field
                    v-model="name_changed"
                    label="メッセージ名"
                ></v-text-field>
                <v-textarea
                    v-model="body_changed"
                    label="本文"
                    rows="3"
                ></v-textarea>
                <v-select
                    label="メッセージ種別"
                    v-model="type_changed"
                    :items="property.items"
                ></v-select>
                <v-select
                    label="ボタン数"
                    v-model="branch_changed"
                    :items="branch"
                    v-show="is_template"
                ></v-select>
                <div v-for="(num, idx) in branch" :key="idx"
                     v-show="is_template"> 
                    ボタン{{num}}
                    <div class="ml-4">
                        <v-select
                            label="アクション"
                            :items="items_action"
                        ></v-select>
                        <v-text-field
                            label="ラベル/テキスト"
                        ></v-text-field>
                    </div>
                </div>
        </v-container>
    </v-navigation-drawer>

</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import {node_default} from '@/static/local.config.js'

console.log('node_default', node_default)

export default {
    name: 'Property',
    data: () => ({
        items_action: ["メッセージ", "URI", "ポストバック", "日時選択", "位置情報"],
        branch: [1, 2, 3, 4],
        drawer: true,
        mini: false,
        is_template: false,
        // is_template: true,
    }),
    computed: {
        config: {
            get() {
                return this.$store.getters.config
            }
        },
        property: {
            get() {
                return this.$store.getters.property
            }
        },
        property_id: { // idの文字数を少なくして表示
            get() {
                let _id = this.property.id
                return _id ? _id.substr(0,8) + '...' : ''
            }
        },
        work: {
            get() {
                return this.$store.getters.work
            }
        },
        toggle: {
            get() {
                return this.$store.getters.toggle
            }
        },
        name_changed: {
            get() {
                return this.$store.getters.property.name
            },
            set(name){ //名前が変更された場合
                this.change_property()
                this.$store.dispatch('set_work_name', {name: name})
            }
        },
        type_changed: {
            get() {
                return this.$store.getters.property.type
            },
            set(type){ //メッセージ種別が変更された場合
                this.is_template = /^template/.test(type) ? true : false //ボタン表示設定
                switch(type) {
                    case 'text' || 'picture':
                        this.branch = [1]
                        break
                    case 'template_confirm':
                        this.branch = [1, 2]
                        break
                    case 'template_button':
                        this.branch = [1, 2, 3, 4]
                        break
                    case 'template_carousel':
                        this.branch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                       11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                       21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        break
                    default:
                        this.branch = []
                }
                this.change_property()
                this.$store.dispatch('set_work_type', {type: type})
            }
        },
        branch_changed: {
            get() {
                return this.$store.getters.property.branch
            },
            set(branch) {
                this.change_property()
                this.$store.dispatch('set_work_branch', {branch: branch})
            }
        },
        body_changed: {
            get() {
                return this.$store.getters.property.body
            },
            set(body){ //本文が変更された場合
                this.change_property()
                this.$store.dispatch('set_work_body', {body: body})
            }
        },
    },
    methods: {
        change_property() {
            this.$store.dispatch('set_work_id', {id: this.$store.getters.property.id}) //必ずidを記載
            this.$store.dispatch('toggle_false') //保存ボタンを押せるように
        },
        set_property() { //保存ボタンを押した場合
            this.edit_current_node()
            let new_node = this.make_new_node(this.property) //現nodeの一部情報を新nodeに使用
            this.$store.dispatch('addNode', {node: new_node})
            this.$store.dispatch('reset_work')
            this.pict_new_path()
        },
        reset_property(){ //表示を消すを押した場合
            this.$store.dispatch('reset_state')
        },
        pict_new_path(){
            let x_srt = this.property.x + this.config.w    //現ノードのpath x座標
            let y_srt = this.property.y + this.config.h/2  //現ノードのpath y座標
            let x_end = x_srt           + this.config.mr
            let y_end = y_srt

            this.$store.dispatch('reset_current_line')     //現ノードの線を一旦クリア
            this.$store.dispatch('set_nodes_coordinate',
                {gen: this.property.gen, branch: this.property.branch})
            let i = 0
            let branch = this.property.branch
            while(i < branch) { //ブランチ数のpathを描く
                this.$store.dispatch('set_current_line', {line:
                    {x_srt: x_srt,
                     y_srt: y_srt,
                     x_end: x_end,
                    //  y_end: y_end + i*(this.$store.getters.config.mb)}
                     y_end: y_end + i*(this.$store.getters.config.mb) - (branch-1)*this.$store.getters.config.mb/2}
                })
                i++
            }
        },
        edit_current_node() {
            let work = this.$store.getters.work
            if(work.name) {
                // this.$store.dispatch('set_current_name', {name: work.name})
                this.$store.dispatch('set_current_element', {index: 'name', value: work.name})
            }
            if(work.type) {
                this.$store.dispatch('set_current_type', {type: work.type})
            }
            if(work.body) {
                this.$store.dispatch('set_current_body', {body: work.body})
            }
            if(work.branch) {
                this.$store.dispatch('set_current_branch', {branch: work.branch})
            }
        },
        make_new_node(_node) {
            let nodes = this.$store.getters.nodes
            if( nodes.find((v) => v.gen > _node.gen) !== undefined ) //自分の先の世代があったら
                return                                               //アーリーリターン
            let _x = _node.x + this.config.w + this.config.mr
            let _y = _node.y
            let new_nodes = []
            let name_default = _node.gen%2 == 0 ? '新規メッセージ' : '新規アクション'
            for(let i=0; i < 4; i++) {
                let new_fline = [..._node.fline] //血統
                new_fline.push(i)
//                new_nodes.push(node_default)
//                // new_nodes[i] = node_default
//                console.log('node_default', node_default)
//                console.log('new_nodes', new_nodes)
//                new_nodes[i].gen = _node.gen + 1
//                new_nodes[i].x = _x
//                new_nodes[i].y = _y
//                new_nodes[i].name = name_default + String(i+1)
//                new_nodes[i].sender = _node.sender == 'user' ? "bot" : "user"
//                new_nodes[i].type = 'none'
//                new_nodes[i].line = []
//                new_nodes[i].px = _node.x
//                new_nodes[i].py = _node.y
//                new_nodes[i].fline = new_fline

                new_nodes.push({
                        id     : uuidv4(),
                        name   : name_default + String(i+1),
                        gen    : _node.gen + 1,
                        x      : _x,
                        y      : _y,
                        sender : _node.sender == 'user' ? "bot" : "user",
                        type   : 'none',
                        active : false,
                        branch : 1,
                        line   : [],
                        is_show: false,
                        px     : _node.x,
                        py     : _node.y,
                        fline  : new_fline,
                        items   :[
                            {text:'文字', value:'text'},
                            {text:'画像', value:'picture'},
                            {text:'確認型テンプレート', value:'template_confirm'},
                            {text:'ボタン型テンプレート', value:'template_button'},
                            {text:'カルーセル型テンプレート', value:'template_carousel'},
                           ],
                })
            }
            return new_nodes
        }
    }
}
</script>
