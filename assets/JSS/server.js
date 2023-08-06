const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('public'));

// API endpoints
app.get('/api/notes', (req, res) => {
  // Read and send notes from db.json
});

app.post('/api/notes', (req, res) => {
  // Add a new note to db.json
});

app.delete('/api/notes/:id', (req, res) => {
  // Delete a note from db.json
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while reading the database.' });
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while reading the database.' });
      } else {
        const notes = JSON.parse(data);
        newNote.id = Date.now(); // Assign a unique ID
        notes.push(newNote);
  
        fs.writeFile('db.json', JSON.stringify(notes), 'utf8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while writing to the database.' });
          } else {
            res.status(201).json(newNote);
          }
        });
      }
    });
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
  
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while reading the database.' });
      } else {
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== noteId);
  
        fs.writeFile('db.json', JSON.stringify(updatedNotes), 'utf8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while writing to the database.' });
          } else {
            res.status(204).send();
          }
        });
      }
    });
  });

  document.getElementById('save-note').addEventListener('click', () => {
    const title = document.getElementById('note-title').value;
    const text = document.getElementById('note-text').value;
  
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }),
    })
    .then(response => response.json())
    .then(newNote => {
      // Handle success and update UI
    })
    .catch(error => {
      // Handle error
    });
  });
  
  