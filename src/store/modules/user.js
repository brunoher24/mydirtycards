const state = () => ({
    userSession: {
        id: "",
        sessionToken: "",
        alias: ""
    }
});

const getters = {
    getUserSession(state) {
        return () => {
            return state.userSession;
        }
    },
    getUserSessionAlias(state) {
        return () => {
            return state.userSession.alias;
        }
    },
};

const mutations = {
    setUserSession(state, session) {
        state.userSession = session;
    },
};

const actions = {
    setUserSession({ commit }, session) {
        commit('setUserSession', session);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};