import express from "express";
import helmet from "helmet";
import handlebars from "express-handlebars";
import _handlebars from "handlebars";
import path from "path";
import mongoose from "mongoose";
import { torrent}from "./torrent";
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import {connectionURL} from "./config";
mongoose.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    console.log("Connected to mongo database.")
});
const port : string|number= process.env.PORT || 5000;
const app: express.Application = express(); 

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"../src/public")));
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"../src/views"));
app.engine("hbs",handlebars({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views'),
    handlebars: allowInsecurePrototypeAccess(_handlebars)
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

const escapeRegex = (text:string) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.get("/search",async (req:express.Request, res:express.Response) => {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search.toString()), 'gi');
        torrent.find({"Name" : regex},(err,foundTorrents) => {
            if(err){
                console.error(err);
            }else{
                // res.json(foundTorrents);
                res.render("search",{
                    "torrents" : foundTorrents
                });
            }
        })
    }
});





app.listen(port,() => console.log(`hosting @${port}`));