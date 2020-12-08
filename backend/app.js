var express = require("express");
var graph = require("./graph");
var app = express();

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

app.get("/api/:target/:search", (req, res) => {
  const { target, search } = req.params;
  res.json(graph.restAPI(target, search));
});
