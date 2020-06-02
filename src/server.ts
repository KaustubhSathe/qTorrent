import express from "express";
import helmet from "helmet";
import handlebars from "express-handlebars";
import path from "path";
const port : string|number= process.env.PORT || 5000;
const app: express.Application = express();

app.use(helmet());
app.use(express.static("public"));
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));
app.engine("hbs",handlebars({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views'),
}));


app.get("/",(req:express.Request, res:express.Response) => {
    res.render("index",{
        name:"Kaustubh"
    });
});


app.listen(port,() => console.log(`hosting @${port}`));