const express = require("express");
const connectDB = require("./config/db");
const moment = require("moment");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

console.log(moment("2012-12-11").format("YYYY-MM-DD"));
//Connect to database
connectDB();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/doctors", require("./routes/api/doctors"));
app.use("/api/accounts", require("./routes/api/accounts"));
app.use("/api/masterlist", require("./routes/api/masterList"));
app.use("/api/dcr", require("./routes/api/dcr"));
app.use("/api/mdcalls", require("./routes/api/mdcalls"));
app.use("/api/announcements", require("./routes/api/announcements"));
app.use("/api/auth", require("./routes/api/authentication"));
app.use("/api/profiles", require("./routes/api/profiles"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
