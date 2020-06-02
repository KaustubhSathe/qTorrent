// /*-----------------------Imports-----------------------*/
// const mongoose = require("mongoose");
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");


// /*-----------------------Mongo-Settings-----------------------*/
// mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true });
// let schema = new mongoose.Schema({
//     Seeders: Number,
//     Leechers: Number,
//     Source: {
//         type: String, trim: true
//     },
//     Name: {
//         type: String, trim: true
//     },
//     Link: {
//         type: String, trim: true
//     },
//     _id: {
//         type: String, trim: true
//     },
//     Size: Number,
//     UploadDate: Number
// }, { versionKey: false });

// let mongoModel = mongoose.model('torrents', schema);


// /*-----------------------Utils-----------------------*/
// function getSize(size) {
//     if (size == null) return null;
//     let type = size.substring(size.length - 3);
//     size = size.substring(0, size.length - 4);
//     if (type == "GiB") {
//         return parseInt(Math.ceil(parseFloat(size) * 1000));
//     }
//     return parseInt(Math.ceil(parseFloat(size)));
// }

// function getLink(url, source) {
//     if (source == "TPB") {
//         return "https://www1.thepiratebay3.to" + url;
//     }
//     return "nope";
// }

// function getDate(date) {
//     if (date == null) return null;
//     date = date.split(" ")[1];
//     date = date.substring(0, date.length - 6);
//     if (date.includes("Today") || date.includes("ago")) {
//         return (new Date()).getTime();
//     } else if (date.includes("Y-day")) {
//         return (new Date()).getTime() - 86400000;
//     } else {
//         if (date.length == 5) {
//             return Date.parse("2020-" + date);
//         } else {
//             return Date.parse(date);     
//         }
//     }
// }

// async function retry(method, retryCount = 10) {
//     try {
//         return await method();
//     } catch (err) {
//         if (retryCount <= 0) {
//             console.log(err);
//         } else {
//             return await retry(method, retryCount - 1);
//         }
//     }
// }


// /*-----------------------Parsers-----------------------*/
// async function tpbParser() {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     for (let category = 100; category <= 600; category += 100) {
//         await retry(() => page.goto('https://www1.thepiratebay3.to/browse/' + category));
//         let pageNumber = 1;
//         while( true ) {
//             let bodyHTML = await page.evaluate(() => document.body.innerHTML);
//             const $ = await cheerio.load(bodyHTML);
//             const rows = $("#searchResult > tbody").children();

//             for (let i = 0; i < rows.length - 1; i++) {
//                 const currentRow = $(rows[i]);
//                 const Seeders = parseInt($(currentRow.children()[2]).text());
//                 const Leechers = parseInt($(currentRow.children()[3]).text());
//                 const Source = "TPB";
//                 const Name = $(currentRow.children()[1]).find(".detName").text();
//                 const Link = getLink($(currentRow.children()[1]).find(".detLink").attr("href"), Source);
//                 const _id = Link;
//                 const Size = getSize($(currentRow.children()[1]).find(".detDesc").text().split(",")[1].substring(5).trim());
//                 const UploadDate = getDate($(currentRow.children()[1]).find(".detDesc").text().split(",")[0]);
                
//                 mongoModel.create({ Seeders, Leechers, Source, Name, Link, _id, Size, UploadDate }, function (err) {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     }
//                     console.log("added : " + _id);
//                 });
//             }

//             console.log("on page : " + pageNumber);
//             let nextPageButtonSelector;
//             if (pageNumber == 1) {
//                 nextPageButtonSelector = "#searchResult > tbody > tr:nth-child(31) > td > a:nth-child(31)";
//             } else {
//                 nextPageButtonSelector = "#searchResult > tbody > tr:nth-child(31) > td > a:nth-child(32)";
//             }
//             pageNumber++;
//             const nextPageButton = $(nextPageButtonSelector);
//             if (nextPageButton.attr("href") == undefined) break;

//             await retry(async () => {
//                 await Promise.all([
//                     page.waitForNavigation(),
//                     page.click(nextPageButtonSelector)
//                 ]);
//             });
//         } 
//     }
//     await browser.close();
// }


// /*-----------------------Parser-Calls-----------------------*/
// tpbParser();

// // https://katcr.to/movies/2/

