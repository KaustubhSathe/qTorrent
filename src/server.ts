import express from "express";
import helmet from "helmet";
import handlebars from "express-handlebars";
import path from "path";
const port : string|number= process.env.PORT || 5000;
const app: express.Application = express();

app.use(helmet());
app.use(express.static(path.join(__dirname,"../src/public")));
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"../src/views"));
app.engine("hbs",handlebars({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views'),
}));


app.get("/",(req:express.Request, res:express.Response) => {
    res.render("index");
});

app.get("/about",(req:express.Request, res:express.Response) => {
    res.render("about");
});

app.get("/feedback",(req:express.Request, res:express.Response) => {
    res.render("feedback");
});



app.listen(port,() => console.log(`hosting @${port}`));