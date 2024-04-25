import Configstore from "configstore";
import tough from 'tough-cookie';
import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import {getDomain} from "./utils.js";

/**
 * 全局变量
 */
export const Instance = {
    config: null, // 全局配置实例
    jar: null, // cookieJar实例
    client: null // axios实例
};

export const initGlobal = () => {
    // 初始化全局配置
    Instance.config = new Configstore('cf-cmd', {
        domain: 'https://codeforces.com/',
        logged: false,
        jar: {
            storeType: 'MemoryCookieStore',
            rejectPublicSuffixes: true,
            cookies: []
        }
    }, {});
    // 初始化cookiejar
    const jarJson = Instance.config.get('jar');
    if (jarJson === null) {
        Instance.jar = new tough.CookieJar();
    } else {
        Instance.jar = tough.CookieJar.deserializeSync(jarJson);
    }
    // 初始化axios
    Instance.client = wrapper(axios.create({
        baseURL: Instance.config.get('domain'),
        proxy: Instance.config.get('proxy'),
        jar: Instance.jar
    }));
};

export const destroyGlobal = () => {
    // 保存cookieJar
    const domain = getDomain();
    if (domain == null) {
        return;
    }
    const jarJson = Instance.jar.serializeSync();
    Instance.config.set('jar', jarJson);
};