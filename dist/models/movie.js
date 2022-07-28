"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.movieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    producer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Movie = mongoose_1.default.model("Movie", exports.movieSchema);
exports.default = Movie;
//# sourceMappingURL=movie.js.map