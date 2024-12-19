const { exec } = require('child_process');

// Add student using C backend
const addStudent = (req, res) => {
  const { name, id } = req.body;

  exec(`./c/student_records add ${name} ${id}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }
    res.json({ message: 'Student added successfully', student: { name, id } });
  });
};

// Get all students (fetch from C program)
const getStudents = (req, res) => {
  exec('./c/student_records list', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }
    const students = stdout.split('\n').map((line) => {
      const [id, name] = line.split(',');
      return { id, name };
    });
    res.json({ students });
  });
};

module.exports = { addStudent, getStudents };