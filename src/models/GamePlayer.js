import { GET_POST_ } from "../services/helpers";
import StorageService from '../services/storage';


export default class GamePlayerService {
    create(user_ids, game_id) {
        return new Promise(resolve => {
            const data = { user_ids, game_id };
            GET_POST_("create", "gamePlayer", data, "by_user_id").then(response => {
                resolve(response);
            });
        });
    }

    read() {
        return new Promise(resolve => {
            const user_id = new StorageService().get("userSession").id;
            const data = { user_id };
            GET_POST_('read', 'gamePlayer', data, "_by_user_id").then(result => {
                resolve(result);
            });
        });
    }

    readByGameId(game_id) {
        return new Promise(resolve => {
            // const user_id = new StorageService().get("userSession").id;
            const data = { game_id };
            GET_POST_('read', 'gamePlayer', data, "_by_game_id").then(result => {
                resolve(result);
            });
        });
    }

    readInvitations() {
        return new Promise(resolve => {
            const data = {};
            data["user_id"] = new StorageService().get("userSession").id;
            GET_POST_('read', 'gamePlayer', data, "_invitations").then(result => {
                resolve(result);
            });
        });
    }

    acceptInvitation(id) {
        return new Promise(resolve => {
            const data = { id, accepted: true };
            GET_POST_("update", "gamePlayer", data, "").then(response => {
                resolve(response);
            });
        });
    }

    delete(game_id, user_id) {
        return new Promise(resolve => {
            const data = { game_id, user_id };
            GET_POST_("delete", "gamePlayer", data, "").then(response => {
                resolve(response);
            });
        });
    }
}