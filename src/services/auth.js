import { POST_, FORMAT_DATA_TO_POST } from './helpers';
import StorageService from './storage';


export default class Auth {
    login(user) {
        return new Promise(resolve => {
            const data = FORMAT_DATA_TO_POST(user);

            POST_('read_one', 'auth', data).then(result => {
                const storage = new StorageService();
                storage.set("userSession", { id: result.records[1][1], sessionId: result.records[1][2] });
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
    logout() {
        const storage = new StorageService();
        storage.clear();
    }
}