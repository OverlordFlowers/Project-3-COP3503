const csv = require("csv-parser");
const fs = require("fs");
let results = [];

class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.adjList = new Map();
  }

  // Creates a vertex to the map.
  addVertex(v) {
    this.adjList.set(v, []);
  }
  // Creates a directed link between two songs.
  addEdge(v, d) {
    this.adjList.get(v).push(d);
  }

  // GFG, adjacency list implementation of a map using JavaScript.
  // debugging
  printGraph() {
    var get_keys = this.adjList.keys();

    for (var i of get_keys) {
      var get_values = this.adjList.get(i);
      var conc = "";

      for (var j of get_values) {
        conc += j + " ";
      }
      console.log(i + " -> " + conc);
    }
  }
}

class Node {
  constructor(id, danceability, energy, valence, metric) {
    this.id = id;
    this.danceability = danceability;
    this.energy = energy;
    this.valence = valence;
    this.metric = metric;
  }
}

// Used for DFS.
class Stack {
  // Constructor
  constructor() {
    this.items = [];
  }
  // Inserts element
  push(elem) {
    this.items.push(elem);
  }
  // Removes element
  pop() {
    if (this.items.length == 0) {
      return;
    }
    return this.items.pop();
  }
  // Is stack empty?
  isEmpty() {
    if (this.items.length > 0) {
      return false;
    }

    return true;
  }
}

// Used for BFS.
class Queue {
  // Constructor
  constructor() {
    this.items = [];
  }
  // Queue an element
  enqueue(elem) {
    this.items.push(elem);
  }
  // Dequeue an element.
  dequeue() {
    if (this.items.length < 0) {
      return;
    }
    return this.items.shift();
  }
  // Is queue empty?
  isEmpty() {
    if (this.items.length > 0) {
      return false;
    }

    return true;
  }
}

// Target: What we're finding, Playlist length is how long the playlist is, search = 0 for dfs, search = 1 for bfs.
const connectGraph = async (target, playlist_length, search) => {
  // promise, will waits for processCSV to finish before anything else.
  results = await processCSV();
  // Create a new adjList
  trackMap = new Graph(results.length);
  for (let i = 0; i < results.length; i++) {
    trackMap.addVertex(i);
  }

  // Issue: how do we map it so that similar songs are connected, but
  // we don't end up connecting every song?
  // solution: Since we defined a metric and we sorted it, then we
  // can assume that adjacent nodes in the array are similar,
  // and we can thus connect them.
  // Math.random gives the illusion of variance. Come back to me when I've taken linear algebra and can process the data more.
  for (let i = 0; i < results.length; i++) {
    for (
      let j = Math.floor(Math.random() * -4);
      j <= Math.floor(Math.random() * 4) + 1;
      j++
    ) {
      if (i + j > -1 && i + j < results.length && i + j != i) {
        trackMap.addEdge(i, i + j);
      }
    }
  }

  // trackIDs, to be returned.
  var trackIDs = [];

  // To provide a choice between dfs and bfs.
  // To effectively compare between both types of searches, it is necessary to start from the same point.
  // The original intent was to have
  if (search == 0) {
    console.time("dfs");
    source = dfs(Math.floor(results.length / 2), target, trackMap);
    console.timeEnd("dfs");
  } else {
    console.time("bfs");
    source = bfs(Math.floor(results.length / 2), target, trackMap);
    console.timeEnd("bfs");
  }

  queueSongs(source, trackIDs, playlist_length);
  return trackIDs;
};

function processCSV() {
  // Promises? What are those? I hate JavaScript.
  return new Promise((resolve, reject) => {
    // https://www.npmjs.com/package/csv-parser
    fs.createReadStream("songs.csv")
      .pipe(csv())
      .on("data", (songs) => {
        results.push(
          new Node(
            songs.id,
            songs.danceability,
            songs.energy,
            songs.valence,
            songs.metric
          )
        );
      })
      .on("end", () => {
        /*
            // Sorting (just for testing purposes. CSV should already be sorted.)
            results.sort(function (a, b) {
                return a.metric - b.metric;
            });    
            */
        // Promise returned
        resolve(results);
      });
  });
}

// DFS
function dfs(src, target, trackMap) {
  // Threshold so dfs returns a defined result.
  var threshold = 2;
  // Stack for dfs.
  var adjNodes = new Stack();
  // Keeps track of which nodes have been visited.
  var visited = new Array(trackMap.numVertices).fill(0);
  // Push source node as a starting point.
  adjNodes.push(src);
  visited[src] = true;

  while (!adjNodes.isEmpty()) {
    node = adjNodes.pop();
    // If current node is found the be within threshold, return.
    if (
      target - threshold <= results[node].metric &&
      results[node].metric <= target + threshold
    ) {
      console.log(results[node].metric);
      return node;
    }
    // If the node is adjacent and has not been visited, push it into the stack.
    for (let j = 0; j < trackMap.adjList.get(node).length; j++) {
      curr = trackMap.adjList.get(node)[j];
      if (visited[curr] == false) {
        // Set not visited node to visited.
        visited[curr] = true;
        adjNodes.push(curr);
      }
    }
  }
}

// BFS
function bfs(src, target, trackMap) {
  // Threshold so bfs always returns a defined result.
  var threshold = 2;
  // Queue for bfs.
  var adjNodes = new Queue();
  // Keeps track of which nodes have been visited.
  var visited = new Array(trackMap.numVertices).fill(false);
  // Push source node as a starting point.
  adjNodes.enqueue(src);
  visited[src] = true;

  while (!adjNodes.isEmpty()) {
    node = adjNodes.dequeue();

    // If target found, return.
    if (
      target - threshold <= results[node].metric &&
      results[node].metric <= target + threshold
    ) {
      console.log(results[node].metric);
      return node;
    }
    // If the node is adjacent and has not been visited, push it into the queue.
    for (let j = 0; j < trackMap.adjList.get(node).length; j++) {
      curr = trackMap.adjList.get(node)[j];

      if (visited[curr] == false) {
        visited[curr] = true;
        adjNodes.enqueue(curr);
      }
    }
  }
}

function queueSongs(src, trackIDs, playlist_length) {
  var adjNodes = new Queue();
  // Keeps track of which nodes have been visited.
  var visited = new Array(trackMap.numVertices).fill(false);
  // Push source node as a starting point.
  adjNodes.enqueue(src);
  visited[src] = true;

  while (!adjNodes.isEmpty()) {
    node = adjNodes.dequeue();

    // If playlist count reached, return.
    if (trackIDs.length == playlist_length) {
      return;
    }
    // If the node is adjacent and has not been visited, push it into the queu.
    for (let j = 0; j < trackMap.adjList.get(node).length; j++) {
      curr = trackMap.adjList.get(node)[j];

      if (visited[curr] == false) {
        visited[curr] = true;
        adjNodes.enqueue(curr);
        // Put into the trackIDs array the node's ID.
        trackIDs.push(results[curr].id);
      }
    }
  }
}

// function call needs to return an array of track IDs
module.exports = {
  restAPI: function (target, search) {
    let data = connectGraph(target, 20, search);
    console.log(data);
    return { data: data };
  },
};
