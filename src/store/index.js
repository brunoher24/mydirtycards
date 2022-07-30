import pusherModule from './modules/pusher';
import gameModule from './modules/game';
import userModule from './modules/user';

import { createStore } from 'vuex';

const store = createStore({
    modules: {
        pusher: pusherModule,
        game: gameModule,
        user: userModule
    }
});

export default store;