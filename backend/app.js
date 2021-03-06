var express = require("express");
var cors = require("cors");
var graph = require("./graph");
var app = express();

// need to allow cors
app.use(cors());

// start the express server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

// REST api endpoint to access our graph calculation
app.get("/api/:target/:search", async (req, res) => {
  const { target, search } = req.params;
  const result = await graph.restAPI(target, search);
  res.json(result);
});
