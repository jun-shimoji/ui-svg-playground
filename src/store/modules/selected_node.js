const getDefaultState = () => {
    return {
        toggle: true,
        property: {},
        work: {},
    }
}

const state = getDefaultState()

const getters = {
    toggle  : state     => state.toggle,
    property: state     => state.property,
    work    : state     => state.work,
}

const actions = {
    //トグル変更用
    toggle_false({ commit }) { commit('toggle_false') },
    toggle_true ({ commit }) { commit('toggle_true')  },

    //Current用
    set_current({ commit },              { property }) { commit('set_current', property) },
    set_current_element( { commit }, { index, value }) {
        let data = '{"index":"' + index + '", "value":"' + value +'"}' // 複数の引数の場合mutationには文字列で渡す
        commit('set_current_element', data)
    },
    set_current_name({ commit },         { name }) { commit('set_current_name', name) },
    set_current_type({ commit },         { type }) { commit('set_current_type', type) },
    set_current_active_true({ commit })  { commit('set_current_active_true') },
    set_current_active_false({ commit }) { commit('set_current_active_false')},
    set_current_line({ commit },         { line }) { commit('set_current_line', line )},
    reset_current_line({ commit })       { commit('reset_current_line')},
    set_current_body({ commit },         { body }) { commit('set_current_body', body) },
    set_current_branch({ commit },       { branch }){ commit('set_current_branch', branch)},

    //Work用
    set_work({ commit }, { work })          { commit('set_work', work) },
    reset_work({ commit } )                 { commit('reset_work')},
    set_work_id({ commit }, { id })         { commit('set_work_id', id)},
    set_work_name({ commit }, { name })     { commit('set_work_name', name) },
    set_work_type({ commit }, { type })     { commit('set_work_type', type) },
    set_work_body({ commit }, { body })     { commit('set_work_body', body) },
    set_work_branch({ commit }, { branch }) { commit('set_work_branch', branch)},

    //リセット
    reset_state({ commit }) {commit('reset_state') },
}

const mutations = {
    //トグル変更用
    toggle_false(state) { state.toggle = false },
    toggle_true (state) { state.toggle = true  },

    //current用
    set_current(state, property)      { state.property = property },
    set_current_element(state, data) {
        let _data = JSON.parse(data) // 引数をjson形式に変更
        console.log('_data.index', _data.index)
        console.log('_data.value', _data.value)
        if(_data.index == 'items') {
            state.property[_data.index].length = Number(_data.value)
        } else {
            state.property[_data.index] = _data.value
        }
    },
    set_current_line(state, line)     { state.property.line.push(line) },
    reset_current_line(state)         { state.property.line.length = 0 },
    set_current_name(state, name)     { state.property.name = name },
    set_current_type(state, type)     { state.property.type = type },
    set_current_active_true(state)    { state.property.active = true },
    set_current_active_false(state)   { state.property.active = false},
    set_current_body(state, body)     { state.property.body = body},
    set_current_branch(state, branch) { state.property.branch = branch},

    //Work用
    set_work(state, work)          { state.work = work },
    reset_work(state)              { state.work = {}; state.toggle = true },
    set_work_id(state, id)         { state.work.id = id},
    set_work_name(state, name)     { state.work.name = name },
    set_work_type(state, type)     { state.work.type = type },
    set_work_body(state, body)     { state.work.body = body},
    set_work_branch(state, branch) { state.work.branch = branch},

    //リセット
    reset_state(state) { Object.assign(state, getDefaultState()) },
}

export default {
    state,
    getters,
    actions,
    mutations
}