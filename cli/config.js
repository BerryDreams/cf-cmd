import inquirer from 'inquirer';
import { login } from '../http/api.js';
import chalk from "chalk";
import {getHandle, getLogged, setHandleOrEmail, setLogged, setPassword} from "../core/utils.js";

const login_action = async () => {
    console.log(chalk.blue('Configure email and password'));
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
    setHandleOrEmail(A.handleOrEmail);
    setPassword(A.password);
    setLogged(true);
    return await login();
};

const status_action = () => {
    const logged = getLogged();
    const handle = getHandle();
    if (handle === undefined || !logged) {
        console.log(chalk.red('Not logged in'));
        return;
    }
    console.log(chalk.green('Current user: ' + handle));
};

const proxy_action = () => {

};

const domain_action = () => {

};


const config_action = () => {
    inquirer.prompt({
        type: 'list',
        name: 'configOption',
        message: 'Input index of one following choices',
        default: 0,
        askAnswered: true,
        choices: [
            { name: '0) Login', value: 0},
            { name: '1) User status', value: 1},
            { name: '2) Set proxy', value: 2},
            { name: '3) Set domain', value: 3},
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
                proxy_action();
                break;
            case 3:
                domain_action();
                break;
        }
    }).catch((error) => {
        console.error('', error);
    });
}

export default config_action;