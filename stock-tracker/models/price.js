"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var priceSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
var Price = mongoose_1.default.models.Price || mongoose_1.default.model('Price', priceSchema);
exports.default = Price;
