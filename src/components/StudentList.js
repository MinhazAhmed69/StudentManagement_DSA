import React, { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data.students));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/api/students/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        return response.json();
      })
      .then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting student:', err);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg rounded-xl mt-6 animate-fade-in">
      <h3 className="text-xl font-semibold text-purple-800 mb-4">List of Students</h3>
      <ul className="space-y-3">
        {students.length === 0 ? (
          <li className="text-gray-500">No students found</li>
        ) : (
          students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center p-3 bg-white rounded shadow border border-purple-200"
            >
              <span>
                {student.name} (ID: {student.id})
              </span>
              <button
                onClick={() => handleDelete(student.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition transform hover:scale-105"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default StudentList;