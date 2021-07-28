import StorageService from './storage';


const setUrl = (method, action, className, option) => {
    let url = `${process.env.VUE_APP_BACKEND_URL}_headers.php?env=prod&method=${method}&action=${action}&className=${className}`;
    if (option) {
        url += `&option=${option}`;
    }
    return url;
};

const getDataReadyToSend = data => {
    const formatedObj = {};
    for (const key in data) {
        let shouldEncrypt, key_ = key;
        if (key.substring(0, 9) === "__ENCRYPT") {
            key_ = key.slice(9, key.length);
            shouldEncrypt = true;
        }
        formatedObj[key_] = { val: data[key], shouldEncrypt };
    }
    return formatedObj;
};

export const GET_ = async(action, className, option = null) => {
    const url = setUrl("GET", action, className, option);

    const userSession = new StorageService().get("userSession");

    const headers = new Headers();
    headers.append("Authorization", "Basic " + window.btoa(userSession.id + ":" + userSession.sessionId));

    const response = await window.fetch(url);
    if (response.status == 200 || response.status == 201) {
        return await response.json();
    } else {
        throw ("Response status : " + response.status);
    }
};

export const POST_ = async(action, className, body, option = null, contentType = "application/json") => {

    const url = setUrl("POST", action, className, option);

    const userSession = new StorageService().get("userSession");

    const headers = new Headers();
    headers.append("Content-Type", contentType);
    headers.append("Authorization", "Basic " + window.btoa(userSession.id + ":" + userSession.sessionId));

    const reqInit = {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    };

    // console.log(url, reqInit);
    const response = await window.fetch(url, reqInit);
    if (response.status == 200 || response.status == 201) {
        const result = await response.json();
        return result;
    } else {
        console.log(response);
        throw ("Response status : " + response.status);
    }
};

export const GET_POST_ = async(action, className, body = null, option = null, contentType = "application/json") => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const method = body ? "POST" : "GET";
        const url = setUrl(method, action, className, option);

        xhr.open(method, url);
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                // console.log(xhr.responseText);
                resolve(JSON.parse(xhr.responseText).records);
            } else {
                console.log(xhr.status);
                reject({ status: xhr.status });
            }
        });

        xhr.addEventListener("error", error => {
            console.log(error);
            reject({ error });
        });

        const userSession = new StorageService().get("userSession");
        // console.log(userSession);
        // console.log(`${userSession.id}:${userSession.sessionToken}`);

        xhr.setRequestHeader("Authorization", "Basic " + window.btoa(`${userSession.id}:${userSession.sessionToken}`));

        let dataToSend = null;
        if (body) {
            dataToSend = JSON.stringify(getDataReadyToSend(body));
            xhr.setRequestHeader("Content-Type", contentType);
        }
        xhr.send(dataToSend);
    });
};

export const FORMAT_DATA_TO_POST = obj => {
    const output = {};
    for (const key in obj) {
        output[key] = { val: obj[key] };
    }
    return output;
};