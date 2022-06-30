const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoute = require("./routes/movies");
const genreRoute = require("./routes/genres");
const userRoute = require("./routes/users");

const app = express();
app.use(cors());

const dbConfig = require('./config/keys');
console.log(dbConfig);

mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;
db.once("open", () => console.log('connected to the database'));
db.on("error", console.error.bind(console, 'connection error:'));

app.use(express.static("./uploads"));

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

//App routes to handle requests
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute); //cache
app.use("/api/users", userRoute);

//Serve our static asset
app.use(express.static("frontend/build"));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

const port = process.env.PORT || 5000; 
console.log(port);
app.listen(port, () => console.log('listing to port ', port));
module.exports = app;