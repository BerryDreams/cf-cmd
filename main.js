import cli from './cli/index.js';
import {destroyGlobal, initGlobal} from "./core/global.js";

/**
 * The entry of program.
 */
initGlobal();
cli.parse(process.argv);
process.on('exit', () => {
    destroyGlobal();
});
