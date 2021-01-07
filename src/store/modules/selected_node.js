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
    toggleFalse({ commit }) { commit('toggleFalse') },
    toggleTrue ({ commit }) { commit('toggleTrue')  },

    //Current用
    setProperty({ commit }, { property }) { commit('setProperty', property) },
    setPropertyName({ commit }, { name }) { commit('setPropertyName', name) },
    setPropertyType({ commit }, { type }) { commit('setPropertyType', type) },
    setPropertyActiveTrue({ commit }) { commit('setPropertyActiveTrue') },
    set_current_active_false({ commit }) { commit('set_current_active_false')},
    set_current_line({ commit }, { line }) { commit('set_current_line', line )},
    reset_current_line({ commit }) { commit('reset_current_line')},
    set_current_body({ commit }, { body }) { commit('set_current_body', body) },
    set_current_branch({ commit }, { branch }){ commit('set_current_branch', branch)},

    //Work用
    setWork({ commit }, { work }) { commit('setWork', work) },
    resetWork({ commit } ) { commit('resetWork')},
    setWorkId({ commit }, { id }) { commit('setWorkId', id)},
    setWorkName({ commit }, { name }) { commit('setWorkName', name) },
    setWorkType({ commit }, { type }) { commit('setWorkType', type) },
    set_work_body({ commit }, { body }) { commit('set_work_body', body) },
    set_work_branch({ commit }, { branch }) { commit('set_work_branch', branch)},

    //リセット
    resetState({ commit }) {commit('resetState') },
}

const mutations = {
    //トグル変更用
    toggleFalse(state) { state.toggle = false },
    toggleTrue (state) { state.toggle = true  },

    //current用
    set_current_line(state, line)     { state.property.line.push(line) },
    reset_current_line(state)         { state.property.line.length = 0 },
    setProperty(state, property)      { state.property = property },
    setPropertyName(state, name)      { state.property.name = name },
    setPropertyType(state, type)      { state.property.type = type },
    setPropertyActiveTrue(state)      { state.property.active = true },
    set_current_active_false(state)   { state.property.active = false},
    set_current_body(state, body)     { state.property.body = body},
    set_current_branch(state, branch) { state.property.branch = branch},

    //Work用
    setWork(state, work) { state.work = work },
    resetWork(state) { state.work = {}; state.toggle = true },
    setWorkId(state, id) { state.work.id = id},
    setWorkName(state, name) { state.work.name = name },
    setWorkType(state, type) { state.work.type = type },
    set_work_body(state, body) { state.work.body = body},
    set_work_branch(state, branch) { state.work.branch = branch},

    //リセット
    resetState(state) { Object.assign(state, getDefaultState()) },
}

export default {
    state,
    getters,
    actions,
    mutations
}