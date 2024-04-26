import cli from './cli/cli.js';
import {initGlobal} from "./core/global.js";

/**
 * The entry of program.
 */
initGlobal();
cli.parse(process.argv);
