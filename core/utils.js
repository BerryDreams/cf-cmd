import {default_value, Instance} from "./global.js";
import config from "../cli/config.js";

const getContestIDFromPath = () => {
    return -1;
};

const delProxy = () => {
    Instance.config.delete('proxy');
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

const setRootPath = (rootPath) => {
    Instance.config.set('root', rootPath);
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
    const domain = Instance.config.get('domain');
    return domain === undefined ? default_value.domain : domain;
};

const getProxy = () => {
    const proxy = Instance.config.get('proxy');
    return proxy === undefined ? "" : proxy;
};

const getLogged = () => {
    const logged = Instance.config.get('logged');
    return logged === undefined ? false : logged;
};

const getRootPath = () => {
    const rootPath = Instance.config.get('root');
    return rootPath === undefined ? '~/cf' : rootPath;
};

export {
    getContestIDFromPath,
    delProxy,

    setHandle,
    setDomain,
    setHandleOrEmail,
    setPassword,
    setProxy,
    setLogged,
    setRootPath,

    getHandle,
    getPassword,
    getDomain,
    getProxy,
    getHandleOrEmail,
    getLogged,
    getRootPath
}


