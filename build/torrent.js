"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.torrent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
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
exports.torrent = mongoose_1.default.model('torrents', schema);
//# sourceMappingURL=torrent.js.map