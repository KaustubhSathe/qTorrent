"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const mongoose_1 = __importDefault(require("mongoose"));
const torrent_1 = require("../torrent");
const config_1 = require("../config");
mongoose_1.default.connect(config_1.connectionURL, { useUnifiedTopology: true, useNewUrlParser: true });
const baseURL = "https://katcr.to";
const categories = [
    "movies",
    "tv",
    "music",
    "games",
    "apps",
    "anime",
    "other"
];
function getSize(inp) {
    if (inp.includes("MB")) {
        return parseInt(inp.trim().replace("MB", "").trim());
    }
    return parseInt(inp.trim().replace("MB", "").trim()) * 1000;
}
function getDate(inp) {
    if (inp.includes("min") || inp.includes("hour")) {
        return (new Date()).getTime();
    }
    inp.replace("days", "");
    inp.replace("day", "");
    return (new Date()).getTime() - parseInt(inp.trim()) * 24 * 3600 * 1000;
}
async function parse() {
    const browser = await puppeteer_1.default.launch({ headless: true });
    const puppetPage = await browser.newPage();
    for (let cat = 0; cat < categories.length; cat++) {
        let category = categories[cat];
        for (let page = 1; page <= 200; page++) {
            try {
                const currentPage = `${baseURL}/${category}/${page}/`;
                await puppetPage.goto(currentPage);
                const bodyHTML = await puppetPage.evaluate(() => document.body.innerHTML);
                const $ = await cheerio_1.default.load(bodyHTML);
                const table = $("#wrapperInner > div.mainpart > table > tbody > tr > td:nth-child(1) > div:nth-child(2) > table > tbody").children().toArray();
                table.forEach((itr, i, arr) => {
                    var _a;
                    if (i != 0) {
                        const tds = $(itr).children().toArray();
                        let currTorrent = {};
                        currTorrent.Name = $(tds[0]).text().trim().substring(0, $(tds[0]).text().trim().indexOf("Posted by")).trim();
                        currTorrent.Link = baseURL + ((_a = $($(tds[0]).children().children()[0]).attr("href")) === null || _a === void 0 ? void 0 : _a.trim());
                        currTorrent.Size = getSize($(tds[1]).text().trim().trim());
                        currTorrent.UploadDate = getDate($(tds[3]).text().trim().trim());
                        currTorrent._id = currTorrent.Link;
                        currTorrent.Source = "KATCR";
                        currTorrent.Seeders = parseInt($(tds[4]).text().trim());
                        currTorrent.Leechers = parseInt($(tds[5]).text().trim());
                        (new torrent_1.torrent(currTorrent)).save((err) => {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`Added ${currTorrent.Name}`);
                            }
                        });
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    await browser.close();
}
parse();
//# sourceMappingURL=katcr.js.map