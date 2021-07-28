import { GET_POST_ } from '../services/helpers';
import StorageService from '../services/storage';


export default class AnswerManager {
    create(text) {
        return new Promise(resolve => {
            const data = { text };
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('create', 'answer', data).then(result => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    read() {
        return new Promise(resolve => {
            const data = {};
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('read', 'answer', data, "_by_user_id").then(result => {
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