import { Instance } from "./global.js";
import config from "../cli/config.js";

const getContestIDFromPath = () => {

};


/**
 * Setter
 */
const setHandle = (handle) => {
    Instance.config.set("handle", handle);
}
const setHandleOrEmail = (handleOrEmail) => {
    Instance.config.set("handleOrEmail", handleOrEmail);
}

const setPassword = (password) => {
    Instance.config.set("password", password);
}

const setDomain = (domain) => {
    Instance.config.set('domain', domain);
};

const setProxy = (proxy) => {
    Instance.config.set('proxy', proxy);
};

const setLogged = (logged) => {
    Instance.config.set('logged', logged);
};


/**
 * Getter
 */
const getHandle = () => {
    return Instance.config.get("handle");
};
const getHandleOrEmail = () => {
    return Instance.config.get("handleOrEmail");
};

const getPassword = () => {
    return Instance.config.get("password");
};

const getDomain = () => {
    return Instance.config.get('domain');
};

const getProxy = () => {
    return Instance.config.get('proxy');
};

const getLogged = () => {
    return Instance.config.get('logged');
};

export {
    getContestIDFromPath,

    setHandle,
    setDomain,
    setHandleOrEmail,
    setPassword,
    setProxy,
    setLogged,

    getHandle,
    getPassword,
    getDomain,
    getProxy,
    getHandleOrEmail,
    getLogged
}


