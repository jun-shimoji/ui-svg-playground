const getDefaultState = () => {
    return {
        //表示・プロパティ両方で使う要素
        toggle: true,       //保存ボタン
        is_template: false, //テンプレートかどうか

        property: {},
        work: {},
    }
}

const state = getDefaultState()

const getters = {
    toggle       : state     => state.toggle,
    is_template  : state     => state.is_template,
    property     : state     => state.property,
    work         : state     => state.work,
}

const actions = {
    //トグル変更用
    toggle_false({ commit }) { commit('toggle_false') },
    toggle_true ({ commit }) { commit('toggle_true')  },

    //テンプレート要素確認変更用
    is_template({ commit }, { bool }) { commit('is_template', bool) },

    //Current用
    set_current(         { commit }, { property     }) { commit('set_current', property) },
    set_current_element( { commit }, { index, value }) {
        let data = '{"index":"' + index + '", "value":"' + value +'"}' // 複数の引数の場合mutationには文字列で渡す
        commit('set_current_element', data)
    },
    // set_current_name({ commit },         { name }) { commit('set_current_name', name) },
    // set_current_type({ commit },         { type }) { commit('set_current_type', type) },
    // set_current_body({ commit },         { body }) { commit('set_current_body', body) },
    // set_current_branch({ commit },       { branch }){ commit('set_current_branch', branch)},
    // set_current_active_true({ commit })  { commit('set_current_active_true') },
    // set_current_active_false({ commit }) { commit('set_current_active_false')},
    set_current_path({ commit },       { path }) { commit('set_current_path', path )},
    clr_current({ commit } )           { commit('clr_current')},
    clr_current_line({ commit })       { commit('clr_current_line')},

    //Work用
    set_work({ commit }, { work })          { commit('set_work', work) },
    set_work_id({ commit }, { id })         { commit('set_work_id', id)},
    set_work_name({ commit }, { name })     { commit('set_work_name', name) },
    set_work_type({ commit }, { type })     { commit('set_work_type', type) },
    set_work_body({ commit }, { body })     { commit('set_work_body', body) },
    set_work_branch({ commit }, { branch }) { commit('set_work_branch', branch)},
    clr_work({ commit } )                 { commit('clr_work')},

    //リセット
    reset_state({ commit }) {commit('reset_state') },
}

const mutations = {
    //トグル変更用
    toggle_false(state) { state.toggle = false },
    toggle_true (state) { state.toggle = true  },

    //テンプレート要素確認変更用
    is_template(state, bool) { state.is_template = Boolean(bool) },
    
    //current用
    set_current(state, property)      { state.property = property },
    set_current_element(state, data) {
        let _data = JSON.parse(data) // 引数をjson形式に変更
        console.log('_data.index', _data.index)
        console.log('_data.value', _data.value)
//        if(_data.index == 'items') {
//            state.property[_data.index].length = Number(_data.value)
//        } else {
//            state.property[_data.index] = _data.value
//        }
        switch(_data.index) {
            case 'items':
                state.property[_data.index].length = Number(_data.value)
                break
            case 'branch':
                state.property[_data.index] = Number(_data.value)
                break
            case 'active':
                state.property[_data.index] = Boolean(_data.value)
                break
            default:
                state.property[_data.index] = _data.value
        }
    },
    // set_current_name(state, name)     { state.property.name = name },
    // set_current_type(state, type)     { state.property.type = type },
    // set_current_body(state, body)     { state.property.body = body},
    // set_current_branch(state, branch) { state.property.branch = branch},
    // set_current_active_true(state)    { state.property.active = true },
    set_current_path(state, path)   { state.property.path.push(path) },
    clr_current(state)              { state.property = {}},
    clr_current_line(state)         { state.property.path.length = 0 },
    // set_current_active_false(state)   { state.property.active = false},

    //Work用
    set_work(state, work)          { state.work = work },
    set_work_id(state, id)         { state.work.id = id},
    set_work_name(state, name)     { state.work.name = name },
    set_work_type(state, type)     { state.work.type = type },
    set_work_body(state, body)     { state.work.body = body},
    set_work_branch(state, branch) { state.work.branch = branch},
    clr_work(state)              { state.work = {}; state.toggle = true },

    //リセット
    reset_state(state) { Object.assign(state, getDefaultState()) },
}

export default {
    state,
    getters,
    actions,
    mutations
}