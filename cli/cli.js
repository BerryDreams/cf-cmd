import { Command } from 'commander';
import config_action from './config.js';
import list_action from "./list.js";
import fetch_action from "./fetch.js";
import chalk from "chalk";
import {version} from "../core/global.js";

const desc_ascii =
` ██████╗███████╗     ██████╗███╗   ███╗██████╗ 
██╔════╝██╔════╝    ██╔════╝████╗ ████║██╔══██╗
██║     █████╗█████╗██║     ██╔████╔██║██║  ██║
██║     ██╔══╝╚════╝██║     ██║╚██╔╝██║██║  ██║
╚██████╗██║         ╚██████╗██║ ╚═╝ ██║██████╔╝
 ╚═════╝╚═╝          ╚═════╝╚═╝     ╚═╝╚═════╝ 

`;

const cli = new Command();

cli.name('cli')
    .usage('<argument> [options]')
    .version(version, '-v, --version')
    .description(chalk.green(desc_ascii + 'A codeforces cmdline for coding easier.'));

cli.helpCommand('help', 'Display help for command.');

cli.command('config')
    .description('Configuration of cf-cli.')
    .action(config_action);

cli.command('list')
    .option('-c, --contest <ID>', 'Specialize contest by ID.')
    .description('List problem set of contest.')
    .action(list_action);

cli.command('fetch')
    .argument('contestID', 'The contest ID.')
    .description('Fetch contest examples and generate coding environment.')
    .action(fetch_action);

export default cli;