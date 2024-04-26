import chalk from "chalk";
import { listProblemSet } from "../http/api.js";
import {getContestIDFromPath, getDomain} from "../core/utils.js";
import Table from 'cli-table3';

const printProblemSet = (data) => {
    const table = new Table({
        head: ['#', 'PROBLEM', 'PASSED', 'LIMIT', 'IO', 'STATUS'],
        style: {
            head: [],
        }
    });
    data.forEach((row) => {
        let status = chalk.bgGrey('Unsubmitted');
        if (row.status === 'Accepted') {
            status = chalk.bgGreen(row.status);
        } else if (row.status === 'Rejected') {
            status = chalk.bgRed(row.status);
        }
        table.push([
            row.id,
            chalk.bold(row.name),
            row.passed,
            row.limit,
            row.IO,
            status
        ]);
    });
    console.log(table.toString());
};
const list_action = (options) => {
    let contestID = -1;
    if (options && options.hasOwnProperty('contest')) {
        contestID = Number(options.contest);
    } else {
        contestID = getContestIDFromPath();
    }
    if (contestID === -1) {
        console.log(chalk.red('Please specify contest by ID option or run command in contest folder.'));
        return;
    }
    listProblemSet(contestID).then(data => {
        printProblemSet(data);
    });
};


export default list_action;