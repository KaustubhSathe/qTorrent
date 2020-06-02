import mongoose from "mongoose";
const schema:mongoose.Schema = new mongoose.Schema({
    Seeders: Number,
    Leechers: Number,
    Source: {
        type: String, trim: true
    },
    Name: {
        type: String, trim: true
    },
    Link: {
        type: String, trim: true
    },
    _id: {
        type: String, trim: true
    },
    Size: Number,
    UploadDate: Number
}, { versionKey: false });



export const torrent = mongoose.model('torrents', schema);

export interface fields{
    Seeders: number,
    Leechers: number,
    Source: string,
    Name: string,
    Link: string,
    _id: string,
    Size: number,
    UploadDate: number
}