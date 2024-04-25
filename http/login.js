import {getHandleOrEmail, getPassword, setHandle} from '../core/utils.js'
import { Instance } from "../core/global.js";
import chalk from "chalk";


const findCsrf = (body) => {
    let result = body.match(/csrf='(.+?)'/);
    return result !== null ? result.at(1) : null;
};

const findHandle = (body) => {
    let result = body.match(/handle = "([\s\S]+?)"/);
    return result !== null ? result.at(1) : null;
};

const generateFtaa = () => {
    return "f1b3f18c715565b589b7823cda7448ce";
};

const generateBfaa = () => {
    return "f1b3f18c715565b589b7823cda7448ce";
};


const login = async () => {
    let resp = await Instance.client.get('/enter');
    if (resp.status !== 200) {
        return;
    }
    const csrf = findCsrf(resp.data), bfaa = generateBfaa(), ftaa = generateFtaa();
    const data = new FormData();
    data.append("csrf_token", csrf);
    data.append("action", "enter");
    data.append("ftaa", ftaa);
    data.append("bfaa", bfaa);
    data.append("handleOrEmail", getHandleOrEmail());
    data.append("password", getPassword());
    data.append("_tta", "176");
    data.append("remember", "on");
    resp = await Instance.client.post('/enter', data);
    if (resp.status !== 200) {
        console.log(chalk.red('Login error'));
        return;
    }
    const handle = findHandle(resp.data);
    setHandle(handle);
};
export default login;