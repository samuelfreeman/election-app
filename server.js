const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
require("dotenv/config")

app.use(cors({ origin: true, credentials: true }));

const appRoutes = require("./routes/index");
app.use(bodyparser.json());

app.use("/api", appRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "welcome to our  voting app",
  }); 
});
app.listen(PORT, ( ) => {
  console.log(`server running on port${PORT}`);
});
