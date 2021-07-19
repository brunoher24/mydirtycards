export default class StorageService {
    constructor() {
        this.storageName = "my_dirty_cards_2404_front";
        this.data;
        let storage = window.localStorage[this.storageName];
        if (!storage) {
            storage = {
                userSession: {
                    id: "",
                    sessionToken: ""
                }
            };
            window.localStorage[this.storageName] = JSON.stringify(storage);
        } else {
            storage = JSON.parse(storage);
        }
        this.data = storage;
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        window.localStorage[this.storageName] = JSON.stringify(this.data);
    }

    clear() {
        window.localStorage.removeItem(this.storageName);
    }
}