import * as cheerio from 'cheerio';
import {getDomain} from "../core/utils.js";
import {Instance} from "../core/global.js";

const findProblemSet = (html) => {
    const $ = cheerio.load(html);
    const trs = $('table.problems > tbody > tr');
    const data = [];
    trs.each((i, tr) => {
        if (i === 0) {
            return;
        }
        let problem = {};
        const $$ = cheerio.load(tr);

        problem.id = $$('td.id > a').text().trim();
        problem.name = $$('td.id').next().children('div:first').children('div:first').text().trim();
        problem.limit = $$('div.notice').clone().children().remove().end().text().trim();
        problem.IO = $$('div.notice > div').text().trim();
        problem.passed = $$('[title="Participants solved the problem"]').text().trim().slice(1);

        let stateStr = $$('tr').attr('class');
        if (stateStr === undefined) {
            stateStr = "Unsubmitted";
        } else if (stateStr === "accepted-problem") {
            stateStr = "Accepted";
        } else if (stateStr === "rejected-problem") {
            stateStr = "Rejected";
        }
        problem.status = stateStr;
        data.push(problem);
    });
    return data;
};

const listProblemSet = async (contestID) => {
    const domain = getDomain();
    const list_URL = domain + '/contest/' + contestID;
    let data = [];
    const res = await Instance.client.get(list_URL);
    if (res.status !== 200) {
        return null;
    }
    data = findProblemSet(res.data);
    return data;
};
export default listProblemSet;