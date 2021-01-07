import { v4 as uuidv4 } from 'uuid'

const w = 200
const h = 50
const x_root = 10
const y_root = 250 - h

const state = {
    config: {
        width : 900, //キャンバス横幅
        height: 500, //キャンバス縦幅
        w     : w,   //nodeの横幅
        h     : h,   //nodeの縦幅
        mr    : 300, //nodeのmargin(right)
        mb    : 200, //nodeのmargin(bottom)
        rx    : 10,  //矩形の丸み(x要素)
        ry    : 10,  //矩形の丸み(y要素)
        x_pad : 50,  //テキスト開始位置のx幅
        y_pad : 30,  //テキスト開始位置のy幅
        x_icon_align : -5,
        y_icon_align : -7,
    },
    nodes: [
        {
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
            line    : [{x_srt: x_root + w, y_srt: y_root + h/2, x_end: x_root + w,
                        y_end: y_root + h/2}],
            is_show : true,
            px      : x_root,
            py      : y_root,
            label   : [0],
        },
    ]
}

const getters = {
    config: state => state.config,
    nodes: state => state.nodes,
}

const actions = {
    addNode({ commit }, { node } ){ commit('addNode', node) },
    setNodesActiveFalse({ commit }){ commit('setNodesActiveFalse')},
    set_nodes_coordinate({ commit },{ gen, branch }){
        const data = '{"gen":' + gen + ', "branch":' + branch +`}`
        commit('set_nodes_coordinate', data)},
        // vuexは複数の引数がある場合は文字列でつなげる必要がある
        // なのでjson形式の文字列を引数にする
}

const mutations = {
    addNode(state, node) {
        // state.nodes.push( node )
        Array.prototype.push.apply(state.nodes, node) //配列同士を破壊的に結合
    },
    setNodesActiveFalse(state) {
        state.nodes.map((v) => v.active = false)
    },
    set_nodes_coordinate(state, data) {
        console.log('data', data)
        let _data = JSON.parse(data) // 引数をjson形式に変更
        // let y_1st = state.nodes.filter((v) => v.gen == _data.gen + 1)[0].y
        let i = 0
        state.nodes.map((v) => {
            if( (v.gen == _data.gen + 1) && (i < _data.branch) ) {
                // v.y = y_1st
                v.y = v.py
                v.y += i*state.config.mb - (_data.branch-1)*state.config.mb/2
                v.is_show = true
                i++
            } else if( (v.gen == _data.gen + 1) && (i >= _data.branch) ) {
                // v.y = y_1st
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
    mutations
}