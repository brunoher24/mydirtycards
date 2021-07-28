import Pusher from 'pusher-js';
export default (app, { apiKey, ...options }) => {
    app.config.globalProperties.$pusher = new Pusher(apiKey, options);
};