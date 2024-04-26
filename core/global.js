import Configstore from "configstore";
import tough, {Cookie} from 'tough-cookie';
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
        domain: default_value.domain,
        logged: false,
        cookies: []
    }, {});
    // 初始化cookiejar
    Instance.jar = new tough.CookieJar();
    const cookies = Instance.config.get("cookies");
    cookies.forEach(obj => {
        const cookie = new Cookie(obj);
        Instance.jar.setCookieSync(cookie, getDomain());
    });
    // 初始化axios
    Instance.client = wrapper(axios.create({
        baseURL: Instance.config.get('domain'),
        proxy: Instance.config.get('proxy'),
        jar: Instance.jar
    }));
};

/**
 * 项目相关常量
 */
export const version = 'v0.1.0';
export const default_value = {
    domain: 'https://codeforces.com/',
};