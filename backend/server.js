const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PG = require("./models/PG");
const Booking = require("./models/Booking");
const app = express();


app.use(cors());
app.use(express.json());
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// HOME
app.get("/", (req, res) => {
    res.send("Backend Running");
});


// TEST ROUTE
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});


// SEED DATABASE
app.get("/seed", async (req, res) => {

    try {

        await PG.deleteMany();

        await PG.insertMany([
            {
                name: "Green Stay",
                location: "Koramangala",
                rent: 7000,
                bedsAvailable: 3,
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
            },
            {
                name: "Urban Nest",
                location: "HSR Layout",
                rent: 8500,
                bedsAvailable: 2,
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            }
        ]);

        res.send("Dummy PG Data Added");

    } catch (err) {

        console.log(err);

        res.send(err.message);
    }
});


// GET PGS
app.get("/pgs", async (req, res) => {

    try {

        const pgs = await PG.find();

        res.json(pgs);

    } catch (err) {

        console.log(err);

        res.send(err.message);
    }
});
app.post("/bookings", async (req, res) => {

    try {

        const booking = await Booking.create(req.body);

        res.json(booking);

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);
    }
});
app.get("/bookings", async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.json(bookings);

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);
    }
});


// SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});