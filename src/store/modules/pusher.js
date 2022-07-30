const state = () => ({
    $pusher: null,
    chanels: [],
    // events: [],
    // dataRecieved: []
});

const getters = {
    getChanels(state) {
        return () => {
            return state.chanels;
        }
    },
    getChanel(state) {
        return chanelName => {
            const chanel = state.chanels.filter(chanel => chanel.name === chanelName)[0];
            if (chanel) return chanel.value;
            return false;
        }
    }
};

const mutations = {
    initPusher(state, $pusher) {
        if (!state.$pusher) {
            state.$pusher = $pusher;
        } else {
            console.log("redundant : pusher already exists !");
        }
    },

    async addChanel(state, chanelName) {
        const chanelValue = await state.$pusher.subscribe(chanelName);
        state.chanels.push({
            name: chanelName,
            value: chanelValue
        });
    }
};

const actions = {
    initPusher({ commit }, $pusher) {
        commit('initPusher', $pusher);
    },

    addChanel({ commit }, chanelName) {
        commit('addChanel', chanelName);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};