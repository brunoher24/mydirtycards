const state = () => ({
    game: { id: "" }
});

const getters = {
    getGame(state) {
        return () => {
            return state.game;
        }
    },
    getGameId(state) {
        return () => {
            return state.game.id;
        }
    },
};

const mutations = {
    create(state, game) {
        state.game = game;
    },
};

const actions = {
    create({ commit }, game) {
        commit('create', game);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};