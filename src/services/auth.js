import { GET_POST_, GENERATE_RANDOM_ID, SHOULD_ENCRYPT } from './helpers';
import StorageService from './storage';



export default class Auth {
    login(user) {
        return new Promise((resolve, reject) => {
            // const data = FORMAT_DATA_TO_POST(user);
            GET_POST_('read_one', 'auth', user).then(result => {
                // console.log(result);
                if (result[1][0] === "error") {
                    reject(result);
                }
                const userSession = { id: result[1][1], sessionId: result[1][2] };
                const storage = new StorageService();
                storage.set("userSession", userSession);
                resolve(userSession);
            });
        });
    }
    signup(user) {
        return new Promise(resolve => {
            const user_ = SHOULD_ENCRYPT(user, "pwd");
            user_["id_push"] = GENERATE_RANDOM_ID(25);
            // const data = FORMAT_DATA_TO_POST(user);
            // data.pwd.shouldEncrypt = true;

            GET_POST_('create', 'auth', user_).then(userId => {
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