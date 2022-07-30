import { GET_POST_ } from '../services/helpers';
import StorageService from '../services/storage';


export default class GameManager {
    create(user_id) {
        return new Promise((resolve, reject) => {
            GET_POST_('create', 'game', { user_id }).then(result => {
                if (result[0] === "success") {
                    resolve(result[1]);
                } else {
                    reject(result[1]);
                }
            });
        });
    }

    read() {
        return new Promise(resolve => {
            const data = {};
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('read', 'game', data, "_by_user_id").then(result => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    update(id, text) {
        return new Promise(resolve => {
            const data = { id, text };

            GET_POST_('update', 'answer', data).then(result => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    delete(id) {
        return new Promise(resolve => {
            GET_POST_('delete', 'answer', { id }).then(result => {
                console.log(result);
                resolve(result);
            });
        });
    }
}