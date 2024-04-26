import inquirer from 'inquirer';
import { login } from '../http/api.js';
import chalk from "chalk";
import {
    delProxy,
    getDomain,
    getHandle,
    getLogged,
    getProxy, getRootPath, setDomain,
    setHandle,
    setHandleOrEmail,
    setLogged,
    setPassword, setProxy, setRootPath
} from "../core/utils.js";
import {default_value, Instance} from "../core/global.js";

const saveCookies = () => {
    // 保存cookieJar
    const domain = getDomain();
    if (domain == null) {
        return;
    }
    const cookies = Instance.jar.getCookiesSync(domain);
    if (cookies) {
        Instance.config.set('cookies', cookies);
    }
};

const login_action = async () => {
    console.log(chalk.blue('Login with email and password'));
    const A = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'handleOrEmail',
                message: 'Handle/Email',
                default: '',
                askAnswered: true,
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password',
                default: '',
                askAnswered: true,
                mask: true
            }
        ]
    );

    const handle = await login(A.handleOrEmail, A.password);
    if (handle === null) {
        console.log(chalk.red('Login failed.'));
        return;
    }
    setHandle(handle);
    setHandleOrEmail(A.handleOrEmail);
    setPassword(A.password);
    setLogged(true);
    saveCookies();
    console.log(chalk.green('Login success, current user: ' + handle));
};

const status_action = () => {
    const logged = getLogged();
    const handle = getHandle();
    if (handle === undefined || !logged) {
        console.log(chalk.red('Not logged in'));
        return;
    }
    console.log(chalk.blue('Current user: ' + handle));
};

const proxy_action = async () => {
    const proxy = getProxy();
    if (proxy === "") {
        console.log(chalk.blue('Configure proxy'));
    } else {
        console.log(chalk.blue('Configure proxy, current proxy is: ' + proxy));
    }
    const A = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'proxy',
                message: 'New Proxy',
                default: '',
                askAnswered: true,
            }
        ]
    );
    A.proxy ? setProxy(A.proxy) : delProxy();
    console.log(chalk.green('Configure proxy success'));
};

const domain_action = async () => {
    console.log(chalk.blue('Configure domain, current domain is: ' + getDomain()));
    const A = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'domain',
                message: 'New Domain',
                default: default_value.domain,
                askAnswered: true,
            }
        ]
    );
    setDomain(A.domain);
    console.log(chalk.green('Configure domain success'));
};

const root_action = async () => {
    console.log(chalk.blue('Configure code root path, current path is: ' + getRootPath()));
    const A = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'root',
                message: 'New Root Path',
                default: '~/cf',
                askAnswered: true,
            }
        ]
    );
    setRootPath(A.root);
    console.log(chalk.green('Configure root path success'));
};


const config_action = () => {
    inquirer.prompt({
        type: 'list',
        name: 'configOption',
        message: 'Input index of one following choices',
        default: 0,
        askAnswered: true,
        choices: [
            { name: '0) login', value: 0},
            { name: '1) view user status', value: 1},
            { name: '1) set root path', value: 2},
            { name: '2) set proxy', value: 3},
            { name: '3) set domain', value: 4},
        ]
    }, {}).then((A) => {
        switch (A.configOption) {
            case 0:
                login_action().then();
                break;
            case 1:
                status_action();
                break;
            case 2:
                root_action().then();
                break;
            case 3:
                proxy_action().then();
                break;
            case 4:
                domain_action().then();
                break;
        }
    }).catch((error) => {
        console.log(chalk.red(error.message));
    });
}

export default config_action;