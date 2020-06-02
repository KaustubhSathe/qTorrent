"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const torrent_1 = require("./torrent");
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const connectionURL = "mongodb+srv://kaustubh:Sekizo7777@qtorrent-pvg1r.mongodb.net/store?retryWrites=true&w=majority";
mongoose_1.default.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log("Connected to mongo database.");
});
const port = process.env.PORT || 5000;
const app = express_1.default();
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.engine("hbs", express_handlebars_1.default({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path_1.default.join(__dirname, '../src/views/layouts'),
    partialsDir: path_1.default.join(__dirname, '../src/views'),
    handlebars: allow_prototype_access_1.allowInsecurePrototypeAccess(handlebars_1.default)
}));
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/feedback", (req, res) => {
    res.render("feedback");
});
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
app.get("/search", async (req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search.toString()), 'gi');
        torrent_1.torrent.find({ "Name": regex }, (err, foundTorrents) => {
            if (err) {
                console.error(err);
            }
            else {
                // res.json(foundTorrents);
                res.render("search", {
                    "torrents": foundTorrents
                });
            }
        });
    }
});
app.listen(port, () => console.log(`hosting @${port}`));
