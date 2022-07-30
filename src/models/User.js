import { GET_POST_ } from '../services/helpers';

export default class UserService {
    search(searchText, userId) {
        return new Promise(resolve => {
            const data = { searchText, userId };
            GET_POST_('read', 'user', data, '_search').then(users => {
                resolve(users);
            });
        });
    }
}