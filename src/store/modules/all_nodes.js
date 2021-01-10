import { v4 as uuidv4 } from 'uuid'

const w = 200
const h = 50
const x_root = 10
const y_root = 250 - h

const node_default = {
    id      : uuidv4(),
    name    : '最初のメッセージ',
    x       : x_root,
    y       : y_root,
    sender  : 'user',
    type    : 'text',
    body    : 'こんにちは',
    gen     :0,
    active  : false, //クリック状態かどうか
    branch  : 1,
    path    : [{x_srt: x_root + w,
                y_srt: y_root + h/2,
                x_end: x_root + w,
                y_end: y_root + h/2}],
    is_show : true, //nodeとして表示するかどうか
    px      : x_root,
    py      : y_root,
    fline   : [0],  //family line 血統
    px_x_2  : x_root*2,
    items   :[
        {text:'文字', value:'text'},
        {text:'画像', value:'picture'},
        {text:'確認型テンプレート', value:'template_confirm'},
        {text:'ボタン型テンプレート', value:'template_button'},
        {text:'カルーセル型テンプレート', value:'template_carousel'},
       ],
    items_action: ["メッセージ",
                   "URI",
                   "ポストバック",
                   "日時選択",
                   "位置情報"],
}

const state = {
    config: {
        width : 900, //キャンバス横幅
        height: 500, //キャンバス縦幅
        w     : w,   //nodeの横幅
        h     : h,   //nodeの縦幅
        mr    : 100, //nodeのmargin(right)
        mb    : 100, //nodeのmargin(bottom)
        rx    : 10,  //角の曲率(x要素)
        ry    : 10,  //角の曲率(y要素)
        x_pad : 50,  //テキスト開始位置のx幅
        y_pad : 30,  //テキスト開始位置のy幅
        x_icon_align : -5,
        y_icon_align : -7,
    },
    nodes: [ node_default ]
}

const getters = {
    config: state => state.config,
    nodes: state => state.nodes,
}

const actions = {
    addNode({ commit }, { node } ){ commit('addNode', node) },
    setNodesActiveFalse({ commit }){ commit('setNodesActiveFalse')},
    set_nodes_coordinate({ commit },{ gen, branch }){
        const data = '{"gen":' + gen + ', "branch":' + branch +`}` // 複数の引数の場合mutationには文字列で渡す
        commit('set_nodes_coordinate', data)},
}

const mutations = {
    addNode(state, node) {
        Array.prototype.push.apply(state.nodes, node) //配列同士を破壊的に結合
    },
    setNodesActiveFalse(state) {
        state.nodes.map((v) => v.active = false)
    },
    set_nodes_coordinate(state, data) {
        let _data = JSON.parse(data) // 引数をjson形式に変更
        let i = 0
        state.nodes.map((v) => {
            if( (v.gen == _data.gen + 1) && (i < _data.branch) ) {
                v.y = v.py
                v.y += i*state.config.mb - (_data.branch-1)*state.config.mb/2
                v.is_show = true
                i++
            } else if( (v.gen == _data.gen + 1) && (i >= _data.branch) ) {
                v.y = v.py
                v.y += i*state.config.mb - (_data.branch-1)*state.config.mb/2
                v.is_show = false
                i++
            }
        })

        console.log('done!', state.nodes)
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}