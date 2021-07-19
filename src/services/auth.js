import { POST_, FORMAT_DATA_TO_POST } from './helpers';

export default class Auth {
    login(user) {
        return new Promise(resolve => {
            const data = FORMAT_DATA_TO_POST(user);

            POST_('read_one', 'auth', data).then(result => {
                console.log(result);
                resolve(result);
            });
        });
    }
    signup(user) {
        return new Promise(resolve => {
            const data = FORMAT_DATA_TO_POST(user);
            data.pwd.shouldEncrypt = true;

            POST_('create', 'auth', data).then(userId => {
                console.log(userId);
                resolve(userId);
            });
        });
    }
}