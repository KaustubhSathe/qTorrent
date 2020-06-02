"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const port = process.env.PORT || 5000;
const app = express_1.default();
app.use(helmet_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.engine("hbs", express_handlebars_1.default({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path_1.default.join(__dirname, '../src/views/layouts'),
    partialsDir: path_1.default.join(__dirname, '../src/views'),
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
app.listen(port, () => console.log(`hosting @${port}`));
