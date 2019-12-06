const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/doctors", require("./routes/api/doctors"));
app.use("/api/accounts", require("./routes/api/accounts"));
app.use("/api/announcements", require("./routes/api/announcements"));
app.use("/api/auth", require("./routes/api/authentication"));
app.use("/api/callfreq", require("./routes/api/callFreq"));
app.use("/api/callrate", require("./routes/api/callRate"));
app.use("/api/callreach", require("./routes/api/callReach"));
app.use("/api/profiles", require("./routes/api/profiles"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
