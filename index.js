const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MONGODB_CONNECTION_STRING =
  "mongodb+srv://Cooper:fFSLLxsmkFbkDx2@cluster0.snmbe.mongodb.net/audio-app-data?retryWrites=true&w=majority";

const cors = require("cors");

const app = express();
app.use(cors());

//import your models
require("./models/quote");
require("./models/Product");

mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
require("./routes/route.js")(app);

const PORT = process.env.PORT || 5000;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
