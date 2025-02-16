const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const mongoose = require("mongoose");
const DoctorAccount = require("../server/models/DoctorAccount");
const MasterListDoctor = require("../server/models/MasterListDoctor");

//Connect to database
connectDB();
schedule.scheduleJob("1 * *", async function() {
  let doctors = await DoctorAccount.updateMany(
    {},
    { $set: { inMasterlist: false } }
  );
  console.log(doctors + "Updated to inMasterlist: false");
});

schedule.scheduleJob("0 * * *", async function() {
  let doctors = await MasterListDoctor.updateMany(
    {},
    { $set: { inDcr: false } }
  );
  console.log(doctors + "Updated to inDcr: false");
});
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/medreps", require("./routes/api/medreps"));
app.use("/api/doctors", require("./routes/api/doctors"));
app.use("/api/accounts", require("./routes/api/accounts"));
app.use("/api/masterlist", require("./routes/api/masterList"));
app.use("/api/dcr", require("./routes/api/dcr"));
app.use("/api/mdcalls", require("./routes/api/mdcalls"));
app.use("/api/announcements", require("./routes/api/announcements"));
app.use("/api/auth", require("./routes/api/authentication"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/reports", require("./routes/api/reports"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
