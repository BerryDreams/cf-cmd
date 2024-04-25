import config_action from './config.js';
import { Command } from 'commander';
import list_action from "./list.js";
const cli = new Command();


cli.version('v0.0.1', '-v, --version', 'Version of cf-cli.');

cli.command('config')
    .description('Configuration of cf-cli.')
    .action(config_action);

cli.command('list')
    .option('-c, --contest <ID>', 'Specialize contest by ID.')
    .description('List problem set of contest.')
    .action(list_action);

cli.command('create')
    .description('Get contest examples and generate coding environment.');


export default cli;