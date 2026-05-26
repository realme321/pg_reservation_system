const mongoose = require("mongoose");

const PGSchema = new mongoose.Schema({
    name: String,
    location: String,
    rent: Number,
    bedsAvailable: Number,
    image: String
});

module.exports = mongoose.model("PG", PGSchema);