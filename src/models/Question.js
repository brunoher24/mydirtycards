import { GET_POST_ } from '../services/helpers';
import StorageService from '../services/storage';


export default class QuestionManager {
    create(text) {
        return new Promise(resolve => {
            const data = { text };
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('create', 'question', data).then(result => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    read() {
        return new Promise(resolve => {
            const data = {};
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('read', 'question', data, "_by_user_id").then(result => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    update(id, text) {
        return new Promise(resolve => {
            const data = { id, text };
            GET_POST_('update', 'question', data).then(result => {
                console.log(result);
                resolve(result);
            });
        });
    }

    delete(id) {
        return new Promise(resolve => {
            GET_POST_('delete', 'question', { id }).then(result => {
                console.log(result);
                resolve(result);
            });
        });
    }

}