// Import
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and unleancoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//  ALL GET REQUESTS HERE
// GET route for the home page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// GET route for /notes URL
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request to get stored notes in the '/db/db.json' file
app.get("/api/notes", (req, res) => {
  res.json(db);
});

// ALL POST REQUESTS HERE
// POST request to add note to db.json file

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} and added to notes db`);

  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, id: uuidv4 };

    db.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(db, null, 2), (err) =>
      err ? console.log(err) : console.log(`${newNote.title} has been created.`)
    );

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).JSON("Error making note💥");
  }
});

// DELETE ROUTES  GO HERE
// DELETE request

app.delete("api/notes/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    db = db.filter((item) => item.id !== id);

    fs.writeFile("db/db.json", JSON.stringify(db, null, 2), (err) => err);

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error deleting your note");
  }
});

// PORT LISTENER
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT} 🚀`)
);
