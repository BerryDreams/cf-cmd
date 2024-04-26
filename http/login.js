import { Instance } from "../core/global.js";
import {getDomain} from "../core/utils.js";

const generateFtaa = () => {
    return "f1b3f18c715565b589b7823cda7448ce";
};

const generateBfaa = () => {
    return "f1b3f18c715565b589b7823cda7448ce";
};

const findCsrf = (body) => {
    let result = body.match(/csrf='(.+?)'/);
    return result !== null ? result.at(1) : null;
};

const findHandle = (body) => {
    let result = body.match(/handle = "([\s\S]+?)"/);
    return result !== null ? result.at(1) : null;
};

const login = async (handleOrEmail, password) => {
    //If success, return handle for next action.
    //Else, return null for error action.

    // Clear cookies of jar for login.
    Instance.jar.removeAllCookiesSync();
    // Get csrf.
    let resp = await Instance.client.get('/enter');
    if (resp.status !== 200) {
        return null;
    }
    const csrf = findCsrf(resp.data);
    if (!csrf) {
        return null;
    }
    // Generate form-data to send multipart-form post.
    const data = new FormData();
    data.append("csrf_token", csrf);
    data.append("action", "enter");
    data.append("ftaa", generateFtaa());
    data.append("bfaa", generateBfaa());
    data.append("handleOrEmail", handleOrEmail);
    data.append("password", password);
    data.append("_tta", "176");
    data.append("remember", "on");
    resp = await Instance.client.post('/enter', data);
    if (resp.status !== 200) {
        return null;
    }
    const handle = findHandle(resp.data);
    if (handle === null) {
        return null;
    }
    return handle;
};
export default login;