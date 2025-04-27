const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable cross-origin requests

// Connect to MongoDB (use MongoDB Atlas URI if you are using a cloud MongoDB instance)
mongoose.connect('mongodb://localhost:27017/tasks_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Task Schema
const taskSchema = new mongoose.Schema({
  task: String,
  update: String,
});

const Task = mongoose.model('Task', taskSchema);

// POST API to save task data
app.post('/api/tasks', async (req, res) => {
    console.log('Received Data:', req.body); // Log incoming data
    const tasks = req.body;
  
    try {
      const savedTasks = await Task.insertMany(tasks); // Save tasks
      console.log('Tasks Saved:', savedTasks); // Log saved tasks
      res.status(200).send('Data submitted successfully');
    } catch (error) {
      console.error('Error saving task data:', error); // Log error details
      res.status(500).send('Error saving task data');
    }
  });
  

// Server setup
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
