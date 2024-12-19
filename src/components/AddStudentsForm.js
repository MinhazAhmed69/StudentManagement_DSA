import React, { useState } from 'react';

function AddStudentForm() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5001/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add student');
        }
        return response.json();
      })
      .then(() => {
        setSuccess('Student added successfully');
        setError('');
        setName('');
        setId('');
      })
      .catch((err) => {
        setError(err.message);
        setSuccess('');
      });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-xl animate-fade-in">
      <h3 className="text-xl font-semibold text-blue-800 mb-4">Add Student</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition"
        />
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition transform hover:scale-105"
        >
          Add Student
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && <p className="text-green-500 mt-3">{success}</p>}
    </div>
  );
}

export default AddStudentForm;