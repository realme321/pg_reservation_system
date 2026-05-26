const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

    name: String,

    phone: String,

    pgName: String,

    moveInDate: String,

    status: {
        type: String,
        default: "Pending"
    }

});

module.exports = mongoose.model("Booking", BookingSchema);