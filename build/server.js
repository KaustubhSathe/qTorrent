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
app.use(express_1.default.static("public"));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "views"));
app.engine("hbs", express_handlebars_1.default({ defaultLayout: 'main', extname: '.hbs' }));
app.use("/", (req, res) => {
    res.render("index", { name: "jijoijoioij" });
});
app.listen(port, () => console.log(`hosting @${port}`));
