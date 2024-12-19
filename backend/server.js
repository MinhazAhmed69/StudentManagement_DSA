const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for students
const students = [];

// Route to add a student
app.post('/api/students', (req, res) => {
  const { name, id } = req.body;

  // Validate inputs
  if (!name || !id) {
    return res.status(400).json({ error: 'Name and ID are required' });
  }

  // Add student to the list
  students.push({ name, id });
  res.status(201).json({ message: 'Student added successfully', student: { name, id } });
});

// Route to list all students
app.get('/api/students', (req, res) => {
  res.status(200).json({ students });
});

// Route to search a student by ID
app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;

  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.status(200).json({ student });
});

// Route to delete a student by ID
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the student to be deleted
  const index = students.findIndex(student => student.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  // Remove the student from the list
  students.splice(index, 1);
  res.status(200).json({ message: 'Student deleted successfully' });
});

// Start the server
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});