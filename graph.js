const csv = require('csv-parser')
const fs = require('fs');
const http = require('http');
const results = [];

class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjList = new Map();
    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, d) {
        this.adjList.get(v).push(d);
        this.adjList.get(d).push(v);
    }

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
};

class Node {
    constructor(name, id, explicit, danceability, energy, key, loudness, mode, speechiness, instrumentalness, liveness, valence, acousticness, tempo, duration_ms) {
        this.name = name;
        this.id = id;
        this.explicit = explicit;
        this.danceability = danceability;
        this.energy = energy;
        this.key = key;
        this.loudness = loudness;
        this.mode = mode;
        this.speechiness = speechiness;
        this.instrumentalness = instrumentalness;
        this.liveness = liveness;
        this.valence = valence;
        this.acousticness = acousticness;
        this.tempo = tempo;
        this.duration_ms = duration_ms;
    }
};

    
// Using the above implemented graph class

let app = http.createServer((req, res) => {
    
    fs.createReadStream("songs.csv")
    .pipe(csv())
    .on('data', (songs) => {
        results.push(new Node(songs.name, songs.id, songs.explicit, songs.danceability, songs.energy, songs.key, songs.loudness, songs.mode, songs.speechiness, songs.instrumentalness, songs.liveness, songs.valence, songs.acousticness, songs.tempo, songs.duration_ms))
    });
    
    for (let i = 0; i < results.length; i++) {
        res.write(results[i].name);
        res.write("\n");
    }
    res.end("Hello world!\n");
});

app.listen(8000, '127.0.0.1');
console.log("Running on port 8000");


    
    
