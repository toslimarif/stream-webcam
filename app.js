const express = require("express");
const path = require("path");

const app = express();

// HTTP stuff
app.get("/client", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./public/client.html"))
);

app.get("/streamer", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./public/streamer.html"))
);

app.get("/", (req, res) => {
  res.send(`
        <a href="streamer">Streamer</a><br>
        <a href="client">Client</a>
    `);
});

module.exports = app;
